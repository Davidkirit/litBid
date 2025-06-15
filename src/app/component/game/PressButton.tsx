"use client";
import React from "react";
import { motion } from "framer-motion";

import { Press_Start_2P } from "next/font/google";
import { useWallet } from "@solana/wallet-adapter-react";
import useSolanaContracts from "../../hooks/useSolanaContracts";
import { toast } from "react-toastify";
import { useGame } from "../../context/GameContext";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function PressButton() {
  const { publicKey } = useWallet();
  const { placeBid: onChainPlaceBid, callingSmartContract } =
    useSolanaContracts();
  const {
    gameState,
    placeBid: contextPlaceBid,
    incrementValue,
    fetchGlobalState,
    bidAmount,
    setBidAmount,
    setGameState,
  } = useGame();

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(e.target.value);
  };

  const handlePress = async () => {
    if (!publicKey) {
      toast.error("Connect your wallet first");
      return;
    }

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount < 0) {
      toast.error("Please enter a valid bid amount.");
      return;
    }
    const lamports = amount * 1e9; // Convert SOL to lamports

    try {
      const txid = await onChainPlaceBid(lamports, publicKey);

      if (txid) {
        toast.success("Bid placed successfully!");
        await fetchGlobalState();

        incrementValue(amount);

        await contextPlaceBid(amount);

        setGameState((prev) => ({
          ...prev,
          userScore: prev.userScore + 1,
          userBidAmount: prev.userBidAmount,
        }));

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
      } else {
        toast.error("Failed to place bid.");
      }
    } catch (error) {
      toast.error("An error occurred while placing the bid.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          value={bidAmount}
          onChange={handleBidChange}
          min="0"
          step="0.1"
          style={{ zIndex: 10000, position: "relative", pointerEvents: "auto" }}
          className={`${pressStart2P.className} w-32 px-3 py-2 bg-black/50 text-white border-2 border-white/30 rounded-lg focus:outline-none focus:border-white/50`}
          placeholder="Bid in SOL"
        />
        <span className={`${pressStart2P.className} text-white`}>SOL</span>
      </div>
      <p className={`${pressStart2P.className} text-white text-sm mb-2`}>
        Min: {(gameState.poolAmount * 0.01).toFixed(4)} SOL
      </p>

      <motion.div
        onClick={handlePress}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`cursor-pointer relative flex items-center justify-center ${
          callingSmartContract ? "opacity-50 pointer-events-none" : ""
        }`}
        style={{
          width: "200px",
          height: "200px",
          background: "transparent",
        }}
      >
        <img
          src="/pixel%20btn2%201.png"
          alt="Press Button"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            imageRendering: "pixelated",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
          }}
        />

        <span
          className={`${pressStart2P.className} absolute text-white text-2xl`}
          style={{
            textShadow: "0 0 2px #fff",
            pointerEvents: "none",
          }}
        >
          PRESS
        </span>
      </motion.div>
    </div>
  );
}
