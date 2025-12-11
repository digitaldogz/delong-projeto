import React from "react";
import { motion } from "framer-motion";

// Dados simulados baseados no seu print "works.png"
const projects = [
  {
    id: 1,
    year: "2025",
    category: "Events",
    title: "EXHIBITION THE PUBLIC SECURITY",
    client: "Ministry of Public Security",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    year: "2025",
    category: "VinFast",
    title: "VINFAST EXHIBITION 'THE FIERCE SPIRIT'",
    client: "VinFast Global",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    year: "2025",
    category: "Events",
    title: "HANOI CONVENTION",
    client: "Ministry of Public Security",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
  },
  {
    id: 4,
    year: "2025",
    category: "Marketing",
    title: "CAMPAIGN 'WE GOT YOU'",
    client: "Digital Trust Alliance",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1973&auto=format&fit=crop"
  },
  {
    id: 5,
    year: "2025",
    category: "Production",
    title: "REALITY TV SHOW: THE BRAVE WARRIOR",
    client: "Ministry of Public Security",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop"
  },
  {
    id: 6,
    year: "2025",
    category: "Events",
    title: "MSB PRIVATE CONCERT",
    client: "MSB Bank",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770&auto=format&fit=crop"
  }
];

const WorksSection = () => {
  return (
    <section id="projetos" className="w-full bg-background text-foreground min-h-screen py-24 px-6 md:px-12 lg:px-16 font-sans">
      
      {/* 1. HEADER DA SEÇÃO */}
      <div className="max-w-[1600px] mx-auto mb-16 md:mb-24">
        {/* Título com Contador Sobrescrito */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter mb-12 relative inline-block"
        >
          Works
          <span className="text-2xl md:text-3xl absolute top-2 -right-12 md:-right-16 font-light text-muted-foreground">
            (19)
          </span>
        </motion.h1>

        {/* 2. BARRA DE FILTRO (APENAS "ALL" conforme pedido) */}
        <div className="flex items-center gap-6 text-sm uppercase tracking-widest border-b border-border/10 pb-6">
          <span className="text-foreground font-bold cursor-pointer border-b border-foreground pb-1">All</span>
          <span className="text-muted-foreground/40 cursor-default">/</span>
          <span className="text-muted-foreground/20 select-none">Events / Marketing / Production</span>
        </div>
      </div>

      {/* 3. GRID DE PROJETOS */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer flex flex-col gap-4"
          >
            {/* IMAGEM COM ZOOM SUAVE NO HOVER */}
            <div className="w-full overflow-hidden bg-muted aspect-video relative">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-[0.33,1,0.68,1] group-hover:scale-105"
              />
              {/* Overlay sutil ao passar o mouse */}
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
            </div>

            {/* METADADOS (Ano e Categoria) */}
            <div className="flex justify-between items-center text-[10px] md:text-xs font-mono text-muted-foreground border-b border-border/10 pb-3 mt-2">
              <span>{project.year}</span>
              <span className="uppercase">{project.category}</span>
            </div>

            {/* INFORMAÇÕES PRINCIPAIS */}
            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-bold leading-tight uppercase tracking-tight group-hover:text-muted-foreground transition-colors">
                {project.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground/60">
                {project.client}
              </p>
            </div>

            {/* BOTÃO "VIEW CASE" (Aparece/Ilumina no Hover) */}
            <div className="mt-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] font-bold uppercase tracking-widest border-b border-transparent group-hover:border-foreground transition-all pb-0.5">
                View Case
              </span>
            </div>

          </motion.div>
        ))}
      </div>

      {/* FOOTER SIMPLES DA SEÇÃO */}
      <div className="w-full text-center py-24">
        <button className="text-xs font-bold uppercase tracking-widest border border-border/20 px-8 py-4 rounded-full hover:bg-foreground hover:text-background transition-all">
          Carregar Mais Projetos
        </button>
      </div>

    </section>
  );
};

export default WorksSection;
