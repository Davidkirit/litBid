"use client";

import { useGame } from "../../context/GameContext";
import { useState } from "react";

export default function Staking() {
  const { gameState, stakeTokens } = useGame();
  const { userStake, userScore, isConnected, referralRewards } = gameState;
  const [isLoading, setIsLoading] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");

  const handleStake = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    try {
      await stakeTokens(amount);
      setStakeAmount("");
    } catch (error) {
      console.error("Failed to stake tokens:", error);
      alert("Failed to stake tokens. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-black/40 rounded-lg">
      <div className="text-center space-y-2">
        <div className="text-2xl pixel-font text-white">
          Your Stake: {userStake.toFixed(2)} SOL
        </div>
        <div className="text-xl pixel-font text-[#FF3B9A]">
          Your Score: {userScore.toFixed(2)}
        </div>
        <div className="text-lg pixel-font text-[#FFE600]">
          Referral Rewards: {referralRewards.toFixed(2)} SOL
        </div>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div className="text-sm text-gray-400 text-center">
          Stake your tokens to earn rewards from subsequent bids
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="Enter amount to stake"
            className="flex-1 bg-black/60 text-white px-4 py-2 rounded-full pixel-font text-sm focus:outline-none focus:ring-2 focus:ring-[#FF3B9A]"
            disabled={!isConnected}
          />
          <button
            onClick={handleStake}
            disabled={isLoading || !isConnected || !stakeAmount}
            className={`bg-white hover:bg-[#FF3B9A] text-[#0F1225] hover:text-white px-6 py-2 rounded-full transition-all duration-200 pixel-font text-sm ${
              isLoading || !isConnected || !stakeAmount
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading ? "Processing..." : "Stake"}
          </button>
        </div>

        {!isConnected && (
          <div className="text-sm text-gray-400 text-center">
            Connect wallet to stake tokens
          </div>
        )}
      </div>
    </div>
  );
}
