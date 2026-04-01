/**
 * ClientCloud Component
 * Animated marquee grid of client logos with GSAP and CSS.
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 45 image files passed from /public/logos/ (updated user sizes)
const allLogos = [
  "ACIAI.png",
  "CANAL BIKE.png",
  "CBC.png",
  "COMTB.png",
  "EUROBIKE.png",
  "HB.png",
  "Logo - Moov Eventos-1.png",
  "OLYMPICUS.png",
  "adv mag.png",
  "almeida supermercado.png",
  "anila.png",
  "ascespar.png",
  "athor.png",
  "audax.png",
  "avellar.png",
  "biking man.png",
  "bluecicle.png",
  "desafio dos rochas.png",
  "fobras.png",
  "fourlab.png",
  "franco.png",
  "free force.png",
  "gas gas.png",
  "go outside.png",
  "huston_.png",
  "influx.png",
  "irati_.png",
  "isapa.png",
  "ivasko.png",
  "jeep.png",
  "mapa treine.png",
  "moageira.png",
  "oggi.png",
  "origine.png",
  "otl.png",
  "pro pats.png",
  "ra,.png",
  "rebull.png",
  "semexe.png",
  "sense.png",
  "shimano.png",
  "specialized-logo-black-and-white.png",
  "sul bike race.png",
  "via araucaria.png",
  "xterra.png"
];

const ClientCloud = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label fade in
      gsap.fromTo(
        ".client-label",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Fade in de toda a seção
      gsap.fromTo(
        ".marquee-container",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white/[0.03] py-1 md:py-2 overflow-hidden border-t border-b border-white/5">
      <div className="w-full">
        {/* Única linha armada no Marquee */}
        <div className="marquee-container opacity-0 w-full relative">
          <div className="flex w-full overflow-hidden">
            <div 
              className="flex gap-12 md:gap-20 items-center animate-marquee-left will-change-transform"
              style={{ width: 'max-content', animationDuration: '80s' }}
            >
              {[...Array(3)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex gap-12 md:gap-20 items-center shrink-0">
                  {allLogos.map((logo, idx) => (
                    <div key={idx} className="shrink-0 flex items-center justify-center">
                      <img
                        src={`/logos/${logo}`}
                        alt={logo.split('.')[0]}
                        decoding="async"
                        className="w-auto h-auto max-w-[180px] md:max-w-[280px] lg:max-w-[360px] max-h-[48px] md:max-h-[75px] lg:max-h-[95px] object-contain brightness-0 invert opacity-[0.4] hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientCloud;