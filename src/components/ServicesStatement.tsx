import React from 'react';
const ServicesStatement = () => {
  return <section className="w-full bg-background py-32 md:py-48 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex flex-col items-center justify-center text-center">
        
        {/* Label Superior */}
        <div className="mb-8 md:mb-12">
          <span className="text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase flex items-center gap-2">
            <span className="w-1 h-1 bg-foreground rounded-full"></span>
            What we do
          </span>
        </div>

        {/* Texto Principal */}
        <h2 className="max-w-5xl text-4xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] tracking-tight mb-16">Nós criamos, produzimos e
projetamos experiências que tornam as marcas diferentes.</h2>

        {/* Botão Estilo "Outline" */}
        <a href="#" className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-mono text-xs font-bold text-foreground tracking-[0.2em] uppercase border border-border hover:border-foreground transition-colors duration-300">
          <span className="relative z-10">[ All Services ]</span>
          <div className="absolute inset-0 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0 mix-blend-difference"></div>
        </a>

      </div>
    </section>;
};
export default ServicesStatement;