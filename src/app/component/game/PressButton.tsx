"use client";

import { motion } from "framer-motion";
import { useGame } from "../../context/GameContext";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function PressButton() {
  const { gameState, handlePress } = useGame();

  const onPress = async () => {
    try {
      await handlePress();
    } catch (error) {
      console.error("Failed to press:", error);
    }
  };

  return (
    <motion.div
      className={`${pressStart2P.className} relative w-48 h-48 cursor-pointer`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onPress}
      style={{
        filter: "drop-shadow(0 0 40px rgba(255,255,255,0.15))",
      }}
    >
      {/* Outer white border layer */}
      <div
        className="absolute inset-0"
        style={{
          clipPath:
            "polygon(28% 0%, 72% 0%, 100% 28%, 100% 72%, 72% 100%, 28% 100%, 0% 70%, 0% 28%)",
          backgroundColor: "white",
        }}
      >
        {/* Inner pink layer inset to create the border effect */}
        <div
          className="absolute"
          style={{
            top: "8px",
            left: "8px",
            right: "8px",
            bottom: "8px",
            clipPath:
              "polygon(28% 0%, 72% 0%, 100% 28%, 100% 72%, 72% 100%, 28% 100%, 0% 70%, 0% 28%)",
            backgroundColor: "#FF3B9A",
          }}
        >
          {/* Text container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              PRESS
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
