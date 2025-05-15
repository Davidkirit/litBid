"use client";

import { useGame } from "../../context/GameContext";
import { useEffect, useState } from "react";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Countdown() {
  const { gameState, setGameState } = useGame();
  const { timer, firstBidPlaced } = gameState;

  const [displayTimer, setDisplayTimer] = useState(timer);

  useEffect(() => {
    setDisplayTimer(timer);
  }, [timer]);

  // Handle countdown logic
  useEffect(() => {
    if (!firstBidPlaced) return;

    const interval = setInterval(() => {
      setDisplayTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [firstBidPlaced]);

  // Reset timer logic when a new bid is placed
  useEffect(() => {
    if (firstBidPlaced && timer > 1800) {
      setDisplayTimer(timer);
    } else if (firstBidPlaced && timer <= 1800) {
      // If the timer is less than or equal to 30 minutes, reset to 30 minutes
      setDisplayTimer(1800);
      setGameState((prev) => ({
        ...prev,
        timer: 1800,
      }));
    }
  }, [timer, firstBidPlaced, setGameState]);

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
