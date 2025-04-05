"use client";

import { motion } from "framer-motion";
import { useGame } from "../../context/GameContext";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function PressButton() {
  const { handlePress } = useGame();

  const onPress = async () => {
    try {
      await handlePress();
    } catch (error) {
      console.error("Failed to press:", error);
    }
  };

  return (
    <motion.div
      onClick={onPress}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer relative flex items-center justify-center"
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
