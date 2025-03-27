import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { GameProvider } from "./context/GameContext";
import WalletContextProvider from "./component/wallet/WalletProvider";
import dynamic from "next/dynamic";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start2p",
});

export const metadata: Metadata = {
  title: "LitBid Game",
  description: "The last bidder wins!",
};

const NavbarNoSSR = dynamic(() => import("./component/layout/Navbar"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pressStart2P.variable}>
        <WalletContextProvider>
          <GameProvider>
            <div className="min-h-screen ">
              <NavbarNoSSR />
              <main className="pt-16">{children}</main>
            </div>
          </GameProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
