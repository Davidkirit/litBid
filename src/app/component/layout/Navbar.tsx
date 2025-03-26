"use client";

export default function NavBar() {
  return (
    <nav className="bg-black/80 backdrop-blur-sm p-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-4xl pixel-font relative">
          {/* Base layer */}
          <span className="relative z-20 text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]">
            LITBID
          </span>

          {/* Shadow layers */}
          <span className="absolute left-[2px] top-[2px] z-10 text-[#644A03]">
            LITBID
          </span>
          <span className="absolute left-[3px] top-[3px] z-0 text-[#644A03]">
            LITBID
          </span>
          <span className="absolute left-[4px] top-[4px] z-0 text-[#644A03]">
            LITBID
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
          <span className="text-gray-400 text-sm">N/A SOL</span>
        </div>
        <button className="bg-white hover:bg-[#FF3B9A] text-[#0F1225] hover:text-white px-6 py-2 rounded-full transition-all duration-200 pixel-font text-sm">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}
