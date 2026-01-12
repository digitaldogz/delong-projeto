import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="footer" className="w-full bg-black text-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        
        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 py-20 md:py-28">
          
          {/* LADO ESQUERDO */}
          <div className="flex flex-col gap-8 pr-0 lg:pr-16">
            <h3 className="text-4xl md:text-[2.5rem] font-bold tracking-tight leading-tight">
              Art Comes First
            </h3>
            <p className="text-white/60 max-w-[40ch] leading-relaxed text-base">
              Moldamos histórias de sucesso com ideias inovadoras e domínio técnico, elevando o padrão da sua marca e colocando você à frente da concorrência.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-6 mt-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* LADO DIREITO - separado por linha vertical */}
          <div className="flex flex-col justify-start border-t lg:border-t-0 lg:border-l border-white/10 pt-12 lg:pt-0 lg:pl-16 mt-12 lg:mt-0">
            
            {/* Menu de Navegação */}
            <nav className="flex flex-col w-full">
              <Link 
                to="/projetos" 
                className="group py-5 border-b border-white/10 flex justify-between items-center hover:pl-2 transition-all duration-300"
              >
                <span className="text-sm font-medium text-white/80 uppercase tracking-widest group-hover:text-white transition-colors">
                  WORKS
                </span>
                <ArrowUpRight className="text-white/40 w-4 h-4 group-hover:text-white transition-colors" />
              </Link>
              <Link 
                to="/servicos" 
                className="group py-5 border-b border-white/10 flex justify-between items-center hover:pl-2 transition-all duration-300"
              >
                <span className="text-sm font-medium text-white/80 uppercase tracking-widest group-hover:text-white transition-colors">
                  SERVICES
                </span>
                <ArrowUpRight className="text-white/40 w-4 h-4 group-hover:text-white transition-colors" />
              </Link>
              <Link 
                to="/sobre" 
                className="group py-5 border-b border-white/10 flex justify-between items-center hover:pl-2 transition-all duration-300"
              >
                <span className="text-sm font-medium text-white/80 uppercase tracking-widest group-hover:text-white transition-colors">
                  ABOUT US
                </span>
                <ArrowUpRight className="text-white/40 w-4 h-4 group-hover:text-white transition-colors" />
              </Link>
            </nav>

            {/* Contato */}
            <div className="mt-12 space-y-6">
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">CONTATO</span>
                <a href="mailto:contato@cesardelong.com" className="text-sm font-medium hover:text-white/70 transition-colors">
                  contato@cesardelong.com
                </a>
              </div>
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">TELEFONE</span>
                <a href="https://wa.me/5542999277578" className="text-sm font-medium hover:text-white/70 transition-colors">
                  (42) 99927-7578
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 uppercase tracking-wider">
          <span>© 2025 Delong Media House. Todos os direitos reservados.</span>
          <span className="mt-2 md:mt-0">Irati, Paraná - Brasil</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
