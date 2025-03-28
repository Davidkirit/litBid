"use client";

import Countdown from "../game/Countdown";
import Lottery from "../game/Lottery";

export default function Leftbody() {
  return (
    <div className="flex items-center justify-center px-4 h-full overflow-hidden">
      <div className="w-full max-w-md space-y-4 h-full flex flex-col justify-center">
        {/* Lottery Pool Box with glass effect */}
        <div className="border-2 border-[#FFD700] rounded-lg p-4 h-[180px] overflow-hidden bg-white/10 backdrop-blur-sm">
          <Lottery />
        </div>

        {/* Time Remaining Box with glass effect */}
        <div className="border-2 border-[#FFD700] rounded-lg p-4 h-[180px] overflow-hidden bg-white/10 backdrop-blur-sm">
          <Countdown />
        </div>
      </div>
    </div>
  );
}
