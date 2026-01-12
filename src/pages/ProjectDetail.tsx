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
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Tag no canto superior direito */}
        <div className="absolute top-24 right-8 md:right-12">
          <span className="text-xs font-medium uppercase tracking-widest text-foreground/80 bg-background/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border/20">
            {project.category}
          </span>
        </div>

        {/* Título grande na parte inferior */}
        <div className="absolute bottom-0 left-0 w-full px-8 md:px-12 pb-12 md:pb-20">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase leading-[0.95] max-w-5xl"
          >
            {project.title}
          </motion.h1>
        </div>
      </div>

      {/* --- SEÇÃO DE INFORMAÇÕES --- */}
      <section className="py-16 md:py-24 border-b border-border/20">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Coluna esquerda - Metadados */}
            <div className="lg:col-span-4">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Cliente</span>
                  <span className="text-base font-medium">{project.client}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Serviço</span>
                  <span className="text-base font-medium">{project.service}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Ano</span>
                  <span className="text-base font-medium">{project.year}</span>
                </div>
              </div>
            </div>

            {/* Coluna direita - Descrição longa */}
            <div className="lg:col-span-8">
              <p className="text-2xl md:text-3xl lg:text-4xl leading-[1.3] font-light text-foreground/90">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- VÍDEO DO YOUTUBE --- */}
      {project.youtubeId && (
        <section className="py-16 md:py-24">
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
                // Layout variado: algumas imagens ocupam largura total
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
                        ? 'md:col-span-2 aspect-[21/9]' 
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
