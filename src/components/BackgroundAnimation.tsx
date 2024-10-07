import { ReactNode, useEffect, useState } from "react";

interface BackgroundAnimationProps {
  children: ReactNode;
}

function getRandomPosition(maxWidth: number, maxHeight: number) {
  const x = Math.random() * maxWidth;
  const y = Math.random() * maxHeight;
  return { x, y };
}

function Particle({ size }: { size: number }) {
  const [position, setPosition] = useState(
    getRandomPosition(window.innerWidth - size, window.innerHeight - size)
  );

  useEffect(() => {
    const moveParticle = () => {
      setPosition(
        getRandomPosition(window.innerWidth - size, window.innerHeight - size)
      );
    };

    // Change position every 3 seconds (you can adjust the time interval)
    const interval = setInterval(moveParticle, 3000);

    return () => clearInterval(interval);
  }, [size]);

  return (
    <div
      className="w-[50px] h-[50px] bg-slate-600 opacity-40 blur-md rounded absolute"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 3s ease-in-out", // Smooth transition for 3 seconds
      }}
    />
  );
}

function newParticles(count: number) {
  const particleSize = 50;
  const particles = [];

  for (let i = 0; i < count; i++) {
    particles.push(<Particle key={i} size={particleSize} />);
  }

  return particles;
}

export default function BackgroundAnimation({
  children,
}: BackgroundAnimationProps) {
  return (
    <div className=" overflow-hidden relative bg-slate-800 w-full h-screen flex items-center justify-center">
      <div className="absolute w-full h-full">{newParticles(15)}</div>
      <div className="relative text-white z-10">{children}</div>
    </div>
  );
}
