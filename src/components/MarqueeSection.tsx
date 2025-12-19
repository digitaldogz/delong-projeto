import { MarqueeAnimation } from "@/components/ui/marquee-effect";

const MarqueeSection = () => {
  return (
    <section className="w-full bg-black py-12 border-t border-b border-white/10">
      <MarqueeAnimation baseVelocity={3} className="text-4xl md:text-6xl font-bold text-white/20">
        DELONG CREATIVE • BRANDING • DESIGN • ESTRATÉGIA •
      </MarqueeAnimation>
      <MarqueeAnimation baseVelocity={3} direction="right" className="text-4xl md:text-6xl font-bold text-white/10 mt-4">
        EVENTOS • IDENTIDADE VISUAL • COMUNICAÇÃO •
      </MarqueeAnimation>
    </section>
  );
};

export default MarqueeSection;
