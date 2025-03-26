"use client";

import { useGame } from "../../context/GameContext";

export default function Countdown() {
  const { gameState } = useGame();
  const { timer } = gameState;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-4xl pixel-font text-white mb-2">
        {formatTime(timer)}
      </div>
      <div className="text-sm text-gray-400">
        Next bid resets timer to 30 minutes
      </div>
    </div>
  );
}
