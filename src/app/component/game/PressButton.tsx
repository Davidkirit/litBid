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
      className="cursor-pointer"
      style={{
        width: "160px",
        height: "160px",
        imageRendering: "pixelated",
        position: "relative",
      }}
    >
      {/* Pixel-style 8-sided circle using div blocks */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#FF3B9A",
            clipPath: `
              polygon(
                30% 0%,
                70% 0%,
                100% 30%,
                100% 70%,
                70% 100%,
                30% 100%,
                0% 70%,
                0% 30%
              )
            `,
            border: "4px solid white",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
          }}
        ></div>

        {/* Text */}
        <span
          className={`${pressStart2P.className} absolute text-white text-xl`}
          style={{
            textShadow: "0 0 2px #fff",
            zIndex: 2,
          }}
        >
          PRESS
        </span>
      </div>
    </motion.div>
  );
}
