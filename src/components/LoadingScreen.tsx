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

      /* ── 2. Logo fade‑in + scale ─────────────────────── */
      tl.fromTo(
        ".intro-logo",
        { autoAlpha: 0, scale: 0.85 },
        { autoAlpha: 1, scale: 1, duration: 1.2, ease: "expo.out" },
        0.2
      );

      /* ── 3. Horizontal line wipe ─────────────────────── */
      tl.fromTo(
        ".intro-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.6, ease: "power3.inOut" },
        0.3
      );

      /* ── 4. Tagline reveal ───────────────────────────── */
      tl.fromTo(
        ".intro-tagline",
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.9
      );

      /* ── 5. Counter text reveal ──────────────────────── */
      tl.fromTo(
        ".intro-counter",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.15
      );

      /* ── 6. Hold briefly before exit ─────────────────── */
      tl.to({}, { duration: 0.4 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      {/* ── Central Logo ──────────────────────────────── */}
      <div className="intro-logo flex flex-col items-center gap-6 opacity-0">
        <img
          src={logo}
          alt="Delong Media House"
          className="h-10 md:h-16 w-auto brightness-0 invert"
        />
      </div>

      {/* ── Horizontal Line ───────────────────────────── */}
      <div
        className="intro-line w-[200px] md:w-[300px] h-px bg-white/30 mt-6 origin-center"
        style={{ transform: "scaleX(0)" }}
      />

      {/* ── Tagline ───────────────────────────────────── */}
      <p className="intro-tagline text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/40 mt-5 opacity-0">
        Premium Audiovisual
      </p>

      {/* ── Counter ───────────────────────────────────── */}
      <div className="intro-counter absolute bottom-6 right-6 md:bottom-12 md:right-12 opacity-0">
        <span
          ref={counterRef}
          className="text-5xl md:text-8xl font-bold tracking-tighter text-white/10"
        >
          {counter}
          <span className="text-xl md:text-4xl font-light ml-1">%</span>
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
