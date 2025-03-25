"use client"; // Only if you're using the App Router in Next.js 13

import Referral from "../game/Referral";
import LeaderBoard from "../game/LeaderBoard";
import Leftbody from "./Leftbody";
import Rightbody from "./Rightbody";

export default function Body() {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="w-[1100px] p-6">
        {/* Main container */}
        <div>
          {/* Top navigation */}
          <div className="flex justify-between mb-6 text-sm tracking-[0.2em] text-white pixel-font">
            <div className="flex gap-8">
              <span className="hover:text-yellow-400 cursor-pointer">YEET</span>
              <span className="hover:text-yellow-400 cursor-pointer">
                REWARDS
              </span>
              <span className="hover:text-yellow-400 cursor-pointer">
                STAKE
              </span>
            </div>
            <div>
              <div className="text-[#FFD700]">ENTER TO PLAY!</div>
            </div>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left column */}
            <div className="border-2 border-[#FFD700] rounded-lg p-4">
              <Leftbody />
            </div>

            {/* Right column with button */}
            <div className="border-2 border-[#FFD700] rounded-lg p-4">
              <Rightbody />
            </div>
          </div>

          <div className="border-2 border-[#FFD700] rounded-lg p-4 mt-6">
            <Referral />
          </div>
          <div className="border-2 border-[#FFD700] rounded-lg p-4 mt-6">
            <LeaderBoard />
          </div>
        </div>
      </div>
    </div>
  );
}
