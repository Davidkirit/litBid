"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import useSolanaContracts from "../hooks/useSolanaContracts";

interface GameState {
  poolAmount: number;
  currentBid: number;
  userBidAmount: number;
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
  lastBidder: string | null;
  rewards?: number;
}

interface GlobalState {
  currentJackpot: number;
  lastBidTimestamp: number;
  stakingPool: number;
  totalScoreSum: number;
  totalStaked: number;
  lastBidTimerEnd: number | null;
  lastBidder: string | null;
  globalTreasury: string;
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
  setUserBidAmount: (amount: number) => void;
  bidAmount: string;
  setBidAmount: React.Dispatch<React.SetStateAction<string>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_MAX_TIMER = 1800; // 30 minutes in seconds
const MIN_BID_PERCENTAGE = 0.01; // 1% of the current jackpot
const EARLY_BIRD_EPOCHS = 30;
const SCORE_HALVING_EPOCHS = 90;
const DEBOUNCE_DELAY = 5000; // 5 seconds

export function GameProvider({ children }: { children: ReactNode }) {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const {
    fetchGlobalState: fetchGlobalStateFromContract,
    placeBid: placeBidOnChain,
  } = useSolanaContracts();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [currentValue, setCurrentValue] = useState(0.0);
  const [bidAmount, setBidAmount] = useState<string>("");
  const fetchTimeoutRef = useRef<NodeJS.Timeout>();
  const lastFetchTimeRef = useRef<number>(0);

  const incrementValue = (amount: number) => {
    setCurrentValue((prev) => parseFloat((prev + amount).toFixed(1)));
  };

  const [gameState, setGameState] = useState<GameState>({
    poolAmount: 0,
    currentBid: 0.1,
    userBidAmount: 0.1,
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
    lastBidder: null, // <-- initialize here
  });

  const setUserBidAmount = useCallback((amount: number) => {
    setGameState((prev) => ({
      ...prev,
      userBidAmount: amount,
    }));
  }, []);

  const fetchGlobalState = useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchTimeRef.current < DEBOUNCE_DELAY) {
      return;
    }

    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    fetchTimeoutRef.current = setTimeout(async () => {
      try {
        const globalState =
          (await fetchGlobalStateFromContract()) as GlobalState;

        if (!globalState) {
          console.error("Global state is null (possibly not initialized yet).");
          return;
        }

        setGameState((prev) => ({
          ...prev,
          poolAmount: globalState.currentJackpot / 1e9,
          currentBid: globalState.lastBidAmount
            ? globalState.lastBidAmount / 1e9
            : 0,
          lastBidder: globalState.lastBidder ?? null,
          timer: calculateTimer(globalState),
          epoch: 1,
          isEarlyBird: true,
          userBidAmount: prev.userBidAmount,
          firstBidPlaced: !!globalState.lastBidder,
        }));

        lastFetchTimeRef.current = Date.now();
      } catch (error) {
        console.error("Failed to fetch global state:", error);
      }
    }, DEBOUNCE_DELAY);
  }, [fetchGlobalStateFromContract]);

  // Helper to calculate timer based on on-chain state
  function calculateTimer(globalState: GlobalState) {
    if (!globalState.lastBidTimestamp) return 3600; // 1 hour default
    const now = Math.floor(Date.now() / 1000);
    const end =
      globalState.lastBidTimerEnd ?? globalState.lastBidTimestamp + 3600;
    return Math.max(0, end - now);
  }

  useEffect(() => {
    if (connected) {
      fetchGlobalState();
    }
  }, [connected, fetchGlobalState]);

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
            userBidAmount: prev.userBidAmount,
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
          userBidAmount: prev.userBidAmount,
        }));
      }
    };

    updateWalletStatus();
  }, [connected, publicKey, connection]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchGlobalState();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchGlobalState]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        timer: Math.max(0, prev.timer - 1),
        userBidAmount: prev.userBidAmount,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameState.timer === 0) {
      fetchGlobalState();
    }
  }, [gameState.timer, fetchGlobalState]);

  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, []);

  const calculateMinimumBid = (pool: number) => {
    return pool * MIN_BID_PERCENTAGE;
  };

  const placeBid = async (amount: number) => {
    if (!publicKey) {
      throw new Error("Wallet not connected");
    }

    try {
      // Convert SOL to lamports (1 SOL = 1e9 lamports)
      const lamportsOffered = Math.floor(amount * 1e9);

      const txid = await placeBidOnChain(lamportsOffered, publicKey);

      if (!txid) {
        throw new Error("Transaction failed");
      }

      await fetchGlobalState();
    } catch (error) {
      console.error("Error placing bid:", error);
      throw error;
    }
  };

  const stakeTokens = async (amount: number) => {
    setGameState((prev) => ({
      ...prev,
      userStake: prev.userStake + amount,
      userBidAmount: prev.userBidAmount,
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

    try {
      console.log("Current game state:", {
        currentBid: gameState.currentBid,
        poolAmount: gameState.poolAmount,
        isConnected: gameState.isConnected,
      });

      await placeBid(gameState.userBidAmount);

      const newMaxTimer = Math.max(INITIAL_MAX_TIMER, gameState.maxTimer - 1);

      setGameState((prev) => ({
        ...prev,
        timer: newMaxTimer,
        maxTimer: newMaxTimer,
        userScore: prev.userScore + 1,
        userBidAmount: prev.userBidAmount,
      }));
    } catch (error) {
      console.error("Error in handlePress:", error);
      throw error;
    }
  };

  const calculateRewards = () => {
    console.log("Calculating rewards...");
  };

  const distributeStakingPool = () => {
    console.log("Distributing staking pool...");
  };

  const updateRewards = (amount: number) => {
    setGameState((prev) => ({
      ...prev,
      rewards: (prev.rewards || 0) + amount,
    }));
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
        setUserBidAmount,
        bidAmount,
        setBidAmount,
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
