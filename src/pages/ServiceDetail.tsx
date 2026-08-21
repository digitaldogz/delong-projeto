import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { getServiceBySlug, ServiceItem } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);

    const fetchService = async () => {
      if (slug) {
        const data = await getServiceBySlug(slug);
        setService(data);
      }
      setLoading(false);
    };

    fetchService();
  }, [slug]);

  useEffect(() => {
    if (loading || !service) return;

    const ctx = gsap.context(() => {
      // Hero animations
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      tl.from(".service-number", { opacity: 0, y: 20, duration: 0.6 })
        .from(".service-title", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
        .from(".service-image-container", { opacity: 0, y: 40, duration: 1 }, "-=0.6");

      // Content animations on scroll
      gsap.from(".service-description", {
        scrollTrigger: {
          trigger: ".service-description",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });
    }, [heroRef, contentRef]);

    return () => ctx.revert();
  }, [service, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Carregando...</span>
      </div>
    );
  }

  if (!service) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="container-premium">
          <Link to="/servicos" className="inline-flex items-center text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-12">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 transform rotate-180">
              <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
            Voltar para Serviços
          </Link>

          <div className="max-w-4xl">
            <span className="service-number block text-sm font-mono text-muted-foreground mb-4">
              {service.number}
            </span>
            <h1 className="service-title text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tight leading-[1] mb-8">
              {service.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Featured Media */}
      <section className="service-image-container px-4 md:px-8 mb-20 md:mb-32">
        <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden bg-muted">
          {service.image.match(/\.(mp4|webm|mov)$/i) || service.image.includes('bunny') ? (
            <video
              src={service.image}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="pb-32">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground border-b border-foreground/20 pb-4 inline-block">
                O Serviço
              </h3>
            </div>
            
            <div className="lg:col-span-8 lg:col-start-5">
              <div className="service-description text-xl md:text-3xl leading-relaxed font-light mb-16">
                {service.full_description}
              </div>
              
              <div className="flex flex-col gap-6">
                <p className="text-muted-foreground leading-relaxed">
                  Trabalhamos de forma consultiva e personalizada para entregar exatamente o que o seu negócio precisa para crescer e se destacar. Fale conosco para desenharmos uma proposta alinhada aos seus objetivos.
                </p>
                
                <a 
                  href="https://wa.me/5500000000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-foreground/90 transition-all w-fit mt-8"
                >
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
