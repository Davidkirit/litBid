"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import useSolanaContracts from "../hooks/useSolanaContracts";
interface GameState {
  poolAmount: number;
  currentBid: number;
  timer: number;
  maxTimer: number;
  epoch: number;
  isEarlyBird: boolean;
  userScore: number;
  userStake: number;
  referralLink: string;
  referralRewards: number;
  isConnected: boolean;
  walletAddress: string | null;
  solBalance: number | null;
  firstBidPlaced: boolean;
}

interface GameContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  fetchGlobalState: () => Promise<void>;
  placeBid: (amount: number) => Promise<void>;
  stakeTokens: (amount: number) => Promise<void>;
  connectWallet: () => Promise<void>;
  getReferralLink: () => string;
  handlePress: () => Promise<void>;
  calculateRewards: () => void;
  distributeStakingPool: () => void;
  showWalletModal: boolean;
  setShowWalletModal: (show: boolean) => void;
  currentValue: number;
  incrementValue: (amount: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_MAX_TIMER = 1800; // 30 minutes in seconds
const MIN_BID_PERCENTAGE = 0.01; // 1% of the current jackpot
const EARLY_BIRD_EPOCHS = 30;
const SCORE_HALVING_EPOCHS = 90;

export function GameProvider({ children }: { children: ReactNode }) {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const { fetchGlobalState: fetchGlobalStateFromContract } =
    useSolanaContracts(); 
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [currentValue, setCurrentValue] = useState(0.0);
  const incrementValue = (amount: number) => {
    setCurrentValue((prev) => parseFloat((prev + amount).toFixed(1)));
  };

  const [gameState, setGameState] = useState<GameState>({
    poolAmount: 0,
    currentBid: 0.1,
    timer: 3600,
    maxTimer: 3600,
    epoch: 1,
    isEarlyBird: true,
    userScore: 0,
    userStake: 0,
    referralLink: "",
    referralRewards: 0,
    isConnected: false,
    walletAddress: null,
    solBalance: null,
    firstBidPlaced: false,
  });

  // Fetch global state from the smart contract
  const fetchGlobalState = async () => {
    try {
      const globalState = await fetchGlobalStateFromContract();

      if (!globalState) {
        console.error("Global state is null (possibly not initialized yet).");
        return;
      }

      setGameState((prev) => ({
        ...prev,
        poolAmount: globalState.poolAmount / 1e9,
        currentBid: globalState.currentBid / 1e9,
        timer: globalState.timer,
        epoch: globalState.epoch,
        isEarlyBird: globalState.isEarlyBird,
      }));
    } catch (error) {
      console.error("Failed to fetch global state:", error);
    }
  };

  useEffect(() => {
    const updateWalletStatus = async () => {
      if (connected && publicKey) {
        try {
          const balance = await connection.getBalance(publicKey);
          setGameState((prev) => ({
            ...prev,
            isConnected: true,
            walletAddress: publicKey.toString(),
            solBalance: balance / 1e9,
          }));
        } catch (error) {
          console.error("Failed to get wallet balance:", error);
        }
      } else {
        setGameState((prev) => ({
          ...prev,
          isConnected: false,
          walletAddress: null,
          solBalance: null,
        }));
      }
    };

    updateWalletStatus();
  }, [connected, publicKey, connection]);

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        timer: Math.max(0, prev.timer - 1),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle timer reaching zero
  useEffect(() => {
    if (gameState.timer === 0) {
      console.log("Game ended - last presser wins!");
    }
  }, [gameState.timer]);

  const calculateMinimumBid = (pool: number) => {
    return pool * MIN_BID_PERCENTAGE;
  };

  const placeBid = async (amount: number) => {
    const newPoolAmount = gameState.poolAmount + amount * 0.8; // 80% to jackpot
    const referralRewards = amount * 0.02; // 2% to referrer
    const stakingPool = amount * 0.1; // 10% to staking pool
    const treasury = amount * 0.08; // 8% to treasury

    setGameState((prev) => ({
      ...prev,
      poolAmount: newPoolAmount,
      currentBid: calculateMinimumBid(newPoolAmount),
      timer: INITIAL_MAX_TIMER,
      firstBidPlaced: true,
      referralRewards: prev.referralRewards + referralRewards,
    }));

    console.log(
      `Bid placed: ${amount} SOL. Updated pool: ${newPoolAmount} SOL.`
    );
  };

  const stakeTokens = async (amount: number) => {
    setGameState((prev) => ({
      ...prev,
      userStake: prev.userStake + amount,
    }));
  };

  const connectWallet = async () => {
    setShowWalletModal(true);
  };

  const getReferralLink = () => {
    return gameState.referralLink;
  };

  const handlePress = async () => {
    if (!gameState.isConnected) {
      setShowWalletModal(true);
      throw new Error("Please connect your wallet first");
    }

    const newMaxTimer = Math.max(INITIAL_MAX_TIMER, gameState.maxTimer - 1);

    setGameState((prev) => ({
      ...prev,
      timer: newMaxTimer,
      maxTimer: newMaxTimer,
      userScore: prev.userScore + 1,
    }));
  };

  const calculateRewards = () => {
    // Logic to calculate rewards for staking pool and referrals
    console.log("Calculating rewards...");
  };

  const distributeStakingPool = () => {
    // Logic to distribute staking pool based on scores
    console.log("Distributing staking pool...");
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        fetchGlobalState,
        placeBid,
        stakeTokens,
        connectWallet,
        getReferralLink,
        handlePress,
        calculateRewards,
        distributeStakingPool,
        showWalletModal,
        setShowWalletModal,
        currentValue,
        incrementValue,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
