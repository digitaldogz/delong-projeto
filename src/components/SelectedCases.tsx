/**
 * SelectedCases Component
 * Featured projects grid on the homepage with GSAP animations.
 */

import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

// Configuração de tamanho para exibição no grid
const sizeConfig: Record<number, 'large' | 'small'> = {
  1: 'large',
  2: 'large',
  3: 'small',
  4: 'small',
  5: 'small',
  6: 'small',
};

const SelectedCases = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Pega os 6 primeiros projetos do arquivo de dados
  const displayProjects = projects.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cases-header",
          start: "top 85%",
        },
      });

      headerTl.fromTo(
        ".cases-label",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        0
      );

      headerTl.fromTo(
        ".cases-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.1
      );

      // Project cards stagger
      const cards = gsap.utils.toArray(".case-card");
      cards.forEach((card: any, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
        );

        // Image scale on scroll reveal
        gsap.fromTo(
          card.querySelector(".case-image"),
          { scale: 1.1 },
          {
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
        );
      });

      // View all button
      gsap.fromTo(
        ".cases-view-all",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cases-view-all",
            start: "top 95%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-background py-24 border-t border-border">
      <div className="container-premium">
        
        {/* Cabeçalho da Seção */}
        <div className="cases-header mb-16">
          <span className="cases-label text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase flex items-center gap-2 mb-4 opacity-0">
            <span className="w-1 h-1 bg-foreground rounded-full"></span>
            Our Works
          </span>
          <h2 className="cases-title text-5xl md:text-7xl font-medium text-foreground tracking-tight opacity-0">
            Cases selecionados
          </h2>
        </div>

        {/* GRID DE PROJETOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          
          {displayProjects.map((project, index) => {
            const size = sizeConfig[index + 1] || 'small';
            
            return (
              <Link 
                key={project.id} 
                to={`/projeto/${project.slug}`} 
                className={`case-card group cursor-pointer flex flex-col gap-4 opacity-0 ${size === 'large' ? 'md:col-span-1 lg:col-span-2' : 'col-span-1'}`}
              >
                {/* Container da Imagem com Zoom no Hover */}
                <div className="relative w-full overflow-hidden aspect-[16/9] bg-secondary">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="case-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                  />
                  
                  {/* Overlay "View Case" */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/20 backdrop-blur-[2px]">
                    <div className="bg-foreground/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 border border-foreground/20">
                      <span className="text-xs font-bold text-foreground uppercase tracking-widest">View Case</span>
                      <ArrowUpRight className="w-4 h-4 text-foreground" />
                    </div>
                  </div>
                </div>

                {/* Informações do Projeto */}
                <div className="flex justify-between items-start border-t border-border pt-4">
                   <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground uppercase leading-tight mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        {project.client}
                      </p>
                   </div>
                   
                   <div className="text-right">
                     <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
                       {project.category}
                     </span>
                     <span className="block text-xs text-muted-foreground/60 font-mono">
                       {project.year}
                     </span>
                   </div>
                </div>
              </Link>
            );
          })}

        </div>
        
        {/* Botão de Ver Todos */}
        <div className="mt-20 flex justify-center">
          <Link 
            to="/projetos" 
            className="cases-view-all text-sm font-bold text-foreground uppercase tracking-widest border-b border-border pb-1 hover:text-primary hover:border-primary transition-colors opacity-0"
          >
            View All Projects
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SelectedCases;