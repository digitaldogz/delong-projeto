/**
 * ServicesSection Component
 * Interactive services menu with image gallery and GSAP animations.
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionNavigate } from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Cobertura de Eventos",
    description: "Registramos eventos esportivos, corporativos e shows, transformando experiências em conteúdos dinâmicos e de alto impacto.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Filmes Institucionais",
    description: "Produções completas focadas em contar a história da sua marca, reforçando autoridade e posicionamento estratégico no mercado.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Vídeos Publicitários",
    description: "Comerciais e campanhas com textura cinematográfica, direção de arte apurada e forte apelo visual para atrair e converter clientes.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Fotografia Profissional",
    description: "Ensaios fotográficos e cobertura premium em altíssima qualidade para campanhas, eventos e marcas que exigem excelência.",
    image: "https://images.unsplash.com/photo-1554046920-90cca97ec3a2?q=80&w=2072&auto=format&fit=crop"
  },
  {
    id: "05",
    title: "Produção de Sites",
    description: "Desenvolvimento de sites de alta performance com design moderno focado em usabilidade, performance e resultado comercial.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  }
];

const ServicesSection = () => {
  const [activeId, setActiveId] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const navigateWithTransition = useTransitionNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Service items stagger
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

      // Image gallery reveal
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
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black text-white py-24">
      <div className="container-premium grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
        
        {/* COLUNA ESQUERDA: MENU INTERATIVO */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          {services.map((service, index) => {
            const isActive = activeId === index;
            return (
              <div 
                key={service.id}
                onMouseEnter={() => setActiveId(index)}
                className="service-menu-item group cursor-pointer transition-all duration-300 opacity-0"
              >
                {/* Numeração */}
                <span className={`text-xs font-mono mb-2 block transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-700"}`}>
                  /{service.id}
                </span>
                
                {/* Título */}
                <h3 className={`text-4xl md:text-5xl font-bold tracking-tight mb-3 transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-700 group-hover:text-zinc-500"}`}>
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
                        {service.description}
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
          <div className="service-gallery relative w-full aspect-square md:aspect-[4/3] rounded-sm overflow-hidden bg-zinc-900 border border-white/5 opacity-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeId}
                src={services[activeId].image}
                alt={services[activeId].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Overlay sutil para garantir leitura do botão */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* BOTÃO FLUTUANTE NA IMAGEM */}
            <div className="absolute bottom-8 left-8 z-20">
               <button onClick={() => navigateWithTransition('/servicos')} className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] md:text-xs font-bold text-white uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 group cursor-pointer">
                 Explorar Serviços 
                 <span className="group-hover:translate-x-1 transition-transform">→</span>
               </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;