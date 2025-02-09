import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  expiryTime: Date;
  onExpire: () => void;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ expiryTime, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(100);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = expiryTime.getTime() - new Date().getTime();
      const totalSeconds = difference / 1000;
      const totalInitialSeconds = 24 * 60 * 60;
      const progressPercentage = (totalSeconds / totalInitialSeconds) * 100;
      
      if (difference <= 0) {
        onExpire();
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      setIsWarning(totalSeconds <= 3600);
      setProgress(progressPercentage);

      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTime, onExpire]);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const getGradientClass = () => {
    if (isWarning) {
      return 'from-rose-400 to-red-400';
    }
    if (progress <= 50) {
      return 'from-amber-300 to-orange-400';
    }
    return 'from-sky-400 to-blue-500';
  };

  const getBorderClass = () => {
    if (isWarning) {
      return 'border-rose-300';
    }
    if (progress <= 50) {
      return 'border-amber-200';
    }
    return 'border-sky-200';
  };

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      className="flex flex-col items-center mx-1.5"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getGradientClass()} 
          flex items-center justify-center shadow-lg border-2 ${getBorderClass()} backdrop-blur-sm
          relative overflow-hidden`}
        animate={{
          scale: isWarning ? [1, 1.05, 1] : 1,
          boxShadow: isWarning 
            ? ['0 4px 6px -1px rgba(0, 0, 0, 0.1)', '0 8px 10px -1px rgba(0, 0, 0, 0.2)', '0 4px 6px -1px rgba(0, 0, 0, 0.1)']
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
        transition={{
          duration: 0.5,
          repeat: isWarning ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        {/* Water Wave Effect */}
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={{
            y: ['100%', '-100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            clipPath: "url(#wave)"
          }}
        />
        <svg width="0" height="0">
          <defs>
            <clipPath id="wave">
              <path d="M0,0 L100,0 L100,100 L0,100 L0,0 Z M0,50 Q25,45 50,50 T100,50 T150,50 V100 H0 V50 Z" />
            </clipPath>
          </defs>
        </svg>
        <span className="text-xl font-bold text-white tabular-nums relative z-10">
          {formatNumber(value)}
        </span>
      </motion.div>
      <span className="text-[10px] font-medium text-sky-600 mt-2 uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );

  const Separator = () => (
    <motion.div 
      className="text-xl font-bold text-sky-500 mx-0.5 -mt-6"
      animate={{ 
        opacity: isWarning ? [1, 0.5, 1] : 0.7,
        y: ['0%', '5%', '0%']
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      :
    </motion.div>
  );

  return (
    <div className="py-2">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center">
          <TimeBlock value={timeLeft.hours} label="Jam" />
          <Separator />
          <TimeBlock value={timeLeft.minutes} label="Menit" />
          <Separator />
          <TimeBlock value={timeLeft.seconds} label="Detik" />
        </div>

        <motion.div 
          className={`mt-3 text-sm font-medium px-3 py-1 rounded-full
            ${isWarning 
              ? 'bg-rose-50 text-rose-500 border border-rose-200' 
              : 'bg-sky-50 text-sky-500 border border-sky-200'}`}
          animate={{ 
            scale: isWarning ? [1, 1.05, 1] : 1,
            opacity: isWarning ? [1, 0.8, 1] : 1
          }}
          transition={{ 
            duration: 0.5, 
            repeat: isWarning ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          {isWarning ? '⚠️ hampir habis!' : '💧 tersisa'}
        </motion.div>
      </div>
    </div>
  );
} 