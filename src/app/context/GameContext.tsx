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
}

interface GameContextType {
  gameState: GameState;
  placeBid: (amount: number) => Promise<void>;
  stakeTokens: (amount: number) => Promise<void>;
  connectWallet: () => Promise<void>;
  getReferralLink: () => string;
  handlePress: () => Promise<void>;
  showWalletModal: boolean;
  setShowWalletModal: (show: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_MAX_TIMER = 3600; // 1 hour in seconds
const MIN_MAX_TIMER = 60; // 1 minute in seconds

export function GameProvider({ children }: { children: ReactNode }) {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [gameState, setGameState] = useState<GameState>({
    poolAmount: 1,
    currentBid: 0.1,
    timer: INITIAL_MAX_TIMER,
    maxTimer: INITIAL_MAX_TIMER,
    epoch: 1,
    isEarlyBird: true,
    userScore: 0,
    userStake: 0,
    referralLink: "",
    referralRewards: 0,
    isConnected: false,
    walletAddress: null,
    solBalance: null,
  });

  // Update wallet connection status
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
      // Handle game end logic here
      console.log("Game ended - last presser wins!");
    }
  }, [gameState.timer]);

  const placeBid = async (amount: number) => {
    const newPoolAmount = gameState.poolAmount + amount;
    setGameState((prev) => ({
      ...prev,
      poolAmount: newPoolAmount,
      currentBid: calculateMinimumBid(newPoolAmount),
      timer: 1800,
    }));
  };

  const calculateMinimumBid = (pool: number) => {
    return pool * 0.1;
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

    const newMaxTimer = Math.max(MIN_MAX_TIMER, gameState.maxTimer - 1);

    setGameState((prev) => ({
      ...prev,
      timer: newMaxTimer,
      maxTimer: newMaxTimer,
      userScore: prev.userScore + 1,
    }));
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        placeBid,
        stakeTokens,
        connectWallet,
        getReferralLink,
        handlePress,
        showWalletModal,
        setShowWalletModal,
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
