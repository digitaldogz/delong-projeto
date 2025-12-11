import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Events",
    description: "Concepção e produção de grandes festivais, lançamentos de produtos e convenções corporativas imersivas.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Integrated Marketing",
    description: "Campanhas 360º que unem o mundo físico e digital para criar narrativas de marca consistentes.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Creative Design",
    description: "Direção de arte, branding e motion graphics que definem a identidade visual do futuro.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Production",
    description: "Filmes publicitários e documentais com estética cinematográfica e storytelling poderoso.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop"
  }
];

const ServicesSection = () => {
  const [activeId, setActiveId] = useState(0);

  return (
    <section className="w-full bg-background text-foreground py-20 px-4 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
        
        {/* ESQUERDA: A Lista de Alto Contraste */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          {services.map((service, index) => {
            const isActive = activeId === index;
            return (
              <div 
                key={service.id}
                onMouseEnter={() => setActiveId(index)}
                className="group cursor-pointer transition-all duration-300"
              >
                {/* Número pequeno acima */}
                <span className={`text-xs font-mono mb-2 block transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground/30"}`}>
                  /{service.id}
                </span>
                
                {/* Título Grande */}
                <h3 className={`text-4xl md:text-5xl font-bold tracking-tight mb-3 transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground/30 group-hover:text-muted-foreground/50"}`}>
                  {service.title}
                </h3>
                
                {/* Descrição (Só visível se ativo) */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm pt-2">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* DIREITA: Imagem Quadrada com Botão Overlay */}
        <div className="lg:col-span-7 relative">
          {/* Container da Imagem com Aspecto Quadrado/Retangular */}
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-sm overflow-hidden bg-card">
            <AnimatePresence mode="popLayout">
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

            {/* Gradient Overlay sutil para o botão aparecer */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />

            {/* O BOTÃO FLUTUANTE */}
            <div className="absolute bottom-6 left-6 z-20">
               <button className="flex items-center gap-3 px-6 py-3 bg-foreground/10 backdrop-blur-md border border-foreground/20 rounded-full text-[10px] md:text-xs font-bold text-foreground uppercase tracking-widest hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 group">
                 Explore Services 
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
