/**
 * ClientCloud Component
 * Animated grid of client names with GSAP.
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clientRows = [
  ["PEDAL"],
  ["RED BULL", "CANAL DE BIKE"],
  ["REVISTA BICICLETA", "GO OUTSIDE", "ADV MAG"],
  ["CBC", "SUL BIKE RACE", "BIKINGMAN", "DESAFIO DOS ROCHAS"],
  ["AVELAR", "SHIMANO FEST", "XTERRA", "CIMTB", "IRONMAN"],
  ["EUROBIKE", "BIKE CHOPP", "UPHILL MARATHON", "SPECIALIZED", "OGGI", "SENSE"],
  ["ATHOR", "AUDAX", "ORIGINE", "FOX", "ISAPA", "FREE FORCE", "HB"],
  ["PROPARTS", "OTL", "MAP TREINE", "SHIMANO", "GASGAS", "HOUSTON"],
  ["BLUECYCLE", "SEMEXE", "MOAGEIRA", "FOBRAS", "E MAIS..."],
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

      // Client words stagger animation
      const words = gsap.utils.toArray(".client-word");
      gsap.fromTo(
        words,
        { 
          opacity: 0, 
          y: 30, 
          filter: "blur(10px)" 
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.03,
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
    <section ref={sectionRef} className="w-full bg-background py-32 overflow-hidden border-t border-border">
      <div className="container-premium">
        {/* Label Superior */}
        <div className="flex justify-center mb-16">
          <span className="client-label text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase opacity-0">
            ▪ Featured Clients
          </span>
        </div>

        {/* Client Rows */}
        <div className="flex flex-col items-center gap-1 md:gap-2">
          {clientRows.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 lg:gap-x-8"
            >
              {row.map((client, clientIndex) => (
                <span 
                  key={clientIndex}
                  className="client-word text-lg md:text-2xl lg:text-3xl font-bold text-foreground tracking-[0.2em] whitespace-nowrap opacity-0"
                >
                  {client}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientCloud;