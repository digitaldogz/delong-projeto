import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { getProjectBySlug, getRelatedProjects, Project } from "@/data/projects";

/* ─────────────────────────────────────────────────────────────
   Hero Banner - Fullscreen com gradiente
───────────────────────────────────────────────────────────── */
const HeroBanner = ({ project }: { project: Project }) => (
  <div className="relative w-full h-screen flex items-center">
    <div className="absolute inset-0">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
    </div>

    <div className="relative z-10 w-full">
      <div className="container-premium">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-bold uppercase leading-[1.0] mb-6"
          style={{ fontSize: "clamp(40px, 6vw, 90px)" }}
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
);

/* ─────────────────────────────────────────────────────────────
   Info Item - Linha individual da tabela de info
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
   Project Info Section - Informações + Descrição
───────────────────────────────────────────────────────────── */
const ProjectInfoSection = ({ project }: { project: Project }) => (
  <section className="py-[100px] md:py-[120px]">
    <div className="container-premium">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16">
        {/* Coluna esquerda - Project Info */}
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

        {/* Coluna direita - Descrição */}
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
   Video Section - YouTube embed
───────────────────────────────────────────────────────────── */
const VideoSection = ({ videoId, title }: { videoId: string; title: string }) => (
  <section className="py-[100px]">
    <div className="container-premium">
      <YouTubeEmbed videoId={videoId} title={title} />
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   Gallery Section - Grid de imagens
───────────────────────────────────────────────────────────── */
const GallerySection = ({ gallery, title }: { gallery: string[]; title: string }) => (
  <section className="pb-[120px]">
    <div className="container-premium">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gallery.map((image, index) => {
          const isWide = index % 3 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`overflow-hidden ${
                isWide ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
              }`}
            >
              <img
                src={image}
                alt={`${title} - Imagem ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   Related Projects Section - Mais projetos
───────────────────────────────────────────────────────────── */
const RelatedProjectsSection = ({ projects }: { projects: Project[] }) => (
  <section className="py-[100px] border-t border-border/20">
    <div className="container-premium">
      <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">
        Mais Projetos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projeto/${project.slug}`}
            className="group cursor-pointer link-underline"
          >
            <div className="overflow-hidden aspect-[4/3] mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
              />
            </div>
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
              {project.category}
            </p>
            <h4 className="text-sm font-medium uppercase group-hover:opacity-70 transition-opacity leading-tight">
              {project.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────
   Page transition variants
───────────────────────────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const relatedProjects = slug ? getRelatedProjects(slug, 3) : [];

  if (!project) {
    return <Navigate to="/projetos" replace />;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-background text-foreground"
    >
      <SiteHeader />
      <HeroBanner project={project} />
      <ProjectInfoSection project={project} />
      {project.youtubeId && <VideoSection videoId={project.youtubeId} title={project.title} />}
      {project.gallery && project.gallery.length > 0 && (
        <GallerySection gallery={project.gallery} title={project.title} />
      )}
      <RelatedProjectsSection projects={relatedProjects} />
      <Footer />
    </motion.div>
  );
};

export default ProjectDetail;
