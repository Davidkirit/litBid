import { motion } from "framer-motion";

const PressButton = () => {
  return (
    <motion.div
      className="relative w-48 h-48 filter drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* White outer glow layer */}
      <div
        className="absolute inset-[-8px] bg-white/5 blur-xl"
        style={{
          clipPath:
            "polygon(28% 0%, 72% 0%, 100% 28%, 100% 72%, 72% 100%, 28% 100%, 0% 72%, 0% 28%)",
        }}
      />

      {/* Outer shadow */}
      <div
        className="absolute inset-0 bg-pink-900/50"
        style={{
          clipPath:
            "polygon(28% 0%, 72% 0%, 100% 28%, 100% 72%, 72% 100%, 28% 100%, 0% 72%, 0% 28%)",
          transform: "translate(6px, 6px)",
        }}
      />

      {/* Base pink layer */}
      <div
        className="absolute inset-0 bg-[#FF3B9A]"
        style={{
          clipPath:
            "polygon(28% 0%, 72% 0%, 100% 28%, 100% 72%, 72% 100%, 28% 100%, 0% 72%, 0% 28%)",
        }}
      >
        {/* Inner white border */}
        <div
          className="absolute inset-[3px] bg-white/10"
          style={{
            clipPath:
              "polygon(28% 0%, 72% 0%, 100% 28%, 100% 72%, 72% 100%, 28% 100%, 0% 72%, 0% 28%)",
          }}
        >
          {/* Inner pink gradient */}
          <div
            className="absolute inset-[2px] bg-gradient-to-br from-pink-400 to-[#FF3B9A]"
            style={{
              clipPath:
                "polygon(28% 0%, 72% 0%, 100% 28%, 100% 72%, 72% 100%, 28% 100%, 0% 72%, 0% 28%)",
            }}
          >
            {/* Text container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <span className="absolute text-pink-900 transform translate-x-[2px] translate-y-[2px] text-4xl pixel-font">
                  PRESS
                </span>
                <span className="relative text-white text-4xl pixel-font z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  PRESS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PressButton;
