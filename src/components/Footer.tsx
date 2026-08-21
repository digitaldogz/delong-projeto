/**
 * Footer Component
 * Site-wide footer with contact info and navigation.
 */

import { ArrowUpRight, Instagram, Facebook } from "lucide-react";
import { useTransitionNavigate } from "@/components/PageTransition";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const menuItems = [
  { label: 'PROJETOS', path: '/projetos' },
  { label: 'SERVIÇOS', path: '/servicos' },
  { label: 'QUEM SOMOS', path: '/sobre' },
];

const Footer = () => {
  const navigateWithTransition = useTransitionNavigate();
  const { config } = useSiteConfig();

  const handleNavClick = (path: string) => {
    navigateWithTransition(path);
  };

  return <footer id="footer" className="w-full bg-background text-foreground border-t border-border">
      <div className="container-premium">
        
        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 py-12 md:py-24">
          
          {/* LADO ESQUERDO */}
          <div className="flex flex-col justify-between gap-12">
            {/* Identidade */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">A arte move tudo</h3>
              <p className="text-muted-foreground max-w-md leading-relaxed">Moldamos histórias de sucesso com ideias inovadoras e domínio técnico, elevando o padrão da sua marca e colocando você à frente da concorrência.</p>
            </div>

            {/* CTA Box */}
            <a href={`https://wa.me/${config.whatsapp_number}`} target="_blank" rel="noreferrer" className="group block w-full max-w-md bg-foreground hover:bg-foreground/90 transition-colors py-6 px-8 flex justify-between items-center">
              <span className="text-base md:text-xl font-bold text-background tracking-tight">Tem um projeto? Vamos conversar</span>
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
              {menuItems.map(item => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path)}
                  className="group py-6 border-b border-border flex justify-between items-center hover:pl-2 transition-all duration-300 cursor-pointer w-full text-left"
                >
                  <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">{item.label}</span>
                  <ArrowUpRight className="text-muted-foreground w-4 h-4 group-hover:text-foreground transition-colors" />
                </button>
              ))}
            </nav>

            {/* Social Icons */}
            <div className="mt-12 flex justify-start gap-8">
              <a href={config.instagram_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram size={24} />
              </a>
              <a href={`https://wa.me/${config.whatsapp_number}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
            </div>

            {/* Contato */}
            <div className="mt-12 flex flex-col md:grid md:grid-cols-2 gap-8">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-3">CONTATO</span>
                <a href={`mailto:${config.contact_email}`} className="text-base md:text-lg font-bold hover:text-muted-foreground transition-colors">{config.contact_email}</a>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-3">TELEFONE/WHATSAPP</span>
                <a href={`https://wa.me/${config.whatsapp_number}`} className="text-base md:text-lg font-bold hover:text-muted-foreground transition-colors">{config.whatsapp_number}</a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-border">
        <div className="container-premium py-6 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground uppercase tracking-wider">
          <span>© {new Date().getFullYear()} Delong media house todos os direitos reservados. </span>
        </div>
      </div>
    </footer>;
};
export default Footer;