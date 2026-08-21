/**
 * Services Page
 * Inspired by zeitmedia.vn/services - clean layout with smooth animations.
 */

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { CaseLink, useTransitionNavigate } from "@/components/PageTransition";
import { getServices, ServiceItem } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const navigateWithTransition = useTransitionNavigate();
  const [servicesData, setServicesData] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca dados
  useLayoutEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServicesData(data);
      setLoading(false);
    };
    fetchServices();
  }, []);

  // Hero entrance
  useLayoutEffect(() => {
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

  // Services list animations (dependem do carregamento)
  useLayoutEffect(() => {
    if (loading || servicesData.length === 0) return;
    
    const ctx = gsap.context(() => {
      // Inicia todos os itens como invisíveis instantaneamente para não piscar
      gsap.set(".service-item", { opacity: 0, y: 30 });

      ScrollTrigger.batch(".service-item", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "all" // Limpa as props no final para evitar bugs futuros
          });
        },
      });
    }, servicesRef);

    return () => ctx.revert();
  }, [loading, servicesData]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div className="lg:col-span-8">
              <h1 className="hero-title text-[15vw] md:text-[12vw] lg:text-[8vw] xl:text-[7vw] font-light tracking-tight italic leading-[0.9]">
                Serviços
              </h1>
            </div>

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

      <div className="w-full border-t border-foreground/20" />

      {/* Services List */}
      <section ref={servicesRef}>
        <div className="container-premium">
          {loading ? (
            <div className="py-20 flex justify-center">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Carregando serviços...</span>
            </div>
          ) : (
            servicesData.map((service, index) => (
              <article key={service.id} className="service-item group relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-20 md:py-28">
                  
                  {/* Number */}
                  <div className="lg:col-span-1">
                    <span className="service-number text-sm text-muted-foreground/60 font-mono">
                      {service.number}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    <h2 className="service-title text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] transition-colors group-hover:text-muted-foreground">
                      {service.title}
                    </h2>
                    <p className="service-desc text-muted-foreground text-sm leading-relaxed">
                      {service.full_description}
                    </p>
                    
                    {/* Link / Button */}
                    <div className="mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                      <CaseLink 
                        to={service.slug === 'fotografia-profissional' ? '/fotos' : `/servicos/${service.slug}`} 
                        className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest border-b border-transparent group-hover:border-foreground transition-all pb-0.5"
                      >
                        {service.slug === 'fotografia-profissional' ? 'Ver Galerias' : 'Ver detalhes'}
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 transform group-hover:translate-x-1 transition-transform">
                          <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </CaseLink>
                    </div>
                  </div>

                  {/* Image or Video */}
                  <div className="lg:col-span-7 lg:col-start-6">
                    <CaseLink 
                      to={service.slug === 'fotografia-profissional' ? '/fotos' : `/servicos/${service.slug}`} 
                      className="block service-image relative aspect-[16/10] overflow-hidden w-full cursor-pointer"
                    >
                      {service.image.match(/\.(mp4|webm|mov)$/i) || service.image.includes('bunny') ? (
                        <video
                          src={service.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading={index < 2 ? "eager" : "lazy"}
                        />
                      )}
                    </CaseLink>
                  </div>
                </div>

                {/* Divider line after each service */}
                <div className="w-full border-t border-foreground/20" />
              </article>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
