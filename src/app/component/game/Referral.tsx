"use client";

export default function Referral() {
  return (
    <div>
      <div className="text-sm tracking-wider text-white pixel-font mb-3">
        REFER A FRIEND
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full bg-indigo-950/30 border-2 border-purple-500/50 rounded px-12 py-3 text-white text-sm text-center"
            value="sharelinkshere.com"
            readOnly
          />
        </div>
        <button className="px-6 py-3 bg-indigo-950/30 border-2 border-purple-500/50 rounded text-white text-sm hover:bg-indigo-900/50 transition-colors">
          COPY
        </button>
        <button className="px-6 py-3 bg-indigo-950/30 border-2 border-purple-500/50 rounded text-white text-sm hover:bg-indigo-900/50 transition-colors">
          TEXT
        </button>
      </div>
    </div>
  );
}
