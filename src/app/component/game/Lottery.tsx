"use client";

export default function LotteryPoolPage() {
  return (
    <div className="space-y-2 flex flex-col items-center text-center">
      <div className="text-sm tracking-[0.3em] text-white/90 pixel-font">
        LOTTERY POOL
      </div>

      {/* 3D number display */}
      <div className="relative">
        <span className="text-6xl pixel-font relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-[#FFE600] to-[#FFD700]">
          30.0K
        </span>
        <span className="text-6xl pixel-font absolute left-[2px] top-[2px] z-10 text-[#B8860B]">
          30.0K
        </span>
        <span className="text-6xl pixel-font absolute left-[4px] top-[4px] z-0 text-[#8B6914]">
          30.0K
        </span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-gray-400 pixel-font tracking-[0.2em]">
          $SOL
        </span>
        <span className="text-xs text-gray-500 pixel-font">
          Awarded Across Ten
        </span>
      </div>
    </div>
  );
}
