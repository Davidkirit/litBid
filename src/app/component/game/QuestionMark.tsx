interface QuestionMarkProps {
  onClick: () => void;
}

const QuestionMark = ({ onClick }: QuestionMarkProps) => {
  return (
    <button onClick={onClick} className="relative group">
      <div className="relative w-12 h-12 bg-[#FF3B9A] rounded-full flex items-center justify-center">
        <span className="absolute text-[#251434] text-2xl pixel-font transform translate-x-[2px] translate-y-[2px]">
          ?
        </span>
        <span className="relative text-2xl pixel-font z-10 text-white">?</span>
        <div className="absolute inset-0 rounded-full blur-sm bg-[#FF3B9A]/20 scale-110" />
      </div>
    </button>
  );
};

export default QuestionMark;
