"use client";

import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function LotteryPoolPage() {
  return (
    <div
      className={`space-y-2 flex flex-col items-center text-center ${pressStart2P.className}`}
    >
      <div className="text-sm tracking-[0.3em] text-white/90">LOTTERY POOL</div>

      {/* 3D number display */}
      <div className="relative">
        <span
          className="text-6xl relative z-20 pixel-font"
          style={{
            color: "#0e0725",
            textShadow: "2px 2px 0 yellow, 4px 4px 0 yellow",
          }}
        >
          30.0K
        </span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-gray-400 tracking-[0.2em]">$SOL</span>
        <span className="text-xs text-gray-500">Awarded Across Ten</span>
      </div>
    </div>
  );
}
