"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Rightbody() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Pixel art button */}
        <motion.div
          className="relative w-40 h-40"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            onClick={() => router.push("/game")}
            className="w-full h-full cursor-pointer"
            style={{
              background: "#FF3B9A",
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              boxShadow: "0 0 20px rgba(255, 59, 154, 0.3)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-2xl pixel-font">PRESS</span>
            </div>
          </div>

          {/* Stars */}
          {[
            { left: "-2rem", top: "-2rem" },
            { right: "-2rem", top: "0" },
            { left: "-3rem", bottom: "0" },
          ].map((position, index) => (
            <motion.div
              key={index}
              className="absolute text-[#FFE600] text-3xl"
              style={position}
              animate={{
                y: [-4, 4, -4],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              ⭐
            </motion.div>
          ))}

          {/* Coins */}
          {[
            { right: "-1rem", top: "-1rem" },
            { left: "-2rem", bottom: "-1rem" },
            { right: "-2rem", bottom: "2rem" },
          ].map((position, index) => (
            <motion.div
              key={`coin-${index}`}
              className="absolute w-8 h-8 rounded-full bg-[#FFD700]"
              style={position}
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            >
              <div className="w-6 h-6 m-1 rounded-full border-2 border-[#B8860B]"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
