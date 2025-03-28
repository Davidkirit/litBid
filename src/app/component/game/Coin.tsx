// "use client";

// // import Lottie from "lottie-react";
// import coinAnimation from "../coin/Animation - 1743072756056.json";
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";

// interface CoinProps {
//   index: number;
// }
// const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// export default function Coin({ index }: CoinProps) {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [animationDelay, setAnimationDelay] = useState(0);
//   const [animationPattern, setAnimationPattern] = useState(1);
//   const [duration, setDuration] = useState(5);

//   useEffect(() => {
//     // Generate random initial position within the container
//     const randomX = Math.random() * 60 + 20; // Keep within 20-80% of container width
//     const randomY = Math.random() * 60 + 20; // Keep within 20-80% of container height
//     const delay = Math.random() * 3; // Random delay between 0-3 seconds
//     const pattern = Math.floor(Math.random() * 3) + 1; // Random pattern 1-3
//     const randomDuration = Math.random() * 3 + 4; // Random duration between 4-7 seconds

//     setPosition({ x: randomX, y: randomY });
//     setAnimationDelay(delay);
//     setAnimationPattern(pattern);
//     setDuration(randomDuration);

//     // Change pattern periodically
//     const intervalId = setInterval(() => {
//       setAnimationPattern((prev) => (prev === 3 ? 1 : prev + 1));
//       setDuration(Math.random() * 3 + 4);
//     }, randomDuration * 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <div
//       className="absolute"
//       style={{
//         left: `${position.x}%`,
//         top: `${position.y}%`,
//         animation: `float-${animationPattern} ${duration}s ease-in-out infinite`,
//         animationDelay: `${animationDelay}s`,
//       }}
//     >
//       <div className="w-8 h-8 md:w-12 md:h-12">
//         <Lottie
//           animationData={coinAnimation}
//           loop={true}
//           style={{ width: "100%", height: "100%" }}
//         />
//       </div>
//     </div>
//   );
// }
