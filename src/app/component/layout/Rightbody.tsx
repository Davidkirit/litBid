"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import QuestionMark from "../game/QuestionMark";
import PressButton from "../game/PressButton";
import HowItWorksPopup from "../game/HowItWorksPopup";
import StarGroup from "../game/StarGroup";

export default function Rightbody() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#0B0A1E]/60 backdrop-blur-lg shadow-[0_0_10px_rgba(255,215,0,0.2)] rounded-lg p-4">
      {/* Main game section */}
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            y: [-6, 6, -6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative flex justify-center">
            {/* StarGroup */}
            <div className="absolute inset-0 overflow-visible">
              <StarGroup />
            </div>
            {/* PRESS button */}
            <PressButton />
          </div>
        </motion.div>
      </div>

      {/* Question Mark Button */}
      <div className="absolute bottom-2 right-2">
        <QuestionMark onClick={() => setShowPopup(true)} />
      </div>

      {/* How It Works Popup rendered via portal */}
      {showPopup &&
        typeof document !== "undefined" &&
        createPortal(
          <HowItWorksPopup onClose={() => setShowPopup(false)} />,
          document.body
        )}
    </div>
  );
}
