/**
 * ServicesSection Component
 * Interactive services menu with image gallery and GSAP animations.
 */

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Eventos",
    description: "Concepção e produção técnica de festivais, lançamentos de produtos e convenções corporativas de alto impacto.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Marketing Integrado",
    description: "Estratégias 360º que fundem o físico e o digital para construir narrativas de marca consistentes e escaláveis.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Design Criativo",
    description: "Direção de arte, branding e motion graphics. Transformamos conceitos abstratos em identidades visuais icônicas.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Produção Audiovisual",
    description: "Filmes publicitários, documentários e conteúdo social com estética cinematográfica e storytelling poderoso.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop"
  }
];

const ServicesSection = () => {
  const [activeId, setActiveId] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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
               <Link to="/servicos" className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] md:text-xs font-bold text-white uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
                 Explorar Serviços 
                 <span className="group-hover:translate-x-1 transition-transform">→</span>
               </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;