import { useState } from "react";
import * as anchor from "@project-serum/anchor";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import idl from "../contracts/idl.json";

const programID = new PublicKey(idl.metadata.address);
const network = "https://api.devnet.solana.com"; // Change to Solana devnet
const opts = { preflightCommitment: "processed" };
const connection = new Connection(network, opts.preflightCommitment);
const treasury = new PublicKey("MNtwFkdaoazzHCXKMxWERiJ8N9P5hnUr1ujwK5M9T4p");

const useSolanaContracts = () => {
  const [callingSmartContract, setCallingSmartContract] = useState(false);
  const [errorInCallingSmartContract, setErrorInCallingSmartContract] =
    useState(null);
  const wallet = useWallet();
  const { publicKey, signTransaction, sendTransaction } = wallet;

  const provider = new AnchorProvider(
    connection,
    wallet,
    opts.preflightCommitment
  );
  const program = new Program(idl, programID, provider);

  const derivePDA = async (seeds, programId = program.programId) => {
    return await PublicKey.findProgramAddress(seeds, programId);
  };

  /**
   * Initialize the Smart Contract
   * @param {PublicKey} globalTreasury - The global treasury public key
   * @param {Keypair} payer - The payer keypair
   */
  const initialize = async (globalTreasury, payer) => {
    try {
      setCallingSmartContract(true);
      setErrorInCallingSmartContract(null);

      const [globalStatePDA, globalStateBump] = await derivePDA([
        Buffer.from("global_state"),
      ]);
      const [jackpotPDA, jackpotBump] = await derivePDA([
        Buffer.from("jackpot"),
      ]);
      const [stakingPoolPDA, stakingPoolBump] = await derivePDA([
        Buffer.from("staking_pool"),
      ]);

      const tx = await program.rpc.initialize(globalTreasury, {
        accounts: {
          globalState: globalStatePDA,
          payer: payer.publicKey,
          globalTreasury: globalTreasury,
          jackpotAccount: jackpotPDA,
          stakingPoolAccount: stakingPoolPDA,
          systemProgram: SystemProgram.programId,
        },
        signers: [payer],
      });

      console.log("Initialize transaction signature", tx);
      return tx;
    } catch (err) {
      console.error("Error initializing contract:", err);
      setErrorInCallingSmartContract(err.message);
      return null;
    } finally {
      setCallingSmartContract(false);
    }
  };

  /**
   * Place a Bid with User Creation
   * @param {number} lamportsOffered - Amount in lamports to bid
   * @param {PublicKey} userPublicKey - The user's public key
   *
   * 'Press' Button
   */
  const placeBid = async (lamportsOffered, userPublicKey) => {
    try {
      setCallingSmartContract(true);
      setErrorInCallingSmartContract(null);

      if (!publicKey || !signTransaction || !sendTransaction) {
        throw new Error("Wallet not connected");
      }

      // Derive PDAs
      const [userPDA] = await derivePDA([
        Buffer.from("user"),
        userPublicKey.toBuffer(),
      ]);
      const [globalStatePDA] = await derivePDA([Buffer.from("global_state")]);
      const [jackpotPDA] = await derivePDA([Buffer.from("jackpot")]);
      const [stakingPoolPDA] = await derivePDA([Buffer.from("staking_pool")]);

      // Get global state to fetch treasury
      const globalState = await program.account.globalState.fetch(globalStatePDA);
      const treasury = globalState.globalTreasury;

      // Get current jackpot to validate minimum bid
      const currentJackpot = globalState.currentJackpot;
      const minimumBid = currentJackpot.div(new anchor.BN(100)); // 1% of current jackpot

      // Convert lamportsOffered to BN for comparison
      const bidAmount = new anchor.BN(lamportsOffered);

      if (bidAmount.lt(minimumBid)) {
        const minBidInSol = minimumBid.toNumber() / 1e9;
        throw new Error(`Bid too low. Minimum bid is ${minBidInSol} SOL`);
      }

      // Use dummy referrer like in the script
      const dummyReferrer = new PublicKey("11111111111111111111111111111111");
      const [referrerPDA] = await derivePDA([
        Buffer.from("user"),
        dummyReferrer.toBuffer(),
      ]);

      const accounts = {
        globalState: globalStatePDA,
        user: userPDA,
        userAuthority: userPublicKey,
        globalTreasury: treasury,
        jackpotAccount: jackpotPDA,
        stakingPoolAccount: stakingPoolPDA,
        referrerAccount: referrerPDA,
        referrer: dummyReferrer,
        systemProgram: SystemProgram.programId,
      };

      console.log("Accounts being passed to placeBid:", {
        globalState: accounts.globalState.toString(),
        user: accounts.user.toString(),
        userAuthority: accounts.userAuthority.toString(),
        globalTreasury: accounts.globalTreasury.toString(),
        jackpotAccount: accounts.jackpotAccount.toString(),
        stakingPoolAccount: accounts.stakingPoolAccount.toString(),
        referrerAccount: accounts.referrerAccount.toString(),
        referrer: accounts.referrer.toString(),
        systemProgram: accounts.systemProgram.toString(),
      });

      console.log("Bid details:", {
        bidAmount: bidAmount.toString(),
        minimumBid: minimumBid.toString(),
        currentJackpot: currentJackpot.toString()
      });

      // Create transaction and get latest blockhash
      const transaction = new Transaction();
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = userPublicKey;

      const placeBidInstruction = await program.methods
        .placeBid(bidAmount)
        .accounts(accounts)
        .instruction();

      transaction.add(placeBidInstruction);

      // Sign and send transaction
      const signedTx = await signTransaction(transaction);
      
      // Add a unique identifier to prevent duplicate processing
      const txid = await connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: false,
        preflightCommitment: "processed",
        maxRetries: 3
      });

      // Wait for confirmation with timeout
      const confirmation = await Promise.race([
        connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature: txid,
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Transaction confirmation timeout")), 30000)
        )
      ]);

      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${confirmation.value.err}`);
      }

      console.log("Transaction signature", txid);
      return txid;
    } catch (err) {
      console.error("Error in placeBid:", err);
      setErrorInCallingSmartContract(err.message);
      return null;
    } finally {
      setCallingSmartContract(false);
    }
  };

  /**
   * Stake Funds
   * @param {number} lamportsToStake - Amount in lamports to stake
   * @param {PublicKey} userPublicKey - The user's public key
   */
  const stake = async (lamportsToStake, userPublicKey) => {
    try {
      setCallingSmartContract(true);
      setErrorInCallingSmartContract(null);

      if (!publicKey || !signTransaction || !sendTransaction) {
        throw new Error("Wallet not connected");
      }

      // Create transaction and get latest blockhash
      const transaction = new Transaction();
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = userPublicKey;

      // Derive PDAs
      const [userPDA] = await derivePDA([
        Buffer.from("user"),
        userPublicKey.toBuffer(),
      ]);
      const [stakingPoolPDA] = await derivePDA([Buffer.from("staking_pool")]);
      const [globalStatePDA] = await derivePDA([Buffer.from("global_state")]);

      // Check if user account exists
      const userAccount = await program.account.userAccount.fetchNullable(
        userPDA
      );
      if (!userAccount) {
        console.log("User does not exist. Creating user...");
        const createUserInstruction = await program.methods

          .accounts({
            user: userPDA,
            userAuthority: userPublicKey,
            systemProgram: SystemProgram.programId,
          })
          .instruction();

        transaction.add(createUserInstruction);
        console.log("Added create user instruction");
      }

      // Add stake instruction
      const stakeInstruction = await program.methods
        .stake(new anchor.BN(lamportsToStake))
        .accounts({
          user: userPDA,
          userAuthority: userPublicKey,
          stakingPoolAccount: stakingPoolPDA,
          globalState: globalStatePDA,
          systemProgram: SystemProgram.programId,
        })
        .instruction();

      transaction.add(stakeInstruction);

      // Sign and send transaction
      const signedTx = await signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signedTx.serialize());

      // Wait for confirmation
      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature: txid,
      });

      console.log("Stake transaction signature", txid);
      return txid;
    } catch (err) {
      console.error("Error in stake:", err);
      setErrorInCallingSmartContract(err.message);
      return null;
    } finally {
      setCallingSmartContract(false);
    }
  };

  /**
   * Finalize Jackpot
   * @param {Keypair} payer - The payer keypair
   */
  const finalizeJackpot = async (payer) => {
    try {
      setCallingSmartContract(true);
      setErrorInCallingSmartContract(null);

      const [globalStatePDA] = await derivePDA([Buffer.from("global_state")]);
      const [jackpotPDA] = await derivePDA([Buffer.from("jackpot")]);

      const globalState = await program.account.globalState.fetch(
        globalStatePDA
      );
      const lastBidder = globalState.lastBidder;
      if (!lastBidder) {
        throw new Error("No last bidder found. Cannot finalize jackpot.");
      }

      const tx = await program.rpc.finalizeJackpot({
        accounts: {
          globalState: globalStatePDA,
          jackpotAccount: jackpotPDA,
          globalTreasury: treasury,
          lastBidder: lastBidder,
          systemProgram: SystemProgram.programId,
        },
        signers: [payer],
      });

      console.log("Finalize Jackpot transaction signature:", tx);
      return tx;
    } catch (err) {
      console.error("Error finalizing jackpot:", err);
      setErrorInCallingSmartContract(err.message);
      return null;
    } finally {
      setCallingSmartContract(false);
    }
  };

  /**
   * Claim Rewards
   * @param {PublicKey} userAuthority - The user's public key
   * @param {Keypair} userKeypair - The user's keypair
   */
  const claimRewards = async (userAuthority, userKeypair) => {
    try {
      setCallingSmartContract(true);
      setErrorInCallingSmartContract(null);

      const [globalStatePDA] = await derivePDA([Buffer.from("global_state")]);
      const [userPDA] = await derivePDA([
        Buffer.from("user"),
        userAuthority.toBuffer(),
      ]);
      const [stakingPoolPDA] = await derivePDA([Buffer.from("staking_pool")]);

      const tx = await program.methods
        .claimRewards()
        .accounts({
          globalState: globalStatePDA,
          user: userPDA,
          stakingPoolAccount: stakingPoolPDA,
          userAuthority: userAuthority,
          systemProgram: SystemProgram.programId,
        })
        .signers([userKeypair])
        .rpc();

      console.log("claimRewards transaction signature", tx);
      return tx;
    } catch (err) {
      console.error("Error claiming rewards:", err);
      setErrorInCallingSmartContract(err.message);
      return null;
    } finally {
      setCallingSmartContract(false);
    }
  };

  /**
   * Fetch Global State
   * @returns {Promise<Object|null>} - The global state object or null if an error occurs
   */
  const fetchGlobalState = async () => {
    try {
      const [globalStatePDA] = await derivePDA([Buffer.from("global_state")]);
      const globalState = await program.account.globalState.fetch(
        globalStatePDA
      );
      return globalState;
    } catch (err) {
      console.error("Error fetching global state:", err);
      return null;
    }
  };

  /**
   * Fetch User Account
   * @param {PublicKey} userAuthority - The user's public key
   * @returns {Promise<Object|null>} - The user account object or null if an error occurs
   */
  const fetchUserAccount = async (userAuthority) => {
    try {
      const [userPDA] = await derivePDA([
        Buffer.from("user"),
        userAuthority.toBuffer(),
      ]);
      const userAccount = await program.account.userAccount.fetch(userPDA);
      return userAccount;
    } catch (err) {
      console.error("Error fetching user account:", err);
      return null;
    }
  };

  /**
   * Fetch Jackpot Account
   * @returns {Promise<Object|null>} - The jackpot account object or null if an error occurs
   */
  const fetchJackpotAccount = async () => {
    try {
      const [jackpotPDA] = await derivePDA([Buffer.from("jackpot")]);
      const jackpotAccount = await program.account.jackpotAccount.fetch(
        jackpotPDA
      );
      return jackpotAccount;
    } catch (err) {
      console.error("Error fetching jackpot account:", err);
      return null;
    }
  };

  /**
   * Fetch Staking Pool Account
   * @returns {Promise<Object|null>} - The staking pool account object or null if an error occurs
   * TODO: update it for per user
   */
  const fetchStakingPoolAccount = async () => {
    try {
      const [stakingPoolPDA] = await derivePDA([Buffer.from("staking_pool")]);
      const stakingPoolAccount = await program.account.stakingPoolAccount.fetch(
        stakingPoolPDA
      );
      return stakingPoolAccount;
    } catch (err) {
      console.error("Error fetching staking pool account:", err);
      return null;
    }
  };

  /**
   * Fetch Current Jackpot
   * @returns {Promise<number|null>} - The current jackpot in SOL or null if an error occurs
   */
  const fetchCurrentJackpot = async () => {
    try {
      const [globalStatePDA] = await derivePDA([Buffer.from("global_state")]);
      const globalStateAccount = await program.account.globalState.fetch(
        globalStatePDA
      );
      const currentJackpotLamports = globalStateAccount.currentJackpot;
      const currentJackpotSol =
        currentJackpotLamports / anchor.web3.LAMPORTS_PER_SOL;
      console.log(`Current Jackpot: ${currentJackpotSol} SOL`);
      return currentJackpotSol;
    } catch (err) {
      console.error("Error fetching current jackpot:", err);
      return null;
    }
  };

  return {
    initialize,
    placeBid,
    stake,
    finalizeJackpot,
    claimRewards,
    fetchGlobalState,
    fetchUserAccount,
    fetchJackpotAccount,
    fetchStakingPoolAccount,
    fetchCurrentJackpot,
    callingSmartContract,
    errorInCallingSmartContract,
  };
};

export default useSolanaContracts;
