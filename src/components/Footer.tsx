import React from 'react';
import { ArrowUpRight, Instagram, Facebook } from 'lucide-react';
const Footer = () => {
  return <footer className="w-full bg-background text-foreground border-t border-border">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12">
        
        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-16 md:py-24">
          
          {/* LADO ESQUERDO */}
          <div className="flex flex-col justify-between gap-12">
            {/* Identidade */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">A arte move tudo</h3>
              <p className="text-muted-foreground max-w-md leading-relaxed">Moldamos histórias de sucesso com ideias inovadoras e domínio técnico, elevando o padrão da sua marca e colocando você à frente da concorrência.</p>
            </div>

            {/* CTA Box */}
            <a href="#" className="group block w-full max-w-md bg-foreground hover:bg-foreground/90 transition-colors py-6 px-8 flex justify-between items-center">
              <span className="text-lg md:text-xl font-bold text-background tracking-tight">Tem um projeto? Vamos conversar</span>
              <ArrowUpRight className="text-background w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </a>
            
            {/* Endereço */}
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-3">ENDEREÇO</span>
              <p className="text-muted-foreground text-sm leading-relaxed">Irati, Paraná - Brasil</p>
            </div>
          </div>

          {/* LADO DIREITO */}
          <div className="flex flex-col justify-between lg:border-l lg:border-border lg:pl-16">
            
            {/* Menu de Navegação */}
            <nav className="flex flex-col w-full">
              {['TRABALHOS', 'Services', 'About Us'].map(item => <a key={item} href="#" className="group py-6 border-b border-border flex justify-between items-center hover:pl-2 transition-all duration-300">
                  <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">{item}</span>
                  <ArrowUpRight className="text-muted-foreground w-4 h-4 group-hover:text-foreground transition-colors" />
                </a>)}
            </nav>

            {/* Social Icons */}
            <div className="mt-12 flex justify-start gap-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="text-xl font-bold">Bē</span>
              </a>
            </div>

            {/* Contato */}
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-3">CONTATO</span>
                <a href="mailto:contato@cesardelong.com" className="text-base md:text-lg font-bold hover:text-muted-foreground transition-colors">contato@cesardelong.com</a>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-3">TELEFONE/WHATSAPP</span>
                <a href="https://wa.me/5542999277578" className="text-base md:text-lg font-bold hover:text-muted-foreground transition-colors">(42) 99927-7578</a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto w-full py-6 px-8 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground uppercase tracking-wider">
          <span>© 2025 Delong media house todos os direitos reservados. </span>
        </div>
      </div>
    </footer>;
};
export default Footer;