/**
 * ServicesSection Component
 * Interactive services menu with image gallery and GSAP animations.
 */

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionNavigate } from "@/components/PageTransition";
import { getServices, ServiceData } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const [activeId, setActiveId] = useState(0);
  const [servicesData, setServicesData] = useState<ServiceData[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const navigateWithTransition = useTransitionNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      // Mostra no máximo os 5 primeiros na home para não quebrar o layout
      setServicesData(data.slice(0, 5));
    };
    fetchServices();
  }, []);

  useLayoutEffect(() => {
    if (servicesData.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-menu-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".service-gallery",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [servicesData]);

  if (servicesData.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-black text-white py-24">
      <div className="container-premium grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
        
        {/* COLUNA ESQUERDA: MENU INTERATIVO */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          {servicesData.map((service, index) => {
            const isActive = activeId === index;
            // Redireciona para /fotos se for fotografia
            const destination = service.slug === 'fotografia-profissional' ? '/fotos' : `/servicos/${service.slug}`;
            
            return (
              <div 
                key={service.id}
                onMouseEnter={() => setActiveId(index)}
                className="service-menu-item group transition-all duration-300 opacity-0"
              >
                {/* Numeração */}
                <span className={`text-xs font-mono mb-2 block transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-700"}`}>
                  /{service.number || `0${index + 1}`}
                </span>
                
                {/* Título Clicável */}
                <h3 
                  onClick={() => navigateWithTransition(destination)}
                  className={`text-4xl md:text-5xl font-bold tracking-tight mb-3 transition-colors duration-300 cursor-pointer hover:!text-white ${isActive ? "text-white" : "text-zinc-700"}`}
                >
                  {service.title}
                </h3>
                
                {/* Descrição (Acordeão) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-zinc-400 text-sm leading-relaxed max-w-sm pt-2 border-t border-zinc-800 mt-2">
                        {service.shortDescription}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* COLUNA DIREITA: GALERIA STICKY */}
        <div className="lg:col-span-7 relative hidden lg:block">
          <div className="service-gallery relative w-full aspect-square md:aspect-[4/3] rounded-sm overflow-hidden bg-zinc-900 border border-white/5 opacity-0 cursor-pointer" onClick={() => {
            const dest = servicesData[activeId].slug === 'fotografia-profissional' ? '/fotos' : `/servicos/${servicesData[activeId].slug}`;
            navigateWithTransition(dest);
          }}>
            <AnimatePresence mode="wait">
              {servicesData[activeId].image.match(/\.(mp4|webm|mov)$/i) || servicesData[activeId].image.includes('bunny') ? (
                <motion.video
                  key={activeId}
                  src={servicesData[activeId].image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <motion.img
                  key={activeId}
                  src={servicesData[activeId].image}
                  alt={servicesData[activeId].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;