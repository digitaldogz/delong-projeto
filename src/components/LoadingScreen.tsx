/**
 * LoadingScreen — Premium Opening Animation
 * GSAP‑powered intro with logo reveal, animated counter, horizontal line wipe,
 * and a smooth curtain‑up exit.
 */

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import logo from "@/assets/logo-delong-white.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Curtain‑up exit
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
            onComplete,
          });
        },
      });

      /* ── 1. Counter 0→100 ────────────────────────────── */
      tl.to(
        { val: 0 },
        {
          val: 100,
          duration: 2.4,
          ease: "power3.inOut",
          onUpdate: function () {
            setCounter(Math.round(this.targets()[0].val));
          },
        },
        0
      );

      /* ── 2. Logo and counter fade‑in ─────────────────────── */
      tl.fromTo(
        ".intro-content",
        { autoAlpha: 0, scale: 0.95, y: 15 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1.2, ease: "expo.out" },
        0.2
      );

      /* ── 3. Hold briefly before exit ─────────────────── */
      tl.to({}, { duration: 0.4 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6"
    >
      <div className="intro-content flex flex-col items-center gap-8 opacity-0">
        {/* ── Logo ──────────────────────────────── */}
        <img
          src={logo}
          alt="Delong Media House"
          className="h-14 md:h-20 w-auto"
        />

        {/* ── Counter ───────────────────────────────────── */}
        <span
          ref={counterRef}
          className="text-4xl md:text-5xl font-light tracking-tighter text-foreground"
        >
          {counter}
          <span className="text-2xl md:text-3xl ml-1">%</span>
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
