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
  const [phase, setPhase] = useState<"loading" | "glitch" | "exit">("loading");

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayCount(latest);
    });

    const controls = animate(count, 100, {
      duration: 2.4,
      ease: [0.25, 0.1, 0.25, 1],
      onComplete: () => {
        setPhase("glitch");
        setTimeout(() => {
          setPhase("exit");
          setTimeout(onComplete, 800);
        }, 800);
      },
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Main content container */}
      <div className="relative flex flex-col items-center">
        {/* Small counter above logo */}
        <motion.div
          className="mb-6 font-mono text-white/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase">
            {displayCount}%
          </span>
        </motion.div>

        {/* Logo container */}
        <div className="relative">
          {/* Glitch layers - only visible during glitch phase */}
          {phase === "glitch" && (
            <>
              <motion.img
                src={logo}
                alt=""
                className="absolute h-12 md:h-20 w-auto"
                style={{ filter: "hue-rotate(90deg)" }}
                animate={{
                  x: [0, -6, 4, -2, 5, 0],
                  opacity: [0, 0.7, 0.3, 0.6, 0.2, 0],
                }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
              <motion.img
                src={logo}
                alt=""
                className="absolute h-12 md:h-20 w-auto"
                style={{ filter: "hue-rotate(-90deg)" }}
                animate={{
                  x: [0, 5, -4, 3, -5, 0],
                  opacity: [0, 0.5, 0.4, 0.7, 0.3, 0],
                }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
            </>
          )}

          {/* Main logo - always visible */}
          <motion.img
            src={logo}
            alt="Delong Media House"
            className="relative h-12 md:h-20 w-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: phase === "glitch" ? [0, -3, 2, -1, 3, 0] : 0,
            }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 },
              x: { duration: 0.4, ease: "linear" },
            }}
          />

          {/* Subtle glow behind logo */}
          <motion.div
            className="absolute inset-0 -z-10 blur-2xl bg-white/10 scale-150"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "glitch" ? 0.4 : 0.15 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Minimal progress line */}
        <motion.div
          className="mt-8 w-24 h-[1px] bg-white/10 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "loading" ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-full bg-white/40"
            style={{ width: `${displayCount}%` }}
          />
        </motion.div>
      </div>

      {/* Exit transition overlay */}
      {phase === "exit" && (
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ mixBlendMode: "difference" }}
        />
      )}
    </motion.div>
  );
};

export default LoadingScreen;
