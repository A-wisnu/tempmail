import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RainDrop {
  id: number;
  left: string;
  delay: number;
  duration: number;
  opacity: number;
  scale: number;
}

export default function RainEffect() {
  const [raindrops, setRaindrops] = useState<RainDrop[]>([]);

  useEffect(() => {
    const drops = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 1,
      opacity: 0.3 + Math.random() * 0.4,
      scale: 0.5 + Math.random() * 0.5
    }));
    setRaindrops(drops);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute w-0.5 h-10 bg-blue-200/30 rounded-full"
          initial={{ 
            top: -40, 
            left: drop.left,
            opacity: drop.opacity,
            scale: drop.scale
          }}
          animate={{
            top: '100%',
            opacity: 0
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
} 