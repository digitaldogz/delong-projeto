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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <Navigate to="/projetos" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <SiteHeader />

      {/* --- HERO BANNER --- */}
      <div className="relative w-full h-[85vh]">
        <div className="absolute inset-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        <div className="absolute bottom-0 left-0 w-full max-w-[1400px] mx-auto px-8 md:px-12 pb-16 md:pb-24">
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

      {/* --- DADOS E DESCRIÇÃO --- */}
      <section className="py-20 border-b border-border/30">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-4 flex flex-col gap-8 border-l border-border/30 pl-6 h-fit">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Cliente</span>
                <span className="text-sm font-bold uppercase">{project.client}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Serviço</span>
                <span className="text-sm font-bold uppercase">{project.service}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Ano</span>
                <span className="text-sm font-bold uppercase">{project.year}</span>
              </div>
            </div>

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
      </section>

      {/* --- VÍDEO --- */}
      {project.videoUrl && (
        <section className="py-12 md:py-24">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12">
            <div className="w-full aspect-video bg-secondary overflow-hidden relative">
              <video 
                controls
                className="w-full h-full object-cover shadow-2xl"
              >
                <source src={project.videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      )}

      {/* --- GALERIA --- */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex flex-col gap-8">
          
          {project.gallery[0] && (
            <img 
              src={project.gallery[0]} 
              className="w-full h-auto object-cover" 
              alt={`${project.title} - Gallery 1`}
            />
          )}

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

          {project.gallery[3] && (
            <img 
              src={project.gallery[3]} 
              className="w-full h-auto object-cover" 
              alt={`${project.title} - Gallery 4`}
            />
          )}
          
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

        </div>
      </section>

      {/* --- MORE STORIES --- */}
      <section className="py-24 border-t border-border/30">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
           <h3 className="text-2xl font-medium mb-12">Mais Projetos</h3>
           
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
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
