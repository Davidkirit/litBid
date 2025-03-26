interface HowItWorksPopupProps {
  onClose: () => void;
}

const HowItWorksPopup = ({ onClose }: HowItWorksPopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#1a1b35] border-2 border-purple-500/50 rounded-lg p-8 max-w-xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          <span className="pixel-font">×</span>
        </button>

        {/* Popup content */}
        <div className="space-y-6">
          <h3 className="text-white pixel-font text-2xl mb-6">HOW IT WORKS</h3>

          <div className="space-y-4 text-gray-300 pixel-font text-sm">
            <p className="leading-relaxed">
              Win will be the last person to press the button! Winner takes all.
            </p>

            <div className="space-y-3">
              <p className="text-gray-400 text-base">RULES:</p>
              <p>The timer starts at one hour.</p>
              <p>Each press resets the timer and subtracts 1 second.</p>
              <p>The maximum timer is set at 1 minute.</p>
              <p>
                Last person to press the button before it hits zero wins all the
                SOL.
              </p>
            </div>

            <div className="space-y-3 mt-6">
              <p className="text-gray-400 text-base">EARN SOL:</p>
              <p>Share your referral link.</p>
              <p>Earn 5% of SOL from each press made through your link.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPopup;
