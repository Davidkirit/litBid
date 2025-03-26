"use client";

import { useState } from "react";

interface BidData {
  address: string;
  note?: string;
  sol: string;
  timeAgo: string;
}

export default function LeaderboardTable() {
  const [activeTab, setActiveTab] = useState<
    "latest" | "winners" | "yours" | "stats"
  >("latest");

  // Placeholder data that will be replaced with real data from the backend
  const tableData: BidData[] = [];

  return (
    <div className="w-full border-2 border-purple-500/50 rounded-lg bg-indigo-950/30 p-4">
      {/* Top Bar: Title + Sub-Nav */}
      <div className="flex items-center justify-between text-white pixel-font mb-4">
        {/* Title */}
        <h1 className="text-sm">LITBIDS...</h1>

        {/* Sub-Nav */}
        <div className="flex gap-4 text-xs text-gray-500 tracking-widest">
          <span
            onClick={() => setActiveTab("latest")}
            className={`cursor-pointer hover:text-gray-300 ${
              activeTab === "latest" ? "text-white" : ""
            }`}
          >
            LATEST
          </span>
          <span
            onClick={() => setActiveTab("winners")}
            className={`cursor-pointer hover:text-gray-300 ${
              activeTab === "winners" ? "text-white" : ""
            }`}
          >
            WINNERS
          </span>
          <span
            onClick={() => setActiveTab("yours")}
            className={`cursor-pointer hover:text-gray-300 ${
              activeTab === "yours" ? "text-white" : ""
            }`}
          >
            YOURS
          </span>
          <span
            onClick={() => setActiveTab("stats")}
            className={`cursor-pointer hover:text-gray-300 ${
              activeTab === "stats" ? "text-white" : ""
            }`}
          >
            STATS
          </span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full pixel-font text-gray-300 text-xs">
          <tbody>
            {tableData.length === 0 ? (
              // Skeleton loading state
              <>
                {[...Array(3)].map((_, i) => (
                  <tr
                    key={i}
                    className="border-b border-purple-500/30 hover:bg-indigo-900/30"
                  >
                    {/* Address & Note Skeleton */}
                    <td className="py-2 px-2 whitespace-nowrap">
                      <div className="animate-pulse bg-purple-600/20 h-4 w-32 rounded" />
                    </td>

                    {/* Amount & Time Skeleton */}
                    <td className="py-2 px-2 text-right whitespace-nowrap">
                      <div className="animate-pulse bg-purple-600/20 h-4 w-24 ml-auto rounded" />
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              // Actual data rows
              tableData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-purple-500/30 hover:bg-indigo-900/30"
                >
                  {/* Address & Note */}
                  <td className="py-2 px-2 whitespace-nowrap">
                    <span className="text-white">{row.address}</span>
                    {row.note && (
                      <span className="ml-2 text-green-400 text-xs">
                        {row.note}
                      </span>
                    )}
                  </td>

                  {/* Amount & Time */}
                  <td className="py-2 px-2 text-right whitespace-nowrap">
                    <span className="text-[#FFE600] font-bold">
                      {row.sol} $SOL
                    </span>{" "}
                    <span className="text-gray-400 ml-2 text-xs">
                      {row.timeAgo}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Info Note */}
      <p className="text-xs text-gray-500 italic mt-2">
        The game ends soon! Last litbidder wins the pot.
      </p>
    </div>
  );
}
