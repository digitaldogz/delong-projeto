/**
 * Projects Page
 * Grid of all projects with GSAP animations.
 */

import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const ProjectsPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  // Hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Masked title slide up
      tl.fromTo(
        ".page-title",
        { yPercent: 100 },
        { yPercent: 0, duration: 1.2 },
        0
      );

      // Filter fade in
      tl.fromTo(
        ".page-filter",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.4
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Grid stagger animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container-premium">
          <div className="overflow-hidden">
            <h1 className="page-title text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tight italic mb-12">
              Projetos
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
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <Link
                  to={`/projeto/${project.slug}`}
                  className="group cursor-pointer flex flex-col gap-4 block"
                >
                  {/* Image */}
                  <div className="w-full overflow-hidden bg-muted aspect-video relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[0.33,1,0.68,1] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
                  </div>

                  {/* Metadata */}
                  <div className="flex justify-between items-center text-[10px] md:text-xs font-mono text-muted-foreground border-b border-border/30 pb-3 mt-2">
                    <span>{project.year}</span>
                    <span className="uppercase">{project.category}</span>
                  </div>

                  {/* Titles */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl md:text-2xl font-bold leading-tight uppercase tracking-tight group-hover:text-muted-foreground transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground/60">
                      {project.client}
                    </p>
                  </div>

                  {/* View Case Button */}
                  <div className="mt-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-bold uppercase tracking-widest border-b border-transparent group-hover:border-foreground transition-all pb-0.5">
                      Ver Case
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
