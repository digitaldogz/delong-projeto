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

  return (
    <footer id="footer" className="w-full bg-background text-foreground border-t border-border">
      <div className="container-premium py-12 md:py-24">
        
        {/* TOP SECTION: Title and Paragraph */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          <div className="max-w-md">
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">A arte move tudo</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Moldamos histórias de sucesso com ideias inovadoras e domínio técnico, elevando o padrão da sua marca e colocando você à frente da concorrência.
            </p>
          </div>
          {/* Desktop CTA (Hidden on mobile to match screenshot) */}
          <div className="hidden md:block">
            <a href={`https://wa.me/${config.whatsapp_number}`} target="_blank" rel="noreferrer" className="group flex bg-foreground text-background py-6 px-8 items-center justify-between min-w-[300px] hover:bg-foreground/90 transition-colors">
              <span className="font-bold tracking-tight">Tem um projeto? Vamos conversar</span>
              <ArrowUpRight className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* MIDDLE SECTION: Navigation Links (2 columns like reference) */}
        <nav className="grid grid-cols-2 border-t border-border">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => navigateWithTransition(item.path)}
              className={`group py-6 flex justify-between items-center hover:pl-2 transition-all duration-300 cursor-pointer border-b border-border ${index % 2 === 0 ? 'pr-4 border-r border-border' : 'pl-4'}`}
            >
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors">{item.label}</span>
              <ArrowUpRight className="text-muted-foreground w-4 h-4 group-hover:text-foreground transition-colors" />
            </button>
          ))}
        </nav>

        {/* SOCIAL ICONS (Centered like reference) */}
        <div className="flex justify-center md:justify-start gap-12 py-12 border-b border-border">
          <a href={config.instagram_url} target="_blank" rel="noreferrer" className="text-foreground hover:text-white/70 transition-colors">
            <Instagram size={28} />
          </a>
          <a href={`https://wa.me/${config.whatsapp_number}`} target="_blank" rel="noreferrer" className="text-foreground hover:text-white/70 transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>
        </div>

        {/* BOTTOM SECTION: Contact Info Stacked (Like Reference) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div>
            <span className="text-xs text-muted-foreground block mb-2">Endereço</span>
            <p className="text-sm font-medium leading-relaxed">Irati, Paraná, Brasil<br/>Rua 19 de Dezembro, 123</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block mb-2">Contato</span>
            <a href={`mailto:${config.contact_email}`} className="text-xl md:text-2xl font-light hover:text-muted-foreground transition-colors">{config.contact_email}</a>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block mb-2">WhatsApp / Telefone</span>
            <a href={`https://wa.me/${config.whatsapp_number}`} className="text-xl md:text-2xl font-light hover:text-muted-foreground transition-colors">{config.whatsapp_number}</a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-border">
        <div className="container-premium py-6 flex flex-col justify-center text-[10px] md:text-xs text-foreground uppercase tracking-wider font-bold">
          <span>© {new Date().getFullYear()} DELONG MEDIA HOUSE. TODOS OS DIREITOS RESERVADOS.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
