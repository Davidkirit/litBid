"use client";

import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Rewards() {
  return (
    <div className="my-8 mx-auto w-full max-w-md bg-[#0B0A1E]/60 backdrop-blur-lg shadow-[0_0_10px_rgba(255,215,0,0.2)] rounded-lg p-12 flex flex-col items-center text-center space-y-12">
      {/* Header */}
      <div
        className={`${pressStart2P.className} text-xs sm:text-sm md:text-base tracking-[0.3em] text-white/90`}
      >
        YOUR REWARDS
      </div>

      {/* 3D number display */}
      <div className="relative">
        <span
          className={`${pressStart2P.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}
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

      {/* Token  */}
      <div className="flex flex-col items-center gap-2">
        <span
          className={`${pressStart2P.className} text-sm sm:text-base text-white`}
        >
          $LITBID
        </span>
        <span
          className={`${pressStart2P.className} text-[9px] sm:text-[10px] md:text-xs text-white/80`}
        >
          AWARDED ACROSS TEN
        </span>
      </div>

      {/* Description */}
      <p
        className={`${pressStart2P.className} text-[8px] sm:text-[9px] md:text-xs text-white/70 leading-tight max-w-[90%]`}
      >
        Airdropped Daily Based On Your Yeeting Volume
      </p>
    </div>
  );
}
