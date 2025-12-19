import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calcula o progresso do scroll dentro da seção
      const scrollProgress = -rect.top / (sectionHeight - viewportHeight);
      
      // Determina qual serviço está ativo baseado no progresso
      const newIndex = Math.min(
        Math.max(0, Math.floor(scrollProgress * services.length)),
        services.length - 1
      );
      
      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Chama uma vez para inicializar
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeService = services[activeIndex];

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-black text-white"
      style={{ height: `${services.length * 100}vh` }}
    >
      {/* Container Sticky que fica fixo na tela */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* CONTEÚDO DO SERVIÇO - Lado Esquerdo */}
          <div className="flex flex-col relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col"
              >
                <span className="text-xs font-mono text-zinc-500 mb-4">/{activeService.id}</span>
                <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                  {activeService.title}
                </h3>
                <div className="border-t border-zinc-800 pt-6">
                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
                    {activeService.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicadores de progresso */}
            <div className="flex gap-2 mt-12">
              {services.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 transition-all duration-300 ${
                    idx === activeIndex 
                      ? "w-8 bg-white" 
                      : "w-2 bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* IMAGEM - Lado Direito */}
          <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-zinc-900 border border-white/5">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={activeService.image}
                alt={activeService.title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Botão */}
            <div className="absolute bottom-8 left-8 z-20">
              <Link 
                to="/servicos" 
                className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] md:text-xs font-bold text-white uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
              >
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
