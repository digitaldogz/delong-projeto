/**
 * ServicesStatement Component
 * Brief services intro with CTA.
 */

import { Link } from "react-router-dom";
const ServicesStatement = () => {
  return (
    <section className="w-full bg-background py-32 md:py-48 border-t border-border">
      <div className="container-premium grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Label - Esquerda */}
        <div className="lg:col-span-3">
          <span className="text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase flex items-center gap-2">
            <span className="w-1 h-1 bg-foreground rounded-full"></span>
            What we do
          </span>
        </div>

        {/* Conteúdo - Direita */}
        <div className="lg:col-span-9 flex flex-col items-start">
          {/* Texto Principal */}
          <h2 className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.1] tracking-tight mb-12">
            Nós criamos, produzimos e projetamos experiências que tornam as marcas diferentes.
          </h2>

          {/* Botão Estilo "Outline" */}
          <Link 
            to="/servicos" 
            className="inline-flex items-center justify-center px-8 py-4 font-mono text-xs font-bold text-foreground tracking-[0.2em] uppercase border border-border hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
          >
            [ Todos os Serviços ]
          </Link>
        </div>

      </div>
    </section>
  );
};
export default ServicesStatement;