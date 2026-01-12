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
      <div className="relative w-full h-screen">
        <div className="absolute inset-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        {/* Título e metadados alinhados com container central */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12 pb-16 md:pb-24">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] max-w-4xl mb-6"
            >
              {project.title}
            </motion.h1>
            <div className="flex items-center gap-4 text-sm text-foreground/70">
              <span>{project.year}</span>
              <span>{project.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEÇÃO DE INFORMAÇÕES --- */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Coluna esquerda - Project Info */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2 h-2 bg-foreground"></span>
                <span className="text-sm">Project Info</span>
              </div>
              
              <div className="space-y-0">
                <div className="flex justify-between py-4 border-b border-border/30">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Client</span>
                  <span className="text-sm font-medium uppercase">{project.client}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-border/30">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Service</span>
                  <span className="text-sm font-medium uppercase">{project.service}</span>
                </div>
                <div className="flex justify-between py-4 border-b border-border/30">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Year</span>
                  <span className="text-sm font-medium uppercase">{project.year}</span>
                </div>
              </div>
            </div>

            {/* Coluna direita - Descrição */}
            <div className="lg:col-span-8">
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              {project.fullDescription && (
                <p className="mt-8 text-base leading-relaxed text-muted-foreground/70">
                  {project.fullDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- VÍDEO DO YOUTUBE --- */}
      {project.youtubeId && (
        <section className="py-12 md:py-20">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12">
            <YouTubeEmbed videoId={project.youtubeId} title={project.title} />
          </div>
        </section>
      )}

      {/* --- GALERIA DE IMAGENS --- */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="pb-24 md:pb-32">
          <div className="max-w-[1400px] mx-auto px-8 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((image, index) => {
                const isWide = index === 0 || index === 4;
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
      <section className="py-20 md:py-24 border-t border-border/20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">Mais Projetos</h3>
           
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((related) => (
              <Link 
                key={related.id}
                to={`/projeto/${related.slug}`}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden aspect-[4/3] mb-4">
                  <img 
                    src={related.image} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
                    alt={related.title}
                  />
                </div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{related.category}</p>
                <h4 className="text-sm font-medium uppercase group-hover:text-muted-foreground transition-colors leading-tight">{related.title}</h4>
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
