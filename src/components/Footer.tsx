import React from 'react';
import { ArrowUpRight, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-8 md:px-12 grid grid-cols-1 lg:grid-cols-2">
        
        {/* LADO ESQUERDO: Identidade e Botão Gigante */}
        <div className="py-8 md:py-16 lg:py-24 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between min-h-[500px]">
          <div>
            <h3 className="text-3xl font-bold tracking-tight mb-2">Art Comes First.</h3>
            <p className="text-muted-foreground max-w-md">
              We define the cutting edge of creative culture through bold ideas and flawless execution.
            </p>
          </div>

          <div className="mt-12 lg:mt-0">
            <a 
              href="#" 
              className="group block w-full bg-foreground hover:bg-foreground/90 transition-colors py-8 px-6 md:px-10 flex justify-between items-center"
            >
              <span className="text-xl md:text-3xl font-bold text-background tracking-tight group-hover:translate-x-2 transition-transform">
                Got a Project? <br/> Let's Talk.
              </span>
              <ArrowUpRight className="text-background w-8 h-8 md:w-12 md:h-12 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform" />
            </a>
            
            <div className="mt-12">
              <span className="text-xs text-muted-foreground/60 uppercase tracking-widest block mb-2">Vietnam Office</span>
              <p className="text-muted-foreground text-sm">
                123 Creative Avenue, District 1,<br/>
                Ho Chi Minh City, Vietnam.
              </p>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: Links e Social */}
        <div className="py-8 md:py-16 lg:py-24 flex flex-col justify-between">
          
          {/* Menu de Navegação */}
          <nav className="flex flex-col w-full">
            {['Works', 'Services', 'About Us', 'Careers'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="group py-6 border-b border-border flex justify-between items-center hover:pl-4 transition-all duration-300"
              >
                <span className="text-2xl md:text-3xl font-medium text-foreground group-hover:text-muted-foreground">{item}</span>
                <ArrowUpRight className="text-muted-foreground group-hover:text-foreground opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            ))}
          </nav>

          {/* Social e Contato */}
          <div className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            
            {/* Redes Sociais */}
            <div className="flex gap-6">
              {[Instagram, Facebook, Linkedin, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 border border-border rounded-full flex items-center justify-center hover:bg-foreground hover:text-background transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Contato Direto */}
            <div className="text-left md:text-right">
              <a href="mailto:hello@zeitmedia.com" className="block text-lg font-bold hover:text-muted-foreground transition-colors">
                hello@zeitmedia.com
              </a>
              <a href="tel:+84901234567" className="block text-muted-foreground hover:text-foreground transition-colors">
                +84 90 123 4567
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="max-w-7xl mx-auto w-full border-t border-border py-6 px-8 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground/60 uppercase tracking-wider">
        <span>© 2025 ZEIT MEDIA. All rights reserved.</span>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
