"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetTime: Date;
}

export default function Countdown({ targetTime }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  const formatTime = (num: number) => String(num).padStart(2, "0");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className=" rounded-lg p-6  text-center pixel-font space-y-3">
      {/* Title */}
      <div className="text-sm tracking-wider text-white">TIME REMAINING</div>

      {/* Flexible Timer Boxes */}
      <div className="flex justify-center space-x-2 text-[#FFE600] text-5xl font-bold">
        {/* Hours */}
        <div className="flex-1  border-2  rounded-md px-4 py-2 text-center">
          {formatTime(timeLeft.hours)}
        </div>

        {/* Separator */}
        <div className="text-white flex items-center">:</div>

        {/* Minutes */}
        <div className="flex-1  border-2  rounded-md px-4 py-2 text-center">
          {formatTime(timeLeft.minutes)}
        </div>

        {/* Separator */}
        <div className="text-white flex items-center">:</div>

        {/* Seconds */}
        <div className="flex-1 border-2 rounded-md px-4 py-2 text-center">
          {formatTime(timeLeft.seconds)}
        </div>
      </div>

      {/* Subtitle */}
      <div className="text-gray-400 text-xs italic">
        Until the game ends last yeeter wins!
      </div>
    </div>
  );
}
