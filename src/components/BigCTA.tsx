import React from 'react';
const BigCTA = () => {
  return <section className="relative w-full bg-background py-32 md:py-48 overflow-hidden flex items-center justify-center border-t border-border">
      
      {/* Elemento Decorativo de Fundo (Glow Vermelho) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-destructive/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 text-center md:text-left w-full">
        <h2 className="font-black text-foreground leading-[0.9] tracking-tighter uppercase select-none">
          <span className="block text-5xl md:text-[7rem] lg:text-[9rem] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-foreground hover:to-muted-foreground transition-all duration-500">VAMOS TORNAR</span>
          <span className="block text-5xl md:text-[7rem] lg:text-[9rem] text-muted-foreground/30 ml-0 md:ml-24 hover:text-foreground transition-colors duration-500">SUA MARCA</span>
          <span className="block text-5xl md:text-[7rem] lg:text-[9rem] text-destructive mix-blend-screen ml-0 md:ml-48">INESQUECÍVEL</span>
        </h2>
      </div>
      
    </section>;
};
export default BigCTA;