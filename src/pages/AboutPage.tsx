/**
 * About Page
 * Company history, vision, and mission.
 */

import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <SiteHeader />

      {/* --- 1. HERO SECTION --- */}
      <section className="relative w-full h-screen flex flex-col overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
            alt="Delong Crew" 
            className="w-full h-full object-cover opacity-60 grayscale"
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col pt-32 pb-0">
          {/* Top - Only Label */}
          <div className="container-premium w-full">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs text-muted-foreground tracking-wider block"
            >
              (Sobre Nós)
            </motion.span>
          </div>

          {/* Middle Content - Description and Subtitle */}
          <div className="flex-1 flex items-center">
            <div className="container-premium w-full flex flex-col md:flex-row justify-between gap-8">
              {/* Left - Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm text-foreground/80 leading-relaxed max-w-md"
              >
                Fundada para inovar, a Delong se tornou uma das principais agências de comunicação criativa, organização de eventos e consultoria de marca.
              </motion.p>

              {/* Right - Subtitle */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-start gap-2"
              >
                <div className="w-1.5 h-1.5 bg-foreground mt-1.5 shrink-0" />
                <span className="text-sm text-foreground/70">Uma Jornada de Criatividade</span>
              </motion.div>
            </div>
          </div>

          {/* Bottom Marquee */}
          <div className="w-full overflow-hidden">
            <div className="flex animate-marquee-left py-8" style={{ animationDuration: '20s', width: 'max-content' }}>
              {[...Array(6)].map((_, i) => (
                <span key={i} className="text-6xl md:text-8xl lg:text-[10rem] font-light italic text-foreground whitespace-nowrap mx-8">
                  Nossa História /
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. MANIFESTO --- */}
      <section className="py-24 md:py-32">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight leading-[1.1] mb-8">
                Uma jornada <br/>
                <span className="text-muted-foreground">de criatividade</span> <br/>
                e inovação
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Na Delong Media House, trilhamos nosso próprio caminho. Onde a criatividade incorpora coragem e cada ideia ousada se torna um marco de sucesso.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md mt-6">
                Esta é a nossa jornada: paixão e dedicação para desbloquear novos potenciais e levar marcas ao topo.
              </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="w-full aspect-square bg-secondary overflow-hidden"
            >
               <img 
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                 alt="Team working" 
                 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 3. VISION --- */}
      <section className="border-t border-border/30">
        <div className="container-premium !px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
            
            <div className="px-8 md:px-12 py-16 lg:py-24 flex items-center justify-center lg:justify-start border-b lg:border-b-0 lg:border-r border-border/30">
               <motion.h2 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8 }}
                 viewport={{ once: true }}
                 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter"
               >
                 Visão
               </motion.h2>
            </div>

            <div className="px-8 md:px-12 py-16 lg:py-24 flex flex-col justify-center bg-secondary/20">
               <span className="text-xs font-mono text-muted-foreground mb-6">(01)</span>
               <p className="text-xl md:text-2xl font-light leading-snug text-muted-foreground max-w-xl">
                 "Tornar-se a agência criativa líder em comunicações, eventos e branding. Focada em desbloquear o potencial do cliente, impulsionada por uma equipe criativa com ideias inovadoras e execução eficaz."
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. MISSION --- */}
      <section className="border-t border-border/30">
        <div className="container-premium !px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
            
            <div className="px-8 md:px-12 py-16 lg:py-24 flex flex-col justify-center order-2 lg:order-1 bg-secondary/20 border-b lg:border-b-0 lg:border-r border-border/30">
               <span className="text-xs font-mono text-muted-foreground mb-6">(02)</span>
               <p className="text-xl md:text-2xl font-light leading-snug text-muted-foreground max-w-xl">
                 "Criar distinção na jornada de sucesso de cada marca, transformando-a na chave para a liderança e no poder de ir além da competição comum."
               </p>
            </div>

            <div className="px-8 md:px-12 py-16 lg:py-24 flex items-center justify-center lg:justify-start order-1 lg:order-2">
               <motion.h2 
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8 }}
                 viewport={{ once: true }}
                 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter"
               >
                 Missão
               </motion.h2>
            </div>

          </div>
        </div>
      </section>

      {/* --- 5. GALERIA EM X --- */}
      <section className="w-full py-16 overflow-hidden relative bg-background">
        {/* Primeira fileira - move para a esquerda */}
        <div className="mb-4 overflow-hidden">
          <div className="flex gap-4 animate-marquee-left" style={{ animationDuration: '40s', width: 'max-content' }}>
            {[
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
            ].map((src, i) => (
              <div key={i} className="shrink-0 w-[300px] md:w-[400px] h-[200px] md:h-[280px] overflow-hidden">
                <img 
                  src={src} 
                  alt={`Crew ${i + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Segunda fileira - move para a direita */}
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-marquee-right" style={{ animationDuration: '40s', width: 'max-content' }}>
            {[
              "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop",
            ].map((src, i) => (
              <div key={i} className="shrink-0 w-[300px] md:w-[400px] h-[200px] md:h-[280px] overflow-hidden">
                <img 
                  src={src} 
                  alt={`Event ${i + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
