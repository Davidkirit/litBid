"use client";

import { useGame } from "../../context/GameContext";
import { useState } from "react";

export default function Stake() {
  const { gameState, stakeTokens } = useGame();
  const { userStake, userScore, referralRewards } = gameState;
  const [isLoading, setIsLoading] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [solAmount, setSolAmount] = useState("");

  const handleStake = async () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    try {
      await stakeTokens(amount);
      setStakeAmount("");
      setSolAmount("");
    } catch (error) {
      console.error("Failed to stake tokens:", error);
      alert("Failed to stake tokens. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePercentage = (percentage: number) => {
    if (percentage === 100) {
      setStakeAmount(userStake.toString());
    } else {
      setStakeAmount((userStake * (percentage / 100)).toString());
    }
  };

  return (
    <div className="p-1.5 sm:p-4 space-y-2 sm:space-y-4">
      {/* Top stats */}
      <div className="bg-[#1a1b35] px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-md inline-block">
        <span className="text-gray-400 pixel-font text-[8px] sm:text-xs">
          {userStake.toFixed(2)} $LITBID STAKED
        </span>
      </div>

      {/* New Position Section */}
      <div className="space-y-0.5 sm:space-y-2">
        <h2 className="text-lg sm:text-3xl text-white pixel-font">
          NEW POSITION
        </h2>
        <p className="text-gray-400 pixel-font text-[8px] sm:text-xs leading-tight">
          STAKE $LITBID TO EARN REWARDS FROM THE BONZI AND THE LIQUIDITY
          TRIFECTA SIMULTANEOUSLY. MEOW MEOW WOOF WOOF LITBID LITBID
        </p>
      </div>

      {/* Amount Input Section */}
      <div className="space-y-0.5 sm:space-y-2">
        <div className="text-white pixel-font text-[10px] sm:text-sm">
          AMOUNT
        </div>

        {/* Input container */}
        <div className="bg-[#1a1b35] p-1.5 sm:p-3 rounded-lg flex justify-between items-center">
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="bg-transparent text-base sm:text-xl text-white pixel-font outline-none w-full"
            placeholder="Enter amount"
          />
          <span className="text-gray-400 pixel-font text-[10px] sm:text-sm">
            $LITBID
          </span>
        </div>

        {/* SOL Amount Input */}
        <div className="bg-[#1a1b35] p-1.5 sm:p-3 rounded-lg flex justify-between items-center">
          <input
            type="number"
            value={solAmount}
            onChange={(e) => setSolAmount(e.target.value)}
            className="bg-transparent text-base sm:text-xl text-white pixel-font outline-none w-full"
            placeholder="Enter SOL amount"
          />
          <span className="text-gray-400 pixel-font text-[10px] sm:text-sm">
            SOL
          </span>
        </div>

        {/* Balance and Percentages */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 pixel-font text-[8px] sm:text-xs">
            BALANCE: {userStake.toFixed(2)} $LITBID
          </span>
          <div className="flex gap-0.5 sm:gap-2 text-[#FFD700] pixel-font text-[8px] sm:text-xs">
            <button
              onClick={() => handlePercentage(10)}
              className="hover:text-yellow-400"
            >
              10%
            </button>
            <button
              onClick={() => handlePercentage(50)}
              className="hover:text-yellow-400"
            >
              50%
            </button>
            <button
              onClick={() => handlePercentage(100)}
              className="hover:text-yellow-400"
            >
              MAX
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-0.5 sm:space-y-2">
        <button
          onClick={handleStake}
          disabled={isLoading || !stakeAmount || !solAmount}
          className={`w-full bg-[#B8860B] hover:bg-[#9A7209] text-black pixel-font py-1 sm:py-2 rounded-lg transition-colors text-[10px] sm:text-sm ${
            isLoading || !stakeAmount || !solAmount
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {isLoading ? "PROCESSING..." : "PROCEED"}
        </button>

        <button className="w-full text-[#FFD700] hover:text-yellow-400 pixel-font py-0.5 sm:py-1 transition-colors text-[8px] sm:text-xs">
          BUY LITBID
        </button>
      </div>

      {/* Stats Display */}
      <div className="mt-1 sm:mt-4 space-y-0.5 sm:space-y-2 text-center">
        <div className="text-xs sm:text-lg pixel-font text-[#FFE600]">
          Your Score: {userScore.toFixed(2)}
        </div>
        <div className="text-xs sm:text-lg pixel-font text-[#FF3B9A]">
          Referral Rewards: {referralRewards.toFixed(2)} SOL
        </div>
      </div>
    </div>
  );
}
