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
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="w-full bg-background text-foreground py-24 px-8 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* COLUNA DA ESQUERDA: LISTA INTERATIVA */}
        <div className="lg:col-span-5 flex flex-col justify-center h-full py-10">
          <div className="flex flex-col gap-12">
            {services.map((service, index) => (
              <div 
                key={service.id}
                onMouseEnter={() => setActiveService(index)}
                className="group cursor-pointer transition-all duration-500"
              >
                <span className={`text-xs font-mono mb-2 block transition-colors duration-300 ${activeService === index ? "text-foreground" : "text-foreground/40"}`}>
                  /{service.id}
                </span>
                
                <h3 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 transition-colors duration-300 ${activeService === index ? "text-foreground" : "text-foreground/30 group-hover:text-foreground/60"}`}>
                  {service.title}
                </h3>
                
                <p className={`text-sm md:text-base leading-relaxed max-w-md transition-all duration-500 ${activeService === index ? "text-muted-foreground opacity-100 translate-y-0" : "text-muted-foreground/50 opacity-50"}`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA DA DIREITA: IMAGEM FIXA (STICKY PREVIEW) */}
        <div className="lg:col-span-7 relative h-[500px] md:h-[700px] w-full hidden lg:block">
          <div className="sticky top-0 w-full h-full rounded-none overflow-hidden bg-foreground/5">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeService}
                src={services[activeService].image}
                alt={services[activeService].title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
            </AnimatePresence>
            
            {/* Overlay Gradient para leitura */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

            {/* Botão Flutuante sobre a imagem */}
            <div className="absolute bottom-8 left-8">
               <button className="flex items-center gap-2 px-6 py-3 bg-foreground/10 backdrop-blur-md border border-foreground/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300">
                 Explore Services <span>→</span>
               </button>
            </div>
          </div>
        </div>
        
        {/* Versão Mobile da Imagem */}
        <div className="lg:hidden w-full h-64 mt-8 relative rounded-lg overflow-hidden">
             <img 
               src={services[activeService].image} 
               alt="Service Preview" 
               className="w-full h-full object-cover"
             />
             <div className="absolute bottom-4 left-4">
               <button className="text-xs font-bold uppercase tracking-widest border-b border-foreground pb-1">
                 Explore Services
               </button>
            </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
