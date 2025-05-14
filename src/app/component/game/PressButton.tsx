"use client";
import React, { useState } from "react";
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
  const { placeBid: contextPlaceBid, incrementValue } = useGame();

  const [amount, setAmount] = useState(0.1);

  const handlePress = async () => {
    if (!publicKey) {
      toast.error("Connect your wallet first");
      return;
    }

    const lamports = amount * 1e9; // Convert SOL to lamports
    const txid = await onChainPlaceBid(lamports, publicKey);

    if (txid) {
      toast.success("Bid placed successfully!");

      // Increment the value in the GameContext
      incrementValue(amount);

      await contextPlaceBid(amount);

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
  };

  return (
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
  );
}
