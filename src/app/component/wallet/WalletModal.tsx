"use client";

import { FC } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion, AnimatePresence } from "framer-motion";
require("@solana/wallet-adapter-react-ui/styles.css");

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: FC<WalletModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-[#0A0B1E] border-2 border-[#FFD700] rounded-lg p-6 w-[320px] space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-xl pixel-font text-white">
                  Connect Wallet
                </h2>
                <p className="text-sm text-gray-400 pixel-font">
                  Connect your Solana wallet to start playing
                </p>
              </div>

              {/* Wallet Connect Button */}
              <div className="flex justify-center">
                <WalletMultiButton className="!bg-[#FF3B9A] !rounded-lg !px-6 !py-3 !text-white hover:!bg-[#FF3B9A]/80 !transition-all !duration-200 pixel-font" />
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="w-full text-gray-400 hover:text-white text-sm pixel-font transition-colors mt-4"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WalletModal;
