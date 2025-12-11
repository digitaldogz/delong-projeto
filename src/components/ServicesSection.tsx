import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// DADOS TRADUZIDOS E REFINADOS PARA "DELONG MEDIA HOUSE"
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

  return (
    <section className="w-full bg-black text-white py-24 px-4 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
        
        {/* COLUNA ESQUERDA: MENU INTERATIVO */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          {services.map((service, index) => {
            const isActive = activeId === index;
            return (
              <div 
                key={service.id}
                onMouseEnter={() => setActiveId(index)}
                className="group cursor-pointer transition-all duration-300"
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
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-sm pt-2 border-t border-zinc-800 mt-2">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* COLUNA DIREITA: GALERIA STICKY */}
        <div className="lg:col-span-7 relative hidden lg:block">
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-sm overflow-hidden bg-zinc-900 border border-white/5">
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

            {/* Overlay sutil para garantir leitura do botão */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* BOTÃO FLUTUANTE NA IMAGEM */}
            <div className="absolute bottom-8 left-8 z-20">
               <button className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] md:text-xs font-bold text-white uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
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
