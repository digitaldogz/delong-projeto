import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { getProjectBySlug, getRelatedProjects } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const relatedProjects = slug ? getRelatedProjects(slug, 3) : [];

  // Rola para o topo ao abrir
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <Navigate to="/projetos" replace />;
  }

  return (
    <div className="w-full bg-background text-foreground min-h-screen font-sans selection:bg-foreground selection:text-background">
      
      {/* HEADER GLOBAL */}
      <SiteHeader />

      {/* --- HERO BANNER (IMERSIVO) --- */}
      <div className="relative w-full h-[85vh]">
        {/* Imagem de Fundo */}
        <div className="absolute inset-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-80"
          />
          {/* Gradiente para o texto aparecer */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        {/* Título Sobreposto */}
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
           <motion.h1 
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.8 }}
             className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-[1.1] max-w-4xl drop-shadow-lg"
           >
             {project.title}
           </motion.h1>
        </div>
      </div>

      {/* --- DADOS E DESCRIÇÃO (FUNDO PRETO) --- */}
      <div className="px-6 md:px-12 lg:px-16 py-20 max-w-[1800px] mx-auto border-b border-border/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Coluna Esquerda: Metadados */}
          <div className="lg:col-span-4 flex flex-col gap-8 border-l border-border/30 pl-6 h-fit">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Client</span>
              <span className="text-sm font-bold uppercase">{project.client}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Service</span>
              <span className="text-sm font-bold uppercase">{project.service}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Year</span>
              <span className="text-sm font-bold uppercase">{project.year}</span>
            </div>
          </div>

          {/* Coluna Direita: Texto */}
          <div className="lg:col-span-8">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-light mb-6">
              {project.description}
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground/60 max-w-2xl">
              {project.fullDescription}
            </p>
          </div>
        </div>
      </div>

      {/* --- VÍDEO (se existir) --- */}
      {project.videoUrl && (
        <section className="w-full py-12 md:py-24">
          <div className="w-full aspect-video bg-secondary overflow-hidden relative group cursor-pointer max-w-[1800px] mx-auto">
            <video 
              controls
              className="w-full h-full object-cover shadow-2xl"
            >
              <source src={project.videoUrl} type="video/mp4" />
            </video>
          </div>
        </section>
      )}

      {/* --- GALERIA --- */}
      <section className="w-full px-6 md:px-12 lg:px-16 pb-32 max-w-[1800px] mx-auto flex flex-col gap-8">
        
        {/* Primeira imagem full width */}
        {project.gallery[0] && (
          <img 
            src={project.gallery[0]} 
            className="w-full h-auto object-cover" 
            alt={`${project.title} - Gallery 1`}
          />
        )}

        {/* Grid de 2 Fotos */}
        {project.gallery.length > 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <img 
               src={project.gallery[1]} 
               className="w-full h-[500px] object-cover" 
               alt={`${project.title} - Gallery 2`}
             />
             <img 
               src={project.gallery[2]} 
               className="w-full h-[500px] object-cover" 
               alt={`${project.title} - Gallery 3`}
             />
          </div>
        )}

        {/* Foto Full Width (se tiver mais) */}
        {project.gallery[3] && (
          <img 
            src={project.gallery[3]} 
            className="w-full h-auto object-cover" 
            alt={`${project.title} - Gallery 4`}
          />
        )}
        
        {/* Grid de 3 Fotos (se tiver mais) */}
        {project.gallery.length > 5 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {project.gallery.slice(4, 7).map((img, idx) => (
               <img 
                 key={idx}
                 src={img} 
                 className="w-full h-[300px] object-cover" 
                 alt={`${project.title} - Gallery ${idx + 5}`}
               />
             ))}
          </div>
        )}

      </section>

      {/* --- MORE STORIES (PRÓXIMOS PROJETOS) --- */}
      <div className="px-6 md:px-12 lg:px-16 py-24 border-t border-border/20">
         <h3 className="text-2xl font-medium mb-12">More Stories</h3>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((related) => (
              <Link 
                key={related.id}
                to={`/projeto/${related.slug}`}
                className="group cursor-pointer"
              >
                 <div className="overflow-hidden aspect-video mb-4">
                    <img 
                      src={related.image} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
                      alt={related.title}
                    />
                 </div>
                 <p className="text-xs text-muted-foreground mb-1">{related.category}</p>
                 <h4 className="text-sm font-bold uppercase group-hover:text-muted-foreground transition-colors">{related.title}</h4>
              </Link>
            ))}
         </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
