import { useEffect, useState } from "react";
import useSolanaContracts from "../../hooks/useSolanaContracts";
import { useWallet } from "@solana/wallet-adapter-react";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Rewards() {
  const { publicKey } = useWallet();
  const {
    fetchUserAccount,
    claimRewards,
    callingSmartContract,
    errorInCallingSmartContract,
  } = useSolanaContracts();

  const [userAccount, setUserAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user account on wallet connection
  const loadUserAccount = async () => {
    if (!publicKey) return;
    setLoading(true);
    const accountData = await fetchUserAccount(publicKey);
    setUserAccount(accountData);
    setLoading(false);
  };

  useEffect(() => {
    loadUserAccount();
  }, [publicKey, fetchUserAccount]);

  const handleClaimRewards = async () => {
    if (!publicKey) return;
    setLoading(true);
    try {
      await claimRewards(publicKey);

      await loadUserAccount();
    } catch (err) {
      console.error("Error claiming rewards:", err);
      toast.error("Failed to claim rewards. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="my-8 mx-auto w-full max-w-md bg-[#0B0A1E]/60 backdrop-blur-lg shadow-[0_0_10px_rgba(255,215,0,0.2)] rounded-lg p-20 flex flex-col items-center text-center space-y-12">
      <div
        className={`${pressStart2P.className} text-xs sm:text-sm md:text-base tracking-[0.3em] text-white/90`}
      >
        YOUR REWARDS
      </div>

      <div className="relative w-full flex justify-center">
        {loading ? (
          <span className="text-lg text-yellow-400 font-bold">Loading...</span>
        ) : (
          <span
            className={`${pressStart2P.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl relative z-20 whitespace-nowrap`}
            style={{
              color: "#282A64",
              textShadow: `
                2px 0 0 #ffff00,
                -2px 0 0 #ffff00,
                0 2px 0 #ffff00,
                0 -2px 0 #ffff00,
                1px 1px #ffff00,
                -1px -1px 0 #ffff00,
                1px -1px 0 #ffff00,
                -1px 1px 0 #ffff00,
                3px 3px 0 #ffd700,
                4px 4px 0 #ffd700,
                5px 5px 0 #ffd700,
                6px 6px 0 #ffd700
              `,
            }}
          >
            <span>
              {userAccount && userAccount.rewards
                ? userAccount.rewards.toNumber().toFixed(2)
                : "0"}
            </span>
          </span>
        )}
      </div>

      {/* Claim Rewards Button */}
      <button
        onClick={handleClaimRewards}
        disabled={callingSmartContract || loading}
        className="mt-6 px-6 py-2 rounded bg-yellow-500 text-black font-bold"
      >
        {loading || callingSmartContract ? "Processing..." : "Claim Rewards"}
      </button>

      {errorInCallingSmartContract && (
        <p className="mt-4 text-red-500">{errorInCallingSmartContract}</p>
      )}
    </div>
  );
}
