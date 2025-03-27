"use client";

import { useGame } from "../../context/GameContext";

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
    <div className="h-full flex flex-col items-center justify-center">
      <div className="text-4xl pixel-font text-white mb-2">
        {formatTime(timer)}
      </div>
      <div className="text-sm text-gray-400 text-center">
        <div>Next press resets timer to {formatTime(maxTimer)}</div>
        <div className="text-xs mt-1">and reduces max time by 1 second</div>
      </div>
    </div>
  );
}
