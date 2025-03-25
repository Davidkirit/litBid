"use client";

export default function Referral() {
  return (
    <div>
      <div className="text-sm tracking-wider text-white pixel-font mb-3">
        REFER A FRIEND
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="flex-1 bg-indigo-950/30 border-2 border-purple-500/50 rounded px-4 py-3 text-white text-sm text-center"
          value="sharelinkshere.com"
          readOnly
        />
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
