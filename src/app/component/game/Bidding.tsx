"use client";

import { useGame } from "../../context/GameContext";
import { useState } from "react";

export default function Bidding() {
  const { gameState, placeBid } = useGame();
  const { poolAmount, currentBid, isConnected } = gameState;
  const [isLoading, setIsLoading] = useState(false);

  const handleBid = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    try {
      await placeBid(currentBid);
    } catch (error) {
      console.error("Failed to place bid:", error);
      alert("Failed to place bid. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-center">
        <div className="text-2xl pixel-font text-white mb-2">
          Current Pool: {poolAmount.toFixed(2)} SOL
        </div>
        <div className="text-xl pixel-font text-[#FF3B9A]">
          Minimum Bid: {currentBid.toFixed(2)} SOL
        </div>
      </div>

      <button
        onClick={handleBid}
        disabled={isLoading || !isConnected}
        className={`bg-white hover:bg-[#FF3B9A] text-[#0F1225] hover:text-white px-8 py-3 rounded-full transition-all duration-200 pixel-font text-lg ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Processing..." : "Place Bid"}
      </button>

      {!isConnected && (
        <div className="text-sm text-gray-400">
          Connect wallet to place a bid
        </div>
      )}
    </div>
  );
}
