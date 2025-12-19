import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';

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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tight italic"
            >
              Serviços
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-md"
            >
              <p className="text-muted-foreground text-sm mb-6">
                Trabalhamos com marcas grandes e pequenas, locais e globais, em uma ampla gama de serviços criativos.
              </p>
              <Link 
                to="/#contato" 
                className="inline-flex items-center gap-2 border border-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
              >
                Trabalhe conosco
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          {services.map((service, index) => (
            <motion.div 
              key={service.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 py-16 md:py-24 border-t border-border/30"
            >
              {/* Text Content */}
              <div className="flex flex-col justify-center order-2 md:order-1">
                <span className="text-xs text-muted-foreground font-mono mb-4">{service.number}</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  {service.title}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
                  {service.description}
                </p>
              </div>

              {/* Image */}
              <div className="order-1 md:order-2">
                <motion.div 
                  className="relative aspect-[4/3] overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/10" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 border-t border-border/30">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">A Arte Vem Primeiro</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Moldamos narrativas distintas com ideias inovadoras e maestria criativa, colocando você à frente da concorrência.
              </p>
            </div>
            <Link 
              to="/#contato" 
              className="inline-flex items-center gap-3 border border-foreground px-8 py-4 text-sm font-bold hover:bg-foreground hover:text-background transition-all group"
            >
              Tem um projeto? Vamos conversar
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
