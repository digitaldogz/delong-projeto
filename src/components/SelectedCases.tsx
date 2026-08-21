import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProjects, Project } from "@/data/projects";
import { CaseLink, useTransitionNavigate } from "./PageTransition";

gsap.registerPlugin(ScrollTrigger);

const FEATURED_SLUGS = [
  "expo-irati-2024",
  "shows-antony-e-gabriel",
  "shows-joao-neto-e-frederico",
  "institucional-prefeitura-irati",
  "publicitario-lelac-ram",
  "esporte-iratrail",
];

const SelectedCases = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigateWithTransition = useTransitionNavigate();
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);

  // Busca projetos do Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getProjects();
      const featured = FEATURED_SLUGS
        .map(slug => allProjects.find(p => p.slug === slug))
        .filter(Boolean) as Project[];
      setDisplayProjects(featured);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cases-label",
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cases-header",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".cases-title",
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cases-header",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-background pt-32 pb-40">
      <div className="container-premium px-6 md:px-12 lg:px-20">
        
        {/* Cabeçalho */}
        <div className="cases-header mb-16">
          <span className="cases-label text-xs font-medium text-foreground tracking-widest flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 bg-foreground"></span>
            Our Works
          </span>
          <h2 className="cases-title text-4xl md:text-7xl lg:text-[6rem] font-medium text-foreground tracking-tighter leading-none">
            Selected Cases
          </h2>
        </div>

        {/* GRID DE PROJETOS Zeit Style */}
        <div className="flex md:grid flex-nowrap md:grid-cols-4 gap-4 md:gap-x-6 gap-y-16 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-8 md:pb-0 px-6 md:px-0 -mx-6 md:mx-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {displayProjects.map((project, index) => {
            if (!project) return null;
            // Dois grandes (50% cada) na primeira linha, quatro pequenos (25% cada) na segunda.
            const isLarge = index < 2;
            const spanClass = isLarge ? "md:col-span-2" : "md:col-span-1";
            const mobileClass = "w-[65vw] min-w-[65vw] max-w-[65vw] sm:w-[50vw] sm:min-w-[50vw] sm:max-w-[50vw] snap-center shrink-0 md:w-auto md:min-w-0 md:max-w-none md:shrink";

            return (
              <CaseLink 
                key={project.id} 
                to={`/projeto/${project.slug}`} 
                className={`group flex flex-col overflow-hidden cursor-pointer ${spanClass} ${mobileClass}`}
              >
                {/* Imagem ou Video (Zoom interno no hover) */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[0.33,1,0.68,1] group-hover:scale-[1.03]" 
                    />
                  ) : (
                    <video 
                      src={project.hoverVideoUrl || project.videoUrl} 
                      autoPlay loop muted playsInline 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-[1.2s] ease-[0.33,1,0.68,1] group-hover:scale-[1.03]" 
                    />
                  )}
                </div>

                {/* Informações Pós Imagem (Ganha BG no Hover) */}
                <div className="flex flex-col flex-1 pt-6 px-6 pb-6 transition-colors duration-500 group-hover:bg-[#151515]">
                  
                  {/* Metadados (Ano / Categoria) */}
                  <div className="flex justify-between items-center text-[10px] md:text-xs text-foreground/50 mb-6">
                    <span className="font-sans">{project.year}</span>
                    <span className="capitalize">{project.category}</span>
                  </div>
                  
                  {/* Título e Cliente */}
                  <h3 className={`font-bold uppercase tracking-tight mb-2 leading-[1.2] ${isLarge ? 'text-lg md:text-[1.7rem]' : 'text-base md:text-xl'} line-clamp-2`}>
                    {project.title}
                  </h3>
                  <p className={`text-foreground/70 mb-16 ${isLarge ? 'text-sm' : 'text-xs'}`}>
                    {project.client}
                  </p>
                  
                  {/* Botão Animado de View Case (Ancorado no final) */}
                  <div className="mt-auto relative h-[20px] md:h-[24px] overflow-hidden border border-transparent group-hover:border-white/10 transition-colors duration-500">
                    
                    {/* Posição Normal (Apenas texto discreto vazado, alinhado ao centro esquerdo) */}
                    <div className="absolute inset-0 flex items-center text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/40 transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full">
                      VIEW CASE
                    </div>

                    {/* Posição Hover (Barra Branca Sólida que entra rasgando de baixo) */}
                    <div className="absolute inset-0 flex items-center justify-between px-3 bg-white text-black transition-transform duration-500 ease-[0.76,0,0.24,1] translate-y-full group-hover:translate-y-0">
                      <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] pt-0.5">VIEW CASE</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </div>

                  </div>
                </div>
              </CaseLink>
            )
          })}
        </div>
        
        {/* Botão de Ver Todos (Centralizado embaixo) */}
        <div className="mt-16 md:mt-32 flex justify-center">
          <button 
            onClick={() => navigateWithTransition('/projetos')} 
            className="text-sm font-medium text-foreground tracking-widest hover:text-white/60 transition-colors"
          >
            [ All Projects ]
          </button>
        </div>

      </div>
    </section>
  );
};

export default SelectedCases;