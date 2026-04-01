/**
 * Fotos Page
 * Grid of all photo collections with GSAP animations.
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { photoCollections } from "@/data/photos";
// import { CaseLink } from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

const FotosPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  // Hero entrance animation - apenas filtro com fade leve
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-filter", {
        autoAlpha: 0,
        y: 8,
        duration: 0.4,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container-premium">
          <div>
            <h1 className="page-title text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tight italic mb-12 leading-[1]">
              Fotos
            </h1>
          </div>

          {/* Filter */}
          <div className="page-filter flex items-center gap-6 text-sm uppercase tracking-widest border-b border-border/30 pb-6">
            <span className="text-foreground font-bold cursor-pointer border-b border-foreground pb-1">
              All
            </span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={gridRef} className="pb-32">
        <div className="container-premium">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
            {photoCollections.map((photo) => (
              <div key={photo.id} className="project-card">
                <div
                  className="group cursor-pointer flex flex-col gap-4 block"
                >
                  {/* Image */}
                  <div className="w-full overflow-hidden bg-muted aspect-video relative flex items-center justify-center">
                    {photo.image ? (
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="project-image w-full h-full object-cover transition-transform duration-700 ease-[0.33,1,0.68,1] group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-muted-foreground/30 font-mono text-sm uppercase">Capa Pendente</span>
                    )}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
                  </div>

                  {/* Metadata */}
                  <div className="flex justify-between items-center text-[10px] md:text-xs font-mono text-muted-foreground border-b border-border/30 pb-3 mt-2">
                    <span>{photo.year}</span>
                    <span className="uppercase">{photo.category}</span>
                  </div>

                  {/* Titles */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl md:text-2xl font-bold leading-tight uppercase tracking-tight group-hover:text-muted-foreground transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground/60">
                      {photo.description}
                    </p>
                  </div>

                  {/* View Gallery Button */}
                  <div className="mt-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-bold uppercase tracking-widest border-b border-transparent group-hover:border-foreground transition-all pb-0.5">
                      Explorar Galeria
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FotosPage;
