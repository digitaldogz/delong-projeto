/**
 * Services Page
 * Full list of services with GSAP animations.
 */

import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Produção Audiovisual",
    description: "Criamos conteúdo audiovisual de alta qualidade para marcas que querem se destacar. Desde vídeos institucionais até campanhas publicitárias completas, nossa equipe domina todas as etapas da produção, garantindo resultados que impactam e engajam seu público-alvo.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
  },
  {
    number: "02",
    title: "Cobertura de Eventos",
    description: "Capturamos a essência de cada momento com expertise e criatividade. Desde competições esportivas até eventos corporativos, oferecemos cobertura completa com fotografia profissional, filmagem e transmissão ao vivo, transformando experiências em memórias inesquecíveis.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
  },
  {
    number: "03",
    title: "Gestão de Redes Sociais",
    description: "Desenvolvemos estratégias de conteúdo personalizadas para cada plataforma. Nossa abordagem combina análise de dados, criatividade e consistência para construir comunidades engajadas e fortalecer a presença digital da sua marca em todos os canais relevantes.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop"
  },
  {
    number: "04",
    title: "Branding & Identidade Visual",
    description: "Construímos identidades visuais únicas e memoráveis que comunicam a essência da sua marca. Do logotipo ao manual de marca completo, criamos sistemas visuais coerentes que funcionam em todos os pontos de contato com seu público.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2064&auto=format&fit=crop"
  },
  {
    number: "05",
    title: "Marketing Digital",
    description: "Estratégias integradas de marketing digital focadas em resultados. Combinamos SEO, mídia paga, email marketing e automação para criar campanhas que geram leads qualificados e convertem em vendas, sempre com métricas claras e transparentes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  {
    number: "06",
    title: "Consultoria Criativa",
    description: "Oferecemos consultoria especializada para marcas que buscam inovação. Nossa equipe analisa seu posicionamento atual, identifica oportunidades e desenvolve planos de ação criativos que diferenciam sua marca da concorrência.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  }
];

const ServicesPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  // Hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Masked title slide up
      tl.fromTo(
        ".page-title",
        { yPercent: 100 },
        { yPercent: 0, duration: 1.2 },
        0
      );

      // Description fade in
      tl.fromTo(
        ".page-description",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3
      );

      // CTA button
      tl.fromTo(
        ".page-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.5
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Services list animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".service-item");
      
      items.forEach((item: any) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        });

        // Number fade in
        tl.fromTo(
          item.querySelector(".service-number"),
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
          0
        );

        // Title slide up
        tl.fromTo(
          item.querySelector(".service-title"),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          0.1
        );

        // Description fade in
        tl.fromTo(
          item.querySelector(".service-description"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.2
        );

        // Image reveal with scale
        tl.fromTo(
          item.querySelector(".service-image"),
          { opacity: 0, scale: 1.05, xPercent: 5 },
          { opacity: 1, scale: 1, xPercent: 0, duration: 1, ease: "power3.out" },
          0.15
        );
      });
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
            <div className="overflow-hidden">
              <h1 className="page-title text-7xl md:text-9xl lg:text-[12rem] font-light tracking-tight italic leading-[0.85]">
                Serviços
              </h1>
            </div>
            <div className="max-w-sm md:pt-8">
              <p className="page-description text-muted-foreground text-sm mb-8 leading-relaxed opacity-0">
                Trabalhamos com marcas grandes e pequenas, locais e globais, em uma ampla gama de serviços criativos.
              </p>
              <Link 
                to="/#contato" 
                className="page-cta inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-xs font-medium tracking-widest hover:bg-foreground/90 transition-all opacity-0"
              >
                [ Trabalhe Conosco ]
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div className="w-full">
        <div className="container-premium">
          <div className="w-full h-px bg-border/40" />
        </div>
      </div>

      {/* Services List */}
      <section ref={servicesRef} className="pt-24 pb-32">
        <div className="container-premium">
          {services.map((service) => (
            <article
              key={service.number}
              className="service-item w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-[80px_minmax(0,420px)_minmax(0,1fr)] gap-10 md:gap-16 py-16 md:py-24">
                {/* Number */}
                <div className="md:pt-2">
                  <span className="service-number text-xs text-muted-foreground font-mono opacity-0">{service.number}</span>
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <h2 className="service-title text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] mb-6 opacity-0">
                    {service.title}
                  </h2>
                  <p className="service-description text-muted-foreground text-sm leading-relaxed max-w-md opacity-0">
                    {service.description}
                  </p>
                </div>

                {/* Image */}
                <div className="w-full md:justify-self-end">
                  <div className="service-image relative aspect-[16/9] overflow-hidden w-full max-w-[720px] opacity-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/5" />
                  </div>
                </div>
              </div>

              {/* Divider Line */}
              <div className="w-full h-px bg-border/40" />
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;