"use client";

import coinAnimation from "../coin/Animation - 1743072756056.json";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface CoinProps {
  index: number;
}
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Coin({ index }: CoinProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [animationDelay, setAnimationDelay] = useState(0);
  const [animationPattern, setAnimationPattern] = useState(1);
  const [duration, setDuration] = useState(5);

  useEffect(() => {
    const randomX = Math.random() * 60 + 20;
    const randomY = Math.random() * 60 + 20;
    const delay = Math.random() * 3;
    const pattern = Math.floor(Math.random() * 3) + 1;
    const randomDuration = Math.random() * 3 + 4;
    setPosition({ x: randomX, y: randomY });
    setAnimationDelay(delay);
    setAnimationPattern(pattern);
    setDuration(randomDuration);

    const intervalId = setInterval(() => {
      setAnimationPattern((prev) => (prev === 3 ? 1 : prev + 1));
      setDuration(Math.random() * 3 + 4);
    }, randomDuration * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animation: `float-${animationPattern} ${duration}s ease-in-out infinite`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div className="w-10 h-10 md:w-16 md:h-16">
        <Lottie
          animationData={coinAnimation}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
