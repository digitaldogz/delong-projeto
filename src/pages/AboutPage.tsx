import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-background text-foreground min-h-screen font-sans selection:bg-foreground selection:text-background">
      
      {/* HEADER FIXO */}
      <SiteHeader />

      {/* --- 1. HERO SECTION (STORY) --- */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Imagem de Fundo (PB / Cinematic) */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
            alt="Zeit Crew" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        
        {/* Texto Gigante Sobreposto */}
        <div className="relative z-10 w-full px-6 md:px-12 text-center">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tighter leading-none"
          >
            Story /<br/>Company Story
          </motion.h1>
        </div>
      </section>

      {/* --- 2. MANIFESTO (TIME OR JOURNEY) --- */}
      <section className="px-6 md:px-12 lg:px-24 py-24 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Texto Editorial */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight leading-[1.1] mb-8">
              Time or a <br/>
              <span className="text-muted-foreground">"Lifetime"</span> Story <br/>
              of Creativity
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Na Delong Media House, trilhamos nosso próprio caminho. Onde a criatividade incorpora coragem e cada ideia ousada se torna um marco de sucesso.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mt-6">
              Esta é a nossa "Viagem no Tempo": uma jornada de paixão e dedicação para desbloquear novos potenciais e levar marcas ao topo.
            </p>
          </motion.div>

          {/* Imagem Editorial */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="w-full aspect-square bg-secondary overflow-hidden"
          >
             <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
               alt="Team working" 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
             />
          </motion.div>
        </div>
      </section>

      {/* --- 3. VISION (VISÃO) --- */}
      <section className="w-full border-t border-border/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
          
          {/* Lado Esquerdo: Título Gigante */}
          <div className="p-12 lg:p-24 flex items-center justify-center lg:justify-start border-b lg:border-b-0 lg:border-r border-border/20">
             <motion.h2 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="text-6xl md:text-9xl font-bold uppercase tracking-tighter"
             >
               Vision
             </motion.h2>
          </div>

          {/* Lado Direito: Texto */}
          <div className="p-12 lg:p-24 flex flex-col justify-center bg-secondary/20">
             <span className="text-xs font-mono text-muted-foreground mb-6">(01)</span>
             <p className="text-xl md:text-3xl font-light leading-snug text-muted-foreground max-w-xl">
               "Tornar-se a agência criativa líder em comunicações, eventos e branding. Focada em desbloquear o potencial do cliente, impulsionada por uma equipe criativa com ideias inovadoras e execução eficaz."
             </p>
          </div>
        </div>
      </section>

      {/* --- 4. MISSION (MISSÃO) --- */}
      <section className="w-full border-t border-border/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
          
          {/* Lado Esquerdo: Texto (Invertido em relação à Visão para dinamismo) */}
          <div className="p-12 lg:p-24 flex flex-col justify-center order-2 lg:order-1 bg-secondary/20 border-b lg:border-b-0 lg:border-r border-border/20">
             <span className="text-xs font-mono text-muted-foreground mb-6">(02)</span>
             <p className="text-xl md:text-3xl font-light leading-snug text-muted-foreground max-w-xl">
               "Criar distinção na jornada de sucesso de cada marca, transformando-a na chave para a liderança e no poder de ir além da competição comum."
             </p>
          </div>

          {/* Lado Direito: Título Gigante */}
          <div className="p-12 lg:p-24 flex items-center justify-center lg:justify-start order-1 lg:order-2">
             <motion.h2 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="text-6xl md:text-9xl font-bold uppercase tracking-tighter"
             >
               Mission
             </motion.h2>
          </div>

        </div>
      </section>

      {/* --- 5. IMAGEM FINAL (AMBIÊNCIA) --- */}
      <section className="w-full h-[60vh] overflow-hidden relative">
         <img 
           src="https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop" 
           className="w-full h-full object-cover opacity-60"
           alt="Ambience"
         />
         <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-foreground/20">Delong Media House</h3>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
