"use client";

import React from "react";

interface StarProps {
  size?: number;
  className?: string;
  src?: string;
}

const Star = ({
  size = 8,
  className = "",
  src = "star.png",
}: StarProps) => {
  const outerSize = size * 4 + 2;
  const innerSize = size * 4;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: `${outerSize}px`, height: `${outerSize}px` }}
    >
      {/* Black outline layers */}
      <img
        src={src}
        alt="star-outline"
        className="absolute -translate-x-[1px] -translate-y-[1px] brightness-0"
        style={{ width: `${outerSize}px` }}
      />
      <img
        src={src}
        alt="star-outline"
        className="absolute translate-x-[1px] -translate-y-[1px] brightness-0"
        style={{ width: `${outerSize}px` }}
      />
      <img
        src={src}
        alt="star-outline"
        className="absolute -translate-x-[1px] translate-y-[1px] brightness-0"
        style={{ width: `${outerSize}px` }}
      />
      <img
        src={src}
        alt="star-outline"
        className="absolute translate-x-[1px] translate-y-[1px] brightness-0"
        style={{ width: `${outerSize}px` }}
      />

      {/* Shadow layer */}
      <img
        src={src}
        alt="star-shadow"
        className="absolute translate-x-[1px] translate-y-[1px]"
        style={{
          width: `${innerSize}px`,
          filter: "brightness(0.5) drop-shadow(0 0 2px #644A03)",
        }}
      />

      {/* Main star */}
      <img
        src={src}
        alt="star"
        className="relative z-10"
        style={{
          width: `${innerSize}px`,
          filter: "drop-shadow(0 0 3px rgba(255, 230, 0, 0.5))",
        }}
      />
    </div>
  );
};

export default Star;
