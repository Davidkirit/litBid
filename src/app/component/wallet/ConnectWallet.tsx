"use client";

import { useGame } from "../../context/GameContext";
import WalletModal from "./WalletModal";

export default function ConnectWallet() {
  const { gameState, showWalletModal, setShowWalletModal } = useGame();
  const { isConnected, walletAddress, solBalance } = gameState;

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <>
      <button
        onClick={() => setShowWalletModal(true)}
        className="bg-[#FF3B9A] hover:bg-[#FF3B9A]/80 text-white px-4 py-2 rounded-lg transition-all duration-200 pixel-font text-sm"
      >
        {isConnected ? (
          <div className="flex items-center gap-2">
            <span>{formatWalletAddress(walletAddress!)}</span>
            <span className="text-xs">({solBalance?.toFixed(2)} SOL)</span>
          </div>
        ) : (
          "Connect Wallet"
        )}
      </button>

      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      />
    </>
  );
}
