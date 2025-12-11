import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logoDelongWhite from "@/assets/logo-delong-white.png";

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

const ProjectsPage = () => {
  return (
    <div className="w-full bg-background text-foreground min-h-screen font-sans selection:bg-foreground selection:text-background">
      
      {/* 1. HEADER FIXO (STICKY) */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-12 py-6 bg-background/90 backdrop-blur-md border-b border-border/5 transition-all">
         
         {/* LADO ESQUERDO: LOGO (Link para Home) */}
         <Link to="/" className="w-auto cursor-pointer hover:opacity-80 transition-opacity">
            <img 
               src={logoDelongWhite}
               alt="Delong Media House" 
               className="h-10 md:h-12 w-auto object-contain" 
            />
         </Link>

         {/* CENTRO: MENU (Volta para seções da Home) */}
         <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest bg-foreground/5 px-8 py-3 rounded-full border border-border/10">
            <Link to="/" className="hover:text-foreground text-muted-foreground transition-colors">
               Home
            </Link>
            <a href="/#sobre" className="hover:text-foreground text-muted-foreground transition-colors">
               Sobre
            </a>
            <a href="/#servicos" className="hover:text-foreground text-muted-foreground transition-colors">
               Serviços
            </a>
         </div>

         {/* LADO DIREITO: CONTATO */}
         <a href="/#contato" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-foreground hover:text-background transition-all border border-border/20 px-6 py-3 rounded-full">
            Contato <span>→</span>
         </a>
      </nav>

      {/* 2. CONTEÚDO DA PÁGINA (Com Padding Top para o header não cobrir) */}
      <div className="pt-40 pb-24 px-6 md:px-12 lg:px-16">
        
        <div className="max-w-[1600px] mx-auto mb-16 md:mb-20">
          {/* TÍTULO LIMPO */}
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-12"
          >
            Todos os Projetos
          </motion.h1>

          {/* FILTRO LIMPO (Apenas "ALL") */}
          <div className="flex items-center gap-6 text-sm uppercase tracking-widest border-b border-border/10 pb-6">
            <span className="text-foreground font-bold cursor-pointer border-b border-foreground pb-1">All</span>
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
              {/* Imagem */}
              <div className="w-full overflow-hidden bg-muted aspect-video relative">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[0.33,1,0.68,1] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
              </div>

              {/* Metadados */}
              <div className="flex justify-between items-center text-[10px] md:text-xs font-mono text-muted-foreground border-b border-border/10 pb-3 mt-2">
                <span>{project.year}</span>
                <span className="uppercase">{project.category}</span>
              </div>

              {/* Títulos */}
              <div className="flex flex-col gap-1">
                <h3 className="text-xl md:text-2xl font-bold leading-tight uppercase tracking-tight group-hover:text-muted-foreground transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground/60">
                  {project.client}
                </p>
              </div>

              {/* Botão Ver Case */}
              <div className="mt-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-bold uppercase tracking-widest border-b border-transparent group-hover:border-foreground transition-all pb-0.5">
                  Ver Case
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer do Grid */}
        <div className="w-full text-center py-24 border-t border-border/10 mt-20">
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Fim da lista</span>
        </div>

      </div>
    </div>
  );
};

export default ProjectsPage;
