"use client";

import { useGame } from "../../context/GameContext";
import { useEffect, useState } from "react";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Countdown() {
  const { gameState } = useGame();
  const { timer, firstBidPlaced } = gameState;

  const [displayTimer, setDisplayTimer] = useState(timer);

  useEffect(() => {
    setDisplayTimer(timer);
  }, [timer]);

  useEffect(() => {
    if (!firstBidPlaced) return;
    const interval = setInterval(() => {
      setDisplayTimer((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(interval);
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [firstBidPlaced]);

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

  if (!firstBidPlaced) {
    return (
      <div
        className={`h-full flex flex-col items-center justify-center text-center ${pressStart2P.className}`}
      >
        <div className="text-white text-sm">Waiting for the first bid...</div>
        <div className="text-xs text-gray-400 mt-2">
          The countdown will start when the first bid is placed!
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-full flex flex-col items-center justify-center space-y-4 ${pressStart2P.className}`}
    >
      <div className="text-sm tracking-[0.3em] text-white/90">
        TIME REMAINING
      </div>
      <div className="text-4xl text-white">{formatTime(displayTimer)}</div>
      <div className="text-sm text-gray-400 text-center">
        <div className="text-xs">Until the Game Ends Last Litbidder wins!</div>
      </div>
    </div>
  );
}
