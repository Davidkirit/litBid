"use client";

import Countdown from "../game/Countdown";
import Lottery from "../game/Lottery";

export default function Leftbody() {
  return (
    <div className="flex items-center justify-center px-4 h-full overflow-hidden">
      <div className="w-full max-w-md space-y-4 h-full flex flex-col justify-center">
        {/* Lottery Pool Box */}
        <div className="border border-[#FFD700]/50 rounded-lg p-6 h-[180px] bg-[#0B0A1E]/60 backdrop-blur-lg shadow-[0_0_10px_rgba(255,215,0,0.2)]">
          <Lottery />
        </div>

        {/* Time Remaining Box */}
        <div className="border border-[#FFD700]/50 rounded-lg p-6 h-[180px] bg-[#0B0A1E]/60 backdrop-blur-lg shadow-[0_0_10px_rgba(255,215,0,0.2)]">
          <Countdown />
        </div>
      </div>
    </div>
  );
}
