import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logoDelongWhite from "@/assets/logo-delong-white.png";
import { projects } from "@/data/projects";

const ProjectsPage = () => {
  return (
    <div className="w-full bg-background text-foreground min-h-screen font-sans selection:bg-foreground selection:text-background">
      
      {/* HEADER IDÊNTICO AO HERO SECTION */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-12 py-8 bg-background/90 backdrop-blur-md transition-all">
         
         {/* LADO ESQUERDO: LOGO */}
         <Link to="/" className="w-auto hover:opacity-80 transition-opacity">
            <img 
               src={logoDelongWhite}
               alt="Delong Media House" 
               className="h-12 md:h-14 w-auto" 
            />
         </Link>

         {/* CENTRO: MENU NUMERADO (Igual Hero) */}
         <div className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-widest">
            <a href="/#sobre" className="hover:text-muted-foreground transition-colors flex items-center gap-1 text-foreground">
               <span className="opacity-50">01</span> Sobre
            </a>
            <span className="flex items-center gap-1 text-foreground border-b border-foreground pb-0.5">
               <span className="opacity-50">02</span> Projetos
            </span>
            <a href="/#servicos" className="hover:text-muted-foreground transition-colors flex items-center gap-1 text-foreground">
               <span className="opacity-50">03</span> Serviços
            </a>
         </div>

         {/* LADO DIREITO: CONTATO (Texto simples igual Hero) */}
         <a href="/#contato" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity text-foreground">
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
            className="text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter mb-12 uppercase"
          >
            Works
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
            >
              <Link 
                to={`/projeto/${project.slug}`}
                className="group cursor-pointer flex flex-col gap-4 block"
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
              </Link>
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
