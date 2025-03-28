"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export default function Navbar() {
  const { connected } = useWallet();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0B0F2F] via-[#11154D] to-[#0B0F2F] backdrop-blur-sm border-b border-[#FFD700]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <span
              className="text-white pixel-font text-4xl"
              style={{
                textShadow: "2px 2px 0 #00A3FF, 4px 4px 0 #0056FF",
              }}
            >
              LITBID
            </span>
          </div>
          <div className="flex-shrink-0 ml-auto">
            <WalletMultiButton className="!bg-[#FF3B9A] !rounded-lg !px-6 !py-2 !text-white hover:!bg-[#FF3B9A]/80 !transition-all !duration-200 !h-auto !text-sm pixel-font" />
          </div>
        </div>
      </div>
    </nav>
  );
}
