import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logoDelongWhite from "@/assets/logo-delong-white.png";

const ProjectDetail = () => {
  // Rola para o topo ao abrir
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-background text-foreground min-h-screen font-sans selection:bg-foreground selection:text-background">
      
      {/* --- 1. HEADER (MANTIDO RIGOROSAMENTE IGUAL) --- */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-12 py-8 bg-gradient-to-b from-background/90 to-transparent transition-all">
         {/* LOGO */}
         <div className="w-auto">
            <Link to="/">
              <img 
                src={logoDelongWhite}
                alt="Delong Media House" 
                className="h-12 md:h-14 w-auto object-contain" 
              />
            </Link>
         </div>

         {/* MENU */}
         <div className="hidden md:flex items-center gap-12 text-sm uppercase tracking-widest">
           <Link to="/#sobre" className="group flex items-center gap-2 hover:text-muted-foreground transition-colors cursor-pointer text-muted-foreground">
             <span className="font-light opacity-60 text-xs">01</span>
             <span className="font-bold">Sobre</span>
           </Link>
           <Link to="/projetos" className="group flex items-center gap-2 text-foreground cursor-pointer hover:text-muted-foreground transition-colors">
             <span className="font-light opacity-100 text-xs">02</span>
             <span className="font-bold border-b border-foreground pb-0.5">Projetos</span>
           </Link>
           <Link to="/#servicos" className="group flex items-center gap-2 hover:text-muted-foreground transition-colors cursor-pointer text-muted-foreground">
             <span className="font-light opacity-60 text-xs">03</span>
             <span className="font-bold">Serviços</span>
           </Link>
         </div>

         {/* CONTATO */}
         <Link to="/#contato" className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer text-foreground">
           Contato <span>→</span>
         </Link>
      </nav>

      {/* --- 2. HERO BANNER (IMERSIVO) --- */}
      <div className="relative w-full h-[85vh]">
        {/* Imagem de Fundo */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" 
            alt="Project Cover" 
            className="w-full h-full object-cover opacity-80"
          />
          {/* Gradiente para o texto aparecer */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        {/* Título Sobreposto (Igual ao print) */}
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
           <motion.h1 
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.8 }}
             className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-[1.1] max-w-4xl drop-shadow-lg"
           >
             Exhibition The Public<br/>Security "Vì An Ninh<br/>Tổ Quốc"
           </motion.h1>
        </div>
      </div>

      {/* --- 3. DADOS E DESCRIÇÃO (FUNDO PRETO) --- */}
      <div className="px-6 md:px-12 lg:px-16 py-20 max-w-[1800px] mx-auto border-b border-border/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Coluna Esquerda: Metadados */}
          <div className="lg:col-span-4 flex flex-col gap-8 border-l border-border/30 pl-6 h-fit">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Client</span>
              <span className="text-sm font-bold uppercase">Ministry of Public Security</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Service</span>
              <span className="text-sm font-bold uppercase">Events / Production</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Year</span>
              <span className="text-sm font-bold uppercase">2025</span>
            </div>
          </div>

          {/* Coluna Direita: Texto */}
          <div className="lg:col-span-8">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-light mb-6">
              Comissionado pelo Ministério da Segurança Pública para a exibição "80 Anos de Jornada Pela Independência". 
              A Zeit (Delong) projetou um espaço experiencial em larga escala no Centro de Exibições do Vietnã.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground/60 max-w-2xl">
              Em 20.000m², engajamos visitantes diretamente com divisões especializadas através de atividades interativas, 
              displays de equipamentos e demonstrações, refletindo a disciplina da força e sua modernização.
            </p>
          </div>
        </div>
      </div>

      {/* --- 4. VÍDEO --- */}
      <section className="w-full py-12 md:py-24">
        <div className="w-full aspect-video bg-secondary overflow-hidden relative group cursor-pointer max-w-[1800px] mx-auto">
          <video 
            controls
            className="w-full h-full object-cover shadow-2xl"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-large-crowd-of-people-at-a-concert-462-large.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* --- 5. GALERIA (LAYOUT DO PRINT) --- */}
      <section className="w-full px-6 md:px-12 lg:px-16 pb-32 max-w-[1800px] mx-auto flex flex-col gap-8">
        
        {/* Foto Full Width Vermelha */}
        <img 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-auto object-cover" 
          alt="Exhibition Wide"
        />

        {/* Grid de 2 Fotos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <img 
             src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop" 
             className="w-full h-[500px] object-cover" 
             alt="Detail 1"
           />
           <img 
             src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
             className="w-full h-[500px] object-cover" 
             alt="Detail 2"
           />
        </div>

        {/* Foto Full Width Outdoor */}
        <img 
          src="https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-auto object-cover" 
          alt="Outdoor Event"
        />
        
        {/* Grid de 3 Fotos Pequenas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <img src="https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop" className="w-full h-[300px] object-cover" alt="Detail 3"/>
           <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop" className="w-full h-[300px] object-cover" alt="Detail 4"/>
           <img src="https://images.unsplash.com/photo-1459749411177-0473ef71607b?q=80&w=2070&auto=format&fit=crop" className="w-full h-[300px] object-cover" alt="Detail 5"/>
        </div>

      </section>

      {/* --- 6. MORE STORIES (PRÓXIMOS PROJETOS) --- */}
      <div className="px-6 md:px-12 lg:px-16 py-24 border-t border-border/20">
         <h3 className="text-2xl font-medium mb-12">More Stories</h3>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group cursor-pointer">
               <div className="overflow-hidden aspect-video mb-4">
                  <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" alt="Next 1"/>
               </div>
               <p className="text-xs text-muted-foreground mb-1">VinFast</p>
               <h4 className="text-sm font-bold uppercase">The Fierce Spirit</h4>
            </div>

            {/* Card 2 */}
            <div className="group cursor-pointer">
               <div className="overflow-hidden aspect-video mb-4">
                  <img src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1973&auto=format&fit=crop" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" alt="Next 2"/>
               </div>
               <p className="text-xs text-muted-foreground mb-1">Campaign</p>
               <h4 className="text-sm font-bold uppercase">We Got You</h4>
            </div>

            {/* Card 3 */}
            <div className="group cursor-pointer">
               <div className="overflow-hidden aspect-video mb-4">
                  <img src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop" className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" alt="Next 3"/>
               </div>
               <p className="text-xs text-muted-foreground mb-1">Show</p>
               <h4 className="text-sm font-bold uppercase">Brave Warrior</h4>
            </div>
         </div>
      </div>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border/20 text-center text-xs text-muted-foreground uppercase tracking-widest">
         Delong Media House © 2025. All Rights Reserved.
      </footer>

    </div>
  );
};

export default ProjectDetail;
