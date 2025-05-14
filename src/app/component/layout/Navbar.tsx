// "use client";

// import { useWallet } from "@solana/wallet-adapter-react";
// import dynamic from "next/dynamic";
// import { Press_Start_2P } from "next/font/google";

// const pressStart2P = Press_Start_2P({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-press-start2p",
// });

// const WalletMultiButton = dynamic(
//   () =>
//     import("@solana/wallet-adapter-react-ui").then(
//       (mod) => mod.WalletMultiButton
//     ),
//   { ssr: false }
// );

// export default function Navbar() {
//   const { connected } = useWallet();

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-[#282A64] backdrop-blur-sm border-b border-[#FFD700]/20 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo/Brand */}
//           <div className="flex items-center gap-4">
//             {/*SVG logo */}
//             <div className="h-[3rem] w-auto">
//               <img src="logo.svg" alt="litbid" className="h-full w-auto" />
//             </div>
//             <span
//               className={`${pressStart2P.className} text-4xl`}
//               style={{
//                 color: "white",
//                 textShadow: `
//                   2px 0 0 #282A64,
//                   -2px 0 0 #282A64,
//                   0 2px 0 #282A64,
//                   0 -2px 0 #282A64,
//                   1px 1px #282A64,
//                   -1px -1px 0 #282A64,
//                   1px -1px 0 #282A64,
//                   -1px 1px 0 #282A64,
//                   3px 3px 0 #1a1c42,
//                   4px 4px 0 #1a1c42,
//                   5px 5px 0 #1a1c42,
//                   6px 6px 0 #1a1c42,
//                   0 0 10px rgba(255, 255, 255, 0.6)
//                 `,
//               }}
//             >
//               LITBID
//             </span>
//           </div>

//           {/* Wallet Connect */}
//           <div className="flex-shrink-0 ml-auto">
//             <WalletMultiButton className="!bg-[#FF3B9A] !rounded-lg !px-6 !py-2 !text-white hover:!bg-[#FF3B9A]/80 !transition-all !duration-200 !h-auto !text-sm pixel-font" />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { Press_Start_2P } from "next/font/google";
import useSolanaContracts from "../../hooks/useSolanaContracts";
import * as anchor from "@project-serum/anchor"; // For Keypair
import { Keypair } from "@solana/web3.js";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start2p",
});

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export default function Navbar() {
  const { connected, publicKey } = useWallet();
  const { createUser } = useSolanaContracts();

  // For now, use a dummy generated Keypair (not secure — for testing/dev only)
  const userKeypair = Keypair.generate();

  useEffect(() => {
    const tryCreateUser = async () => {
      if (!publicKey) return;
      try {
        await createUser(publicKey, userKeypair);
      } catch (err) {
        console.error("Error creating user from Navbar:", err);
      }
    };

    if (connected && publicKey) {
      tryCreateUser();
    }
  }, [connected, publicKey, createUser]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#282A64] backdrop-blur-sm border-b border-[#FFD700]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex items-center gap-4">
            <div className="h-[3rem] w-auto">
              <img src="logo.svg" alt="litbid" className="h-full w-auto" />
            </div>
            <span
              className={`${pressStart2P.className} text-4xl`}
              style={{
                color: "white",
                textShadow: `
                  2px 0 0 #282A64,
                  -2px 0 0 #282A64,
                  0 2px 0 #282A64,
                  0 -2px 0 #282A64,
                  1px 1px #282A64,
                  -1px -1px 0 #282A64,
                  1px -1px 0 #282A64,
                  -1px 1px 0 #282A64,
                  3px 3px 0 #1a1c42,
                  4px 4px 0 #1a1c42,
                  5px 5px 0 #1a1c42,
                  6px 6px 0 #1a1c42,
                  0 0 10px rgba(255, 255, 255, 0.6)
                `,
              }}
            >
              LITBID
            </span>
          </div>

          {/* Wallet Connect */}
          <div className="flex-shrink-0 ml-auto">
            <WalletMultiButton className="!bg-[#FF3B9A] !rounded-lg !px-6 !py-2 !text-white hover:!bg-[#FF3B9A]/80 !transition-all !duration-200 !h-auto !text-sm pixel-font" />
          </div>
        </div>
      </div>
    </nav>
  );
}
