"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface GameState {
  poolAmount: number;
  currentBid: number;
  timer: number;
  epoch: number;
  isEarlyBird: boolean;
  userScore: number;
  userStake: number;
  referralLink: string;
  referralRewards: number;
  isConnected: boolean;
}

interface GameContextType {
  gameState: GameState;
  placeBid: (amount: number) => Promise<void>;
  stakeTokens: (amount: number) => Promise<void>;
  connectWallet: () => Promise<void>;
  getReferralLink: () => string;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>({
    poolAmount: 1, // Starting pool amount
    currentBid: 0.1, // 10% of pool
    timer: 1800, // 30 minutes in seconds
    epoch: 1,
    isEarlyBird: true, // First 30 epochs
    userScore: 0,
    userStake: 0,
    referralLink: "",
    referralRewards: 0,
    isConnected: false,
  });

  const placeBid = async (amount: number) => {
    // Placeholder for actual blockchain interaction
    const newPoolAmount = gameState.poolAmount + amount;
    setGameState((prev) => ({
      ...prev,
      poolAmount: newPoolAmount,
      currentBid: calculateMinimumBid(newPoolAmount),
      timer: 1800, // Reset to 30 minutes
    }));
  };

  const calculateMinimumBid = (pool: number) => {
    return pool * 0.1; // 10% of pool
  };

  const stakeTokens = async (amount: number) => {
    // Placeholder for actual staking interaction
    setGameState((prev) => ({
      ...prev,
      userStake: prev.userStake + amount,
    }));
  };

  const connectWallet = async () => {
    // Placeholder for wallet connection
    setGameState((prev) => ({
      ...prev,
      isConnected: true,
      referralLink:
        "https://litbid.com/ref/" + Math.random().toString(36).substring(7),
    }));
  };

  const getReferralLink = () => {
    return gameState.referralLink;
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        placeBid,
        stakeTokens,
        connectWallet,
        getReferralLink,
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
