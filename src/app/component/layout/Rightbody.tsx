"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuestionMark from "../game/QuestionMark";
import PressButton from "../game/PressButton";
import HowItWorksPopup from "../game/HowItWorksPopup";
import StarGroup from "../game/StarGroup";

export default function Rightbody() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Main game section */}
        <div className="relative w-full flex items-center justify-center">
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

        {/* How It Works Popup */}
        {showPopup && <HowItWorksPopup onClose={() => setShowPopup(false)} />}
      </div>
    </div>
  );
}
