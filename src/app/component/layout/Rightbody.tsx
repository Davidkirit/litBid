"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuestionMark from "../game/QuestionMark";
import PressButton from "../game/PressButton";
import HowItWorksPopup from "../game/HowItWorksPopup";
import Star from "../game/Star";

export default function Rightbody() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full max-w-[800px] mx-auto px-8">
        {/* Main game section */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <motion.div
            className="relative overflow-hidden"
            animate={{
              y: [-6, 6, -6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Stars */}
            <div className="absolute top-4 left-4 w-6 h-6">
              <Star size={24} className="text-[#FFD700]" />
            </div>
            <div className="absolute top-4 right-4 w-6 h-6">
              <Star size={24} className="text-[#FFD700]" />
            </div>
            <div className="absolute bottom-4 left-4 w-6 h-6">
              <Star size={24} className="text-[#FFD700]" />
            </div>

            {/* PRESS button */}
            <div className="flex justify-center">
              <PressButton />
            </div>
          </motion.div>
        </div>

        {/* Question Mark Button */}
        <div className="absolute bottom-8 right-8">
          <QuestionMark onClick={() => setShowPopup(true)} />
        </div>

        {/* How It Works Popup */}
        {showPopup && <HowItWorksPopup onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
}
