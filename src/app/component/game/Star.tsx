interface StarProps {
  size?: number;
  className?: string;
}

const Star = ({ size = 8, className = "" }: StarProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Shadow layer */}
      <div
        className="absolute transform translate-x-[2px] translate-y-[2px]"
        style={{ filter: "brightness(0.3)" }}
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
            filter: "drop-shadow(0 0 4px rgba(255, 230, 0, 0.3))",
          }}
        >
          ★
        </div>
      </div>
    </div>
  );
};

export default Star;
