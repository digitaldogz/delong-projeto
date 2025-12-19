import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-delong-white.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayCount, setDisplayCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayCount(latest);
    });

    const controls = animate(count, 100, {
      duration: 2.5,
      ease: "easeInOut",
      onComplete: () => {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 800);
        }, 300);
      },
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Animated lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[1px] bg-white/30"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-full h-[1px] bg-white/30"
        initial={{ scaleX: 0, originX: 1 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with glow effect */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 blur-2xl bg-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.5, 0.3], scale: [0.8, 1.1, 1] }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.img
            src={logo}
            alt="Delong Media House"
            className="relative h-16 md:h-24 w-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />
        </motion.div>

        {/* Counter */}
        <motion.div
          className="mt-12 flex items-baseline gap-1 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span 
            className="text-5xl md:text-7xl font-light text-white tracking-tighter"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {displayCount}
          </motion.span>
          <span className="text-xl md:text-2xl text-white/60">%</span>
        </motion.div>

        {/* Progress bar */}
        <div className="mt-6 w-48 md:w-64 h-[1px] bg-white/20 overflow-hidden">
          <motion.div
            className="h-full bg-white"
            style={{ width: `${displayCount}%` }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          className="mt-6 text-xs md:text-sm text-white/40 uppercase tracking-[0.3em] font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Carregando
        </motion.p>
      </div>

      {/* Exit transition - curtains */}
      <motion.div
        className="absolute inset-0 flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 1 : 0 }}
      >
        <motion.div
          className="w-1/2 h-full bg-black origin-left"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: isExiting ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.div
          className="w-1/2 h-full bg-black origin-right"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: isExiting ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
