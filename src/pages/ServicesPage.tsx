/**
 * Services Page
 * Inspired by zeitmedia.vn/services - clean layout with smooth animations.
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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-title", {
        opacity: 0,
        y: 80,
        duration: 1,
      })
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 24,
            duration: 0.7,
          },
          0.2
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 16,
            duration: 0.5,
          },
          0.4
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Services list animation - individual items on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".service-item");

      items.forEach((item) => {
        const number = item.querySelector(".service-number");
        const title = item.querySelector(".service-title");
        const desc = item.querySelector(".service-desc");
        const image = item.querySelector(".service-image");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            once: true,
          },
        });

        tl.from(number, {
          opacity: 0,
          x: -20,
          duration: 0.5,
        })
          .from(
            title,
            {
              opacity: 0,
              y: 40,
              duration: 0.7,
            },
            0.1
          )
          .from(
            desc,
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
            },
            0.25
          )
          .from(
            image,
            {
              opacity: 0,
              scale: 1.05,
              duration: 0.9,
            },
            0.15
          );
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
              <h1 className="hero-title text-[15vw] md:text-[12vw] lg:text-[10vw] font-light tracking-tight italic leading-[0.9]">
                Services
              </h1>
            </div>

            {/* Description + CTA - Right aligned */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <p className="hero-desc text-muted-foreground text-sm leading-relaxed max-w-sm">
                We work with big and small brands, local and global, across a wide range of creative services.
              </p>
              <Link
                to="/#contato"
                className="hero-cta inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-xs font-medium tracking-widest uppercase hover:bg-foreground/90 transition-all w-fit"
              >
                [ Work with Us ]
              </Link>
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
