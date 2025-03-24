"use client";

import Link from "next/link";
import { FaTwitter, FaGithub, FaTelegram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-pixel">LitBid</h1>
          <div className="flex space-x-6">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FaTwitter size={24} />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              <FaGithub size={24} />
            </Link>
            <Link
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaTelegram size={24} />
            </Link>
          </div>
          <p className="text-sm font-pixel">
            © 2025 LitBid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
