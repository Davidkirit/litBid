"use client";

export default function NavBar() {
  return (
    <nav className="bg-black/80 backdrop-blur-sm p-4 flex items-center justify-between">
      <h1 className="text-white text-xl font-bold tracking-wide font-['Press_Start_2P']">
        LITBID
      </h1>

      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition">
        Connect Wallet
      </button>
    </nav>
  );
}
