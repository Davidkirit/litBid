"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start2p",
});

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
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <span
              className={`${pressStart2P.className} text-4xl text-[#0e0725]`}
              style={{
                textShadow: "2px 2px 0 white, 4px 4px 0 white",
              }}
            >
              LITBID
            </span>
          </div>

          {/* Wallet Connect */}
          <div className="flex-shrink-0 ml-auto">
            <WalletMultiButton className="!bg-[#FF3B9A] !rounded-lg !px-6 !py-2 !text-white hover:!bg-[#FF3B9A]/80 !transition-all !duration-200 !h-auto !text-sm pixel-font" />
          </div>
        </div>
      </div>
    </nav>
  );
}
