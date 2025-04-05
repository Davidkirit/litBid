"use client";

import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

interface QuestionMarkProps {
  onClick: () => void;
}

const QuestionMark = ({ onClick }: QuestionMarkProps) => {
  return (
    <button onClick={onClick} className="relative group">
      <div className="relative w-12 h-12 bg-[#FF3B9A] rounded-full flex items-center justify-center">
        <span
          className={`${pressStart2P.className} absolute text-[#251434] text-2xl transform translate-x-[2px] translate-y-[2px]`}
        >
          ?
        </span>
        <span
          className={`${pressStart2P.className} relative text-2xl z-10 text-white`}
        >
          ?
        </span>
        <div className="absolute inset-0 rounded-full blur-sm bg-[#FF3B9A]/20 scale-110" />
      </div>
    </button>
  );
};

export default QuestionMark;
