/**
 * Photo Detail Page
 * Full gallery view for a specific photo collection.
 * Follows the same premium design pattern as ProjectDetail.
 */

import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { getPhotoBySlug, getRelatedPhotos, PhotoCollection } from "@/data/photos";
import { ArrowLeft } from "lucide-react";
import { CaseLink, useTransitionNavigate } from "@/components/PageTransition";

/* ─────────────────────────────────────────────────────────────
   Hero Banner - Fullscreen image with overlay
───────────────────────────────────────────────────────────── */
const HeroBanner = ({ photo }: { photo: PhotoCollection }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".photo-hero-meta span", {
        autoAlpha: 0,
        y: 8,
        duration: 0.3,
        stagger: 0.05,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [photo.slug]);

  return (
    <div ref={containerRef} className="relative w-full h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {photo.image ? (
          <img
            src={photo.image}
            alt={photo.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div className="container-premium">
          <div>
            <h1
              className="font-bold uppercase leading-[1.05] mb-6"
              style={{ fontSize: "clamp(40px, 6vw, 90px)" }}
            >
              {photo.title}
            </h1>
          </div>
          <div className="photo-hero-meta flex items-center gap-4 text-sm text-foreground/80">
            <span>{photo.year}</span>
            <span>{photo.category}</span>
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
   Photo Info Section
───────────────────────────────────────────────────────────── */
const PhotoInfoSection = ({ photo }: { photo: PhotoCollection }) => (
  <section className="py-[100px] md:py-[120px]">
    <div className="container-premium">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16">
        {/* Left column - Photo Info */}
        <div className="lg:col-span-4">
          <div className="flex items-start gap-2 mb-10">
            <span className="w-1 h-1 bg-foreground mt-2 shrink-0" />
            <span className="text-sm tracking-wide">Sobre esta Coleção</span>
          </div>

          <div className="space-y-0">
            <InfoItem label="Client" value={photo.client} />
            <InfoItem label="Service" value={photo.service} />
            <InfoItem label="Year" value={photo.year} />
          </div>
        </div>

        {/* Right column - Description */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="max-w-[560px]">
            <p className="text-base leading-[1.8] text-muted-foreground/70">
              {photo.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   Gallery Section - Premium masonry-style grid
───────────────────────────────────────────────────────────── */
const GallerySection = ({ gallery, title }: { gallery: string[]; title: string }) => (
  <section className="pb-[120px]">
    <div className="container-premium">
      <div className="flex items-start gap-2 mb-12">
        <span className="w-1 h-1 bg-foreground mt-2 shrink-0" />
        <span className="text-sm tracking-wide">Galeria — {gallery.length} fotos</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gallery.map((image, index) => {
          const isWide = index % 3 === 0;
          return (
            <div
              key={index}
              className={`overflow-hidden ${
                isWide ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
              }`}
            >
              <img
                src={image}
                alt={`${title} - Imagem ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   Related Photos Section
───────────────────────────────────────────────────────────── */
const RelatedPhotosSection = ({ photos }: { photos: PhotoCollection[] }) => (
  <section className="py-[100px] border-t border-border/20">
    <div className="container-premium">
      <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-12">
        Mais Coleções
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <CaseLink
            key={photo.id}
            to={`/foto/${photo.slug}`}
            className="group cursor-pointer"
          >
            <div className="overflow-hidden aspect-[4/3] mb-4 bg-zinc-900">
              {photo.image && (
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
              {photo.client}
            </p>
            <h4 className="text-sm font-medium uppercase group-hover:opacity-70 transition-opacity leading-tight">
              {photo.title}
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
const PhotoDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigateWithTransition = useTransitionNavigate();

  const [photo, setPhoto] = useState<PhotoCollection | null>(null);
  const [loading, setLoading] = useState(true);

  // Busca dados
  useEffect(() => {
    const fetchPhoto = async () => {
      if (slug) {
        const data = await getPhotoBySlug(slug);
        setPhoto(data);
      }
      setLoading(false);
    };
    fetchPhoto();
  }, [slug]);

  const relatedPhotos = slug ? getRelatedPhotos(slug, 3) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <span className="uppercase text-sm tracking-widest text-muted-foreground/50">Carregando Galeria...</span>
        </div>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <p className="text-muted-foreground text-lg">Coleção não encontrada.</p>
          <button
            onClick={() => navigateWithTransition('/fotos')}
            className="text-sm uppercase tracking-widest border border-border px-6 py-3 hover:bg-foreground hover:text-background transition-all cursor-pointer"
          >
            Voltar para Fotos
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <HeroBanner photo={photo} />
      <PhotoInfoSection photo={photo} />
      {photo.gallery && photo.gallery.length > 0 ? (
        <GallerySection gallery={photo.gallery} title={photo.title} />
      ) : (
        <section className="py-24">
          <div className="container-premium text-center">
            <p className="text-muted-foreground text-lg">
              Galeria em breve — estamos preparando as melhores imagens desta coleção.
            </p>
          </div>
        </section>
      )}
      <RelatedPhotosSection photos={relatedPhotos} />
      <Footer />
    </div>
  );
};

export default PhotoDetail;
