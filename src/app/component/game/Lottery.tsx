"use client";

import { Press_Start_2P } from "next/font/google";
import { Inter } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

export default function LotteryPoolPage() {
  return (
    <div className="flex flex-col items-center text-center px-4 sm:px-6 md:px-8 w-full max-w-full overflow-hidden">
      {/* Heading */}
      <div
        className={`${pressStart2P.className} text-xs sm:text-sm md:text-base tracking-[0.2em] text-white/90 whitespace-nowrap`}
      >
        LOTTERY POOL
      </div>

      {/* 3D number display */}
      <div className="relative w-full flex justify-center">
        <span
          className={`${pressStart2P.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl relative z-20 whitespace-nowrap`}
          style={{
            color: "#282A64",
            textShadow: `
              2px 0 0 #ffff00,
              -2px 0 0 #ffff00,
              0 2px 0 #ffff00,
              0 -2px 0 #ffff00,
              1px 1px #ffff00,
              -1px -1px 0 #ffff00,
              1px -1px 0 #ffff00,
              -1px 1px 0 #ffff00,
              3px 3px 0 #ffd700,
              4px 4px 0 #ffd700,
              5px 5px 0 #ffd700,
              6px 6px 0 #ffd700
            `,
          }}
        >
          30.0K
        </span>
      </div>

      {/* Token Info */}
      <div
        className={`${pressStart2P.className} flex flex-col items-center gap-1 sm:gap-2 w-full`}
      >
        <span className="text-sm sm:text-base text-white whitespace-nowrap">
          $LITBID
        </span>
        <span className="text-[9px] sm:text-[10px] md:text-xs text-white/80 whitespace-nowrap">
          AWARDED ACROSS TEN
        </span>
      </div>
    </div>
  );
}
