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
  const [phase, setPhase] = useState<"counting" | "glitch" | "reveal">("counting");

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayCount(latest);
    });

    const controls = animate(count, 100, {
      duration: 2.2,
      ease: [0.25, 0.1, 0.25, 1],
      onComplete: () => {
        setPhase("glitch");
        setTimeout(() => {
          setPhase("reveal");
          setTimeout(onComplete, 1000);
        }, 1200);
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
      animate={{
        opacity: phase === "reveal" ? 0 : 1,
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Counting phase - small centered counter */}
      {phase === "counting" && (
        <motion.div
          className="flex flex-col items-center"
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <motion.div
            className="relative font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span 
              className="text-6xl md:text-8xl font-extralight text-white tracking-tighter"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {String(displayCount).padStart(3, '0')}
            </span>
            <span className="absolute -right-6 top-2 text-lg text-white/40 font-light">%</span>
          </motion.div>
          
          {/* Minimal line */}
          <div className="mt-4 w-16 h-[1px] bg-white/20 overflow-hidden">
            <motion.div
              className="h-full bg-white/60"
              style={{ width: `${displayCount}%` }}
            />
          </div>
        </motion.div>
      )}

      {/* Glitch phase - logo with glitch effect */}
      {phase === "glitch" && (
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          {/* Glitch layers */}
          <motion.img
            src={logo}
            alt=""
            className="absolute h-20 md:h-32 w-auto opacity-70"
            style={{ filter: "blur(0px)" }}
            animate={{
              x: [0, -8, 5, -3, 8, -5, 3, 0],
              opacity: [0.7, 0.3, 0.8, 0.4, 0.7, 0.5, 0.8, 1],
            }}
            transition={{ duration: 0.4, ease: "linear" }}
          />
          <motion.img
            src={logo}
            alt=""
            className="absolute h-20 md:h-32 w-auto mix-blend-screen"
            style={{ filter: "hue-rotate(90deg)" }}
            animate={{
              x: [0, 10, -8, 6, -10, 4, -2, 0],
              opacity: [0, 0.8, 0.2, 0.6, 0.3, 0.7, 0.4, 0],
            }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
          <motion.img
            src={logo}
            alt=""
            className="absolute h-20 md:h-32 w-auto mix-blend-screen"
            style={{ filter: "hue-rotate(-90deg)" }}
            animate={{
              x: [0, -6, 12, -10, 8, -4, 6, 0],
              opacity: [0, 0.6, 0.4, 0.8, 0.2, 0.5, 0.3, 0],
            }}
            transition={{ duration: 0.5, ease: "linear", delay: 0.05 }}
          />
          
          {/* Main logo */}
          <motion.img
            src={logo}
            alt="Delong Media House"
            className="relative h-20 md:h-32 w-auto"
            animate={{
              opacity: [0, 1, 0.6, 1, 0.8, 1],
              scale: [0.95, 1.02, 0.98, 1.01, 1],
              filter: [
                "brightness(1) contrast(1)",
                "brightness(1.5) contrast(1.2)",
                "brightness(0.8) contrast(1.4)",
                "brightness(1.2) contrast(1.1)",
                "brightness(1) contrast(1)",
              ],
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Scan lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.5, 1, 0] }}
            transition={{ duration: 0.8 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-[2px] bg-white/10"
                style={{ top: `${i * 5}%` }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scaleX: [0, 1, 0],
                }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.02,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>

          {/* Flash effect */}
          <motion.div
            className="absolute inset-0 bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0, 0.4, 0] }}
            transition={{ duration: 0.6, times: [0, 0.1, 0.3, 0.5, 0.7] }}
          />
        </motion.div>
      )}

      {/* Reveal phase - sophisticated transition */}
      {phase === "reveal" && (
        <>
          {/* Logo stays centered and scales up */}
          <motion.img
            src={logo}
            alt="Delong Media House"
            className="absolute h-20 md:h-32 w-auto z-10"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ 
              opacity: 0,
              scale: 1.5,
              filter: "blur(20px)",
            }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Diagonal wipe reveal */}
          <motion.div
            className="absolute inset-0 bg-black origin-top-left"
            initial={{ 
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
            }}
            animate={{ 
              clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" 
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1
            }}
          />

          {/* Secondary wipe */}
          <motion.div
            className="absolute inset-0 bg-white/5"
            initial={{ 
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
            }}
            animate={{ 
              clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" 
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2
            }}
          />
        </>
      )}

      {/* Ambient particles */}
      {phase !== "reveal" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default LoadingScreen;
