interface StarProps {
  size?: number;
  className?: string;
}

const Star = ({ size = 8, className = "" }: StarProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Black outline layer */}
      <div
        className="absolute transform -translate-x-[1px] -translate-y-[1px]"
        style={{ filter: "brightness(0)" }}
      >
        <div
          className="text-black pixel-font"
          style={{ fontSize: `${size * 4 + 2}px` }}
        >
          ★
        </div>
      </div>
      <div
        className="absolute transform translate-x-[1px] -translate-y-[1px]"
        style={{ filter: "brightness(0)" }}
      >
        <div
          className="text-black pixel-font"
          style={{ fontSize: `${size * 4 + 2}px` }}
        >
          ★
        </div>
      </div>
      <div
        className="absolute transform -translate-x-[1px] translate-y-[1px]"
        style={{ filter: "brightness(0)" }}
      >
        <div
          className="text-black pixel-font"
          style={{ fontSize: `${size * 4 + 2}px` }}
        >
          ★
        </div>
      </div>
      <div
        className="absolute transform translate-x-[1px] translate-y-[1px]"
        style={{ filter: "brightness(0)" }}
      >
        <div
          className="text-black pixel-font"
          style={{ fontSize: `${size * 4 + 2}px` }}
        >
          ★
        </div>
      </div>

      {/* Shadow layer */}
      <div
        className="absolute transform translate-x-[1px] translate-y-[1px]"
        style={{ filter: "brightness(0.5)" }}
      >
        <div
          className="text-[#644A03] pixel-font"
          style={{ fontSize: `${size * 4}px` }}
        >
          ★
        </div>
      </div>

      {/* Main star */}
      <div className="relative z-10">
        <div
          className="text-[#FFE600] pixel-font"
          style={{
            fontSize: `${size * 4}px`,
            filter: "drop-shadow(0 0 3px rgba(255, 230, 0, 0.5))",
          }}
        >
          ★
        </div>
      </div>
    </div>
  );
};

export default Star;
