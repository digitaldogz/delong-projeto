import { MarqueeAnimation } from "@/components/ui/marquee-effect";

const MarqueeSection = () => {
  return (
    <section className="w-full bg-background py-12 border-t border-b border-border/10">
      <MarqueeAnimation baseVelocity={2} className="text-4xl md:text-6xl font-bold text-foreground/20">
        DELONG CREATIVE • BRANDING • DESIGN • ESTRATÉGIA •
      </MarqueeAnimation>
      <MarqueeAnimation baseVelocity={2} direction="right" className="text-4xl md:text-6xl font-bold text-foreground/10 mt-4">
        EVENTOS • IDENTIDADE VISUAL • COMUNICAÇÃO •
      </MarqueeAnimation>
    </section>
  );
};

export default MarqueeSection;
