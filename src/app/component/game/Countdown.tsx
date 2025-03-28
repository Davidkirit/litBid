"use client";

import { useGame } from "../../context/GameContext";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Countdown() {
  const { gameState } = useGame();
  const { timer, maxTimer } = gameState;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`h-full flex flex-col items-center justify-center space-y-4 ${pressStart2P.className}`}
    >
      <div className="text-sm tracking-[0.3em] text-white/90">
        TIME REMAINING
      </div>
      <div className="text-4xl text-white">{formatTime(timer)}</div>
      <div className="text-sm text-gray-400 text-center">
        <div className="text-xs">Until the Game Ends Last Litbidder wins!</div>
      </div>
    </div>
  );
}
