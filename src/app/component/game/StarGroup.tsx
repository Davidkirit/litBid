"use client";

import { motion } from "framer-motion";
import Star from "./Star";

export default function StarGroup() {
  return (
    <div className="absolute -left-20 top-1/2 -translate-y-1/2 flex flex-col items-start justify-center gap-4">
      {/* First star */}
      <motion.div
        className="relative -translate-y-16"
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
      >
        <Star size={14} />
      </motion.div>

      {/* Second star */}
      <motion.div
        className="relative -translate-y-4"
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <Star size={16} />
      </motion.div>

      {/* Third star */}
      <motion.div
        className="relative translate-x-8 translate-y-8"
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      >
        <Star size={18} />
      </motion.div>
    </div>
  );
}
