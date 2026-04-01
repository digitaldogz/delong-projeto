/**
 * Services Page
 * Inspired by zeitmedia.vn/services - clean layout with smooth animations.
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { useTransitionNavigate } from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Cobertura de Eventos",
    description: "Capturamos a essência de cada momento com expertise e criatividade. Desde competições esportivas até grandes shows e eventos corporativos, oferecemos cobertura completa que transforma a energia e a experiência do ambiente em registros dinâmicos inesquecíveis.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
  },
  {
    number: "02",
    title: "Filmes Institucionais",
    description: "Produções completas focadas em contar a história verdadeira da sua marca. Trabalhamos lado a lado com empresas para produzir filmes que não apenas informam, mas elevam a reputação corporativa, reforçando autoridade e consolidando um posicionamento estratégico no mercado.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
  },
  {
    number: "03",
    title: "Vídeos Publicitários",
    description: "Trazemos o visual requintado do cinema para a publicidade da sua marca. Criamos comerciais, spots e campanhas projetadas com extrema atenção aos detalhes – desde o jogo de luz e direção de arte até a coloração final – visando prender a atenção do público e gerar conversões reais.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop"
  },
  {
    number: "04",
    title: "Fotografia Profissional",
    description: "A essência de tudo começa aqui. Realizamos ensaios fotográficos de altíssimo nível, foto produto, arquitetura e cobertura fotográfica VIP para marcas que precisam de imagens impactantes, entregando arquivos tratados prontos para estampar publicações, outdoors e campanhas completas.",
    image: "https://images.unsplash.com/photo-1554046920-90cca97ec3a2?q=80&w=2072&auto=format&fit=crop"
  },
  {
    number: "05",
    title: "Produção de Sites",
    description: "A presença digital da sua marca começa com uma estrutura sólida. Desenvolvemos sites institucionais, hotsites de eventos e páginas de alta performance totalmente responsivos e personalizados. Combinamos design inovador com velocidade impecável para ser o palco perfeito do seu conteúdo audiovisual.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  }
];

const ServicesPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const navigateWithTransition = useTransitionNavigate();

  // Hero entrance - apenas descrição e CTA com fade leve, título fixo
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-desc", {
        opacity: 0,
        y: 12,
        duration: 0.4,
      }).from(
        ".hero-cta",
        {
          opacity: 0,
          y: 8,
          duration: 0.3,
        },
        0.15
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Services list - um fade único por item, sem animações complexas
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".service-item", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
      });
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero Section - Zeit Media style */}
      <section ref={heroRef} className="pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            {/* Title - Full width on mobile, spans 8 cols on desktop */}
            <div className="lg:col-span-8">
              <h1 className="hero-title text-[15vw] md:text-[12vw] lg:text-[8vw] xl:text-[7vw] font-light tracking-tight italic leading-[0.9]">
                Serviços
              </h1>
            </div>

            {/* Description + CTA - Right aligned */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <p className="hero-desc text-muted-foreground text-sm leading-relaxed max-w-sm">
                Trabalhamos com marcas grandes e pequenas, locais e globais, em uma ampla gama de serviços criativos.
              </p>
              <button
                onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
                className="hero-cta inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-xs font-medium tracking-widest uppercase hover:bg-foreground/90 transition-all w-fit cursor-pointer"
              >
                [ Trabalhe Conosco ]
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Divider line after hero - full width */}
      <div className="w-full border-t border-foreground/20" />

      {/* Services List */}
      <section ref={servicesRef}>
        <div className="container-premium">
          {services.map((service, index) => (
            <article key={service.number} className="service-item">
              {/* Content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-20 md:py-28">
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="service-number text-sm text-muted-foreground/60 font-mono">
                    {service.number}
                  </span>
                </div>

                {/* Text Content */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <h2 className="service-title text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1]">
                    {service.title}
                  </h2>
                  <p className="service-desc text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Image */}
                <div className="lg:col-span-7 lg:col-start-6">
                  <div className="service-image relative aspect-[16/10] overflow-hidden w-full">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              </div>

              {/* Divider line after each service */}
              <div className="w-full border-t border-foreground/20" />
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
