"use client";

import { cn } from "@/lib/utils";

type MarqueeAnimationProps = {
  children: string;
  className?: string;
  direction?: "left" | "right";
  baseVelocity?: number;
};

function MarqueeAnimation({
  children,
  className,
  direction = "left",
  baseVelocity = 3,
}: MarqueeAnimationProps) {
  // Velocidade em segundos (quanto maior o baseVelocity, mais rápido)
  const duration = Math.max(20, 60 / baseVelocity);
  
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={cn(
          "inline-flex whitespace-nowrap gap-16",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
          className
        )}
        style={{ 
          animationDuration: `${duration}s`,
        }}
      >
        <span className="shrink-0">{children}</span>
        <span className="shrink-0">{children}</span>
        <span className="shrink-0">{children}</span>
        <span className="shrink-0">{children}</span>
        <span className="shrink-0">{children}</span>
        <span className="shrink-0">{children}</span>
      </div>
    </div>
  );
}

export { MarqueeAnimation };
