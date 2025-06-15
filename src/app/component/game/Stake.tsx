"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import useSolanaContracts from "../../hooks/useSolanaContracts";
import { toast } from "react-toastify";
import { useGame } from "../../context/GameContext";

export default function Stake() {
  const {
    stake: onChainStake,
    fetchUserAccount,
    callingSmartContract,
  } = useSolanaContracts();
  const { publicKey } = useWallet();
  const { gameState, fetchGlobalState } = useGame();

  const [isLoading, setIsLoading] = useState(false);
  const [receiptTokens, setReceiptTokens] = useState(0);
  const [stakedTokens, setStakedTokens] = useState(0);
  const [solAmount, setSolAmount] = useState("");

  // Fetch user staking data from blockchain
  const fetchUserData = async () => {
    if (!publicKey) return;
    try {
      const userAccount = await fetchUserAccount(publicKey);
      setReceiptTokens(
        userAccount?.receiptTokens ? userAccount.receiptTokens / 1e9 : 0
      );
      setStakedTokens(
        userAccount?.stakedTokens ? userAccount.stakedTokens / 1e9 : 0
      );
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [publicKey, fetchUserAccount]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchGlobalState();
    };
    fetchData();
  }, [fetchGlobalState]);

  const handleStake = async () => {
    const amount = parseFloat(solAmount);
    if (!publicKey) {
      toast.error("Connect your wallet first.");
      return;
    }
    if (isNaN(amount) || amount <= 0 || amount > receiptTokens) {
      toast.error("Please enter a valid amount to stake.");
      return;
    }

    setIsLoading(true);
    try {
      const lamports = amount * 1e9;
      const txid = await onChainStake(lamports, publicKey);

      if (txid) {
        toast.success("Stake Approved!");
        toast.info(
          <a
            href={`https://explorer.solana.com/tx/${txid}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View transaction on Solana Explorer
          </a>
        );

        await new Promise((resolve) => setTimeout(resolve, 1500));
        await fetchUserData();
      } else {
        toast.error("Failed to stake.");
      }
    } catch (error) {
      console.error("Failed to stake tokens:", error);
      toast.error("An error occurred while staking.");
    } finally {
      setIsLoading(false);
      setSolAmount("");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-white">Stake Tokens</h1>
      <p className="text-white">Pool Amount: {gameState.poolAmount} SOL</p>
      <p className="text-white">Your Stake: {stakedTokens.toFixed(2)} TOKENS</p>
      {/* Top stats */}
      <div className="bg-[#1a1b35] px-3 py-1 rounded-md inline-block">
        <span className="text-gray-400 pixel-font text-xs">
          {receiptTokens.toFixed(2)} RECEIPT TOKENS AVAILABLE
        </span>
      </div>

      {/* Staking Section */}
      <div className="space-y-2">
        <h2 className="text-lg sm:text-3xl text-white pixel-font">
          STAKE TOKENS
        </h2>
        <p className="text-gray-400 pixel-font text-xs leading-tight">
          Stake your receipt tokens to earn rewards from future bids.
        </p>
      </div>

      {/* Amount Input Section */}
      <div className="space-y-2">
        <div className="text-white pixel-font text-sm">AMOUNT</div>
        <div className="bg-[#1a1b35] p-3 rounded-lg flex justify-between items-center">
          <input
            type="number"
            value={solAmount}
            onChange={(e) => setSolAmount(e.target.value)}
            className="bg-transparent text-xl text-white pixel-font outline-none w-full"
            placeholder="Enter amount to stake"
          />
          <span className="text-gray-400 pixel-font text-sm">TOKENS</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 pixel-font text-xs">
            BALANCE: {receiptTokens.toFixed(2)} TOKENS
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleStake}
          disabled={isLoading || !solAmount}
          className={`w-full bg-[#B8860B] hover:bg-[#9A7209] text-black pixel-font py-2 rounded-lg transition-colors text-sm ${
            isLoading || !solAmount ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "PROCESSING..." : "STAKE"}
        </button>
      </div>
    </div>
  );
}
