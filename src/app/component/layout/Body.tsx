"use client"; // Only if you're using the App Router in Next.js 13

import { useState, useRef } from "react";
import Referral from "../game/Referral";
import LeaderBoard from "../game/LeaderBoard";
import Leftbody from "./Leftbody";
import Rightbody from "./Rightbody";
import Rewards from "../game/Rewards";
import Stake from "../game/Stake";
import Coin from "../game/Coin";

export default function Body() {
  const [activeTab, setActiveTab] = useState<"litbid" | "rewards" | "stake">(
    "litbid"
  );
  const rightBodyRef = useRef<HTMLDivElement>(null);

  const scrollToRightBody = () => {
    // ✅ Safe usage of `window` to avoid SSR build errors
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      rightBodyRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const renderLeftContent = () => {
    switch (activeTab) {
      case "rewards":
        return <Rewards />;
      case "stake":
        return <Stake />;
      default:
        return <Leftbody />;
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-6 md:p-6">
      <div className="w-full max-w-[1100px]">
        {/* Main container */}
        <div className="relative">
          {/* Coins */}
          {Array.from({ length: 20 }).map((_, index) => (
            <Coin key={index} index={index} />
          ))}

          {/* Top navigation with lines */}
          <div className="relative flex flex-col sm:flex-row justify-between mb-6 text-xs sm:text-sm tracking-[0.2em] text-white pixel-font gap-4 sm:gap-0">
            {/* Left navigation with connecting lines */}
            <div className="relative flex flex-wrap gap-4 sm:gap-8 justify-center sm:justify-start">
              {/* Horizontal line connecting tabs */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#FFD700] -z-10 hidden sm:block" />

              {/* Navigation items */}
              <span
                className={`cursor-pointer relative px-4 py-2 transition-all duration-200 ${
                  activeTab === "litbid"
                    ? "text-yellow-400 scale-110 bg-[#0A0B1E] border-2 border-[#FFD700]"
                    : "hover:text-yellow-400 bg-[#0A0B1E]"
                }`}
                onClick={() => setActiveTab("litbid")}
              >
                LITBID
              </span>
              <span
                className={`cursor-pointer relative px-4 py-2 transition-all duration-200 ${
                  activeTab === "rewards"
                    ? "text-yellow-400 scale-110 bg-[#0A0B1E] border-2 border-[#FFD700]"
                    : "hover:text-yellow-400 bg-[#0A0B1E]"
                }`}
                onClick={() => setActiveTab("rewards")}
              >
                REWARDS
              </span>
              <span
                className={`cursor-pointer relative px-4 py-2 transition-all duration-200 ${
                  activeTab === "stake"
                    ? "text-yellow-400 scale-110 bg-[#0A0B1E] border-2 border-[#FFD700]"
                    : "hover:text-yellow-400 bg-[#0A0B1E]"
                }`}
                onClick={() => setActiveTab("stake")}
              >
                STAKE
              </span>
            </div>

            {/* Right side text with line */}
            <div className="relative text-center sm:text-right">
              {/* Horizontal line for right side */}
              <div className="absolute top-1/2 right-0 w-full sm:w-[150%] h-[2px] bg-[#FFD700] -z-10 hidden sm:block" />

              <div
                className="cursor-pointer md:cursor-default px-4 py-2 bg-[#0A0B1E]"
                onClick={scrollToRightBody}
              >
                <span className="text-[#FFD700] hover:text-yellow-400 md:hover:text-[#FFD700]">
                  PRESS TO PLAY!
                </span>
              </div>
            </div>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left column */}
            <div className="border-2 border-[#FFD700] rounded-lg p-3 md:p-4 h-[400px] md:h-[500px]">
              {renderLeftContent()}
            </div>

            {/* Right column */}
            <div
              ref={rightBodyRef}
              className="border-2 border-[#FFD700] rounded-lg p-3 md:p-4 h-[400px] md:h-[500px] scroll-mt-4 relative"
            >
              <Rightbody />
            </div>
          </div>

          {/* Bottom sections */}
          <div className="space-y-4 md:space-y-6 mt-4 md:mt-6">
            <div className="border-2 border-[#FFD700] rounded-lg p-3 md:p-4">
              <Referral />
            </div>
            <div className="border-2 border-[#FFD700] rounded-lg p-3 md:p-4">
              <LeaderBoard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
