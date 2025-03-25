"use client";

import Countdown from "../game/Countdown";
import Referral from "../game/Referral";

export default function Leftbody() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Lottery Pool Box */}
        {/* <div className="border-2 border-[#FFD700] rounded-lg p-6 bg-[#0A0D1F]">
          <div className="text-sm tracking-wider text-white pixel-font mb-3">
            LOTTERY POOL
          </div>
          <div className="text-[#FFE600] text-5xl pixel-font mb-2">30.0K</div>
          <div className="text-gray-400 text-xs pixel-font">$BERA</div>
        </div> */}

        {/* Time Remaining Box */}
        <div className="border-2 border-[#FFD700] rounded-lg p-6 ">
          <Countdown />
        </div>
      </div>
    </div>
  );
}
