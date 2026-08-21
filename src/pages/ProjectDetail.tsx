/**
 * Project Detail Page
 * Full case study with GSAP entrance animations.
 * Data loaded from Supabase with static fallback.
 */

import { useRef, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { CaseLink } from "@/components/PageTransition";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import { getProjectBySlug, getRelatedProjects, Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   Hero Banner - Fullscreen with GSAP animations
───────────────────────────────────────────────────────────── */
const HeroBanner = ({ project }: { project: Project }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-meta span", {
        autoAlpha: 0,
        y: 8,
        duration: 0.3,
        stagger: 0.05,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project.slug]);

  return (
    <div ref={containerRef} className="relative w-full h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="hero-image w-full h-full object-cover"
          />
        ) : (
          <div className="hero-image w-full h-full object-cover bg-zinc-900" />
        )}
          <div className="hero-gradient absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div className="container-premium">
          <div>
            <h1
              className="hero-title font-bold uppercase leading-[1.05] mb-6"
              style={{ fontSize: "clamp(40px, 6vw, 90px)" }}
            >
              {project.title}
            </h1>
          </div>
          <div className="hero-meta flex items-center gap-4 text-sm text-foreground/80">
            <span>{project.year}</span>
            <span>{project.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Info Item - Single info row
───────────────────────────────────────────────────────────── */
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[96px_1fr] items-baseline py-3 border-b border-border/30">
    <span className="text-[11px] text-muted-foreground/50 uppercase tracking-widest">
      {label}
    </span>
    <span className="text-sm font-extrabold uppercase">{value}</span>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   Project Info Section
───────────────────────────────────────────────────────────── */
const ProjectInfoSection = ({ project }: { project: Project }) => (
  <section className="py-[100px] md:py-[120px]">
    <div className="container-premium">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16">
        {/* Left column - Project Info */}
        <div className="lg:col-span-4">
          <div className="flex items-start gap-2 mb-10">
            <span className="w-1 h-1 bg-foreground mt-2 shrink-0" />
            <span className="text-sm tracking-wide">Project Info</span>
          </div>

          <div className="space-y-0">
            <InfoItem label="Client" value={project.client} />
            <InfoItem label="Service" value={project.service} />
            <InfoItem label="Year" value={project.year} />
          </div>
        </div>

        {/* Right column - Description */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="max-w-[560px]">
            <p className="text-base leading-[1.8] text-muted-foreground/70 mb-8">
              {project.description}
            </p>
            {project.fullDescription && (
              <p className="text-base leading-[1.8] text-muted-foreground/70">
                {project.fullDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   Video Section - Universal player supporting YouTube, Bunny, Direct URL
───────────────────────────────────────────────────────────── */
const VideoSection = ({ project }: { project: Project }) => (
  <section className="py-[100px]">
    <div className="container-premium">
      <VideoPlayer
        youtubeId={project.youtubeId}
        bunnyVideo={project.bunnyVideo}
        videoUrl={project.videoUrl}
        title={project.title}
        poster={project.image}
        videoOrientation={project.videoOrientation}
      />
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   Gallery Section
───────────────────────────────────────────────────────────── */
const GallerySection = ({ gallery, title }: { gallery: string[]; title: string }) => (
  <section className="pb-[120px]">
    <div className="container-premium">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gallery.map((mediaUrl, index) => {
          const isWide = index % 3 === 0;
          const isDirectVideo = mediaUrl.match(/\.(mp4|webm|mov)$/i) || mediaUrl.includes('bunny');
          const isIframeVideo = mediaUrl.includes('mediadelivery.net');
          
          let embedUrl = mediaUrl;
          if (isIframeVideo) {
            embedUrl = embedUrl.replace('/play/', '/embed/');
            if (!embedUrl.includes('?')) {
              embedUrl += '?autoplay=true&loop=true&muted=true&preload=true&responsive=true';
            }
          }

          return (
            <div
              key={index}
              className={`overflow-hidden bg-muted relative ${
                isWide ? "md:col-span-2 aspect-[16/9]" : "aspect-[9/16] md:aspect-[4/3]"
              }`}
            >
              {isDirectVideo ? (
                <video
                  src={mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              ) : isIframeVideo ? (
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                  <iframe
                    src={embedUrl}
                    loading="lazy"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                    className="absolute inset-0 w-full h-full border-0 scale-105"
                  />
                </div>
              ) : (
                <img
                  src={mediaUrl}
                  alt={`${title} - Mídia ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   Related Projects Section
───────────────────────────────────────────────────────────── */
const RelatedProjectsSection = ({ projects }: { projects: Project[] }) => (
  <section className="py-[100px] border-t border-border/20">
    <div className="container-premium">
      <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">
        Mais Projetos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <CaseLink
            key={project.id}
            to={`/projeto/${project.slug}`}
            className="group cursor-pointer"
          >
            <div className="overflow-hidden aspect-[4/3] mb-4 bg-zinc-900">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
              {project.category}
            </p>
            <h4 className="text-sm font-medium uppercase group-hover:opacity-70 transition-opacity leading-tight">
              {project.title}
            </h4>
          </CaseLink>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        const [projectData, relatedData] = await Promise.all([
          getProjectBySlug(slug),
          getRelatedProjects(slug, 3),
        ]);
        setProject(projectData);
        setRelatedProjects(relatedData);
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <span className="uppercase text-sm tracking-widest text-muted-foreground/50">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/projetos" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <HeroBanner project={project} />
      <ProjectInfoSection project={project} />
      {(project.youtubeId || project.bunnyVideo || project.videoUrl) && (
        <VideoSection project={project} />
      )}
      {project.gallery && project.gallery.length > 0 && (
        <GallerySection gallery={project.gallery} title={project.title} />
      )}
      <RelatedProjectsSection projects={relatedProjects} />
      <Footer />
    </div>
  );
};

export default ProjectDetail;
