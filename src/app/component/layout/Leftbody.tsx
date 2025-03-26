"use client";

import { motion } from "framer-motion";
import Countdown from "../game/Countdown";
import Lottery from "../game/Lottery";

export default function Leftbody() {
  return (
    <div className="flex items-center justify-center px-4 h-full overflow-hidden">
      <div className="w-full max-w-md space-y-4 h-full flex flex-col justify-center">
        {/* Lottery Pool Box */}
        <div className="border-2 border-[#FFD700] rounded-lg p-4 h-[180px] overflow-hidden">
          <Lottery />
        </div>

        {/* Time Remaining Box */}
        <div className="border-2 border-[#FFD700] rounded-lg p-4 h-[180px] overflow-hidden">
          <Countdown />
        </div>
      </div>
    </div>
  );
}
