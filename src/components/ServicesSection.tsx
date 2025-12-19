import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

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

const ServiceBlock = ({ service, index, totalServices }: { service: typeof services[0]; index: number; totalServices: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Cada bloco aparece quando entra na viewport e some quando sai
  // O truque é usar z-index baseado no índice para que blocos posteriores fiquem por cima
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0.95, 1, 1, 0.95]);

  return (
    <div
      ref={ref}
      className="h-screen relative"
      style={{ zIndex: totalServices - index }}
    >
      <motion.div
        style={{ opacity, scale }}
        className="sticky top-0 h-screen flex items-center bg-black"
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* CONTEÚDO DO SERVIÇO */}
          <div className="flex flex-col">
            <span className="text-xs font-mono text-zinc-500 mb-4">/{service.id}</span>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              {service.title}
            </h3>
            <div className="border-t border-zinc-800 pt-6">
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
                {service.description}
              </p>
            </div>
          </div>

          {/* IMAGEM */}
          <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-zinc-900 border border-white/5">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
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
      </motion.div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="relative w-full bg-black text-white">
      {services.map((service, index) => (
        <ServiceBlock 
          key={service.id} 
          service={service} 
          index={index} 
          totalServices={services.length}
        />
      ))}
    </section>
  );
};

export default ServicesSection;
