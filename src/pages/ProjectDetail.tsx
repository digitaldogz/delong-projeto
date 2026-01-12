import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
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

      {/* --- HERO BANNER FULLSCREEN --- */}
      <div className="relative w-full h-screen flex items-center">
        <div className="absolute inset-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Título centralizado verticalmente, alinhado à esquerda */}
        <div className="relative z-10 w-full">
          <div className="container-premium">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-[8vw] font-bold uppercase leading-[0.9] mb-6"
            >
              {project.title}
            </motion.h1>
            <div className="flex items-center gap-4 text-sm text-foreground/80">
              <span>{project.year}</span>
              <span>{project.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEÇÃO DE INFORMAÇÕES --- */}
      <section className="py-[120px] md:py-[150px]">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Coluna esquerda - Project Info (4 colunas) */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-10">
                <span className="w-2 h-2 bg-foreground"></span>
                <span className="text-sm tracking-wide">Project Info</span>
              </div>
              
              <div className="space-y-0">
                <div className="grid grid-cols-[100px_1fr] py-4 border-b border-border/40">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Client</span>
                  <span className="text-sm font-medium uppercase">{project.client}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] py-4 border-b border-border/40">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Service</span>
                  <span className="text-sm font-medium uppercase">{project.service}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] py-4 border-b border-border/40">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Year</span>
                  <span className="text-sm font-medium uppercase">{project.year}</span>
                </div>
              </div>
            </div>

            {/* Coluna direita - Descrição (6 colunas, deixa 2 vazias para assimetria) */}
            <div className="lg:col-span-6 lg:pt-14">
              <p className="text-lg leading-[1.6] text-muted-foreground/70 mb-8">
                {project.description}
              </p>
              {project.fullDescription && (
                <p className="text-lg leading-[1.6] text-muted-foreground/70">
                  {project.fullDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- VÍDEO DO YOUTUBE --- */}
      {project.youtubeId && (
        <section className="py-[120px]">
          <div className="container-premium">
            <YouTubeEmbed videoId={project.youtubeId} title={project.title} />
          </div>
        </section>
      )}

      {/* --- GALERIA DE IMAGENS --- */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="pb-[150px]">
          <div className="container-premium">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((image, index) => {
                // Regra: a cada 3 imagens, a primeira (índice 0, 3, 6...) é larga
                const isWide = index % 3 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`overflow-hidden ${
                      isWide 
                        ? 'md:col-span-2 aspect-[16/9]' 
                        : 'aspect-[4/3]'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Imagem ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* --- MAIS PROJETOS --- */}
      <section className="py-[120px] border-t border-border/20">
        <div className="container-premium">
          <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">Mais Projetos</h3>
           
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((related) => (
              <Link 
                key={related.id}
                to={`/projeto/${related.slug}`}
                className="group cursor-pointer link-underline"
              >
                <div className="overflow-hidden aspect-[4/3] mb-4">
                  <img 
                    src={related.image} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
                    alt={related.title}
                  />
                </div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{related.category}</p>
                <h4 className="text-sm font-medium uppercase group-hover:opacity-70 transition-opacity leading-tight">{related.title}</h4>
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
