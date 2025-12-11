import React from 'react';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "Events",
    description: "Concepção e produção de grandes festivais, lançamentos de produtos e convenções corporativas imersivas.",
    image: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Integrated Marketing",
    description: "Campanhas 360º que unem o mundo físico e digital para criar narrativas de marca consistentes.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Creative Design",
    description: "Direção de arte, branding e motion graphics que definem a identidade visual do futuro.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Production",
    description: "Filmes publicitários e documentais com estética cinematográfica e storytelling poderoso.",
    image: "https://images.unsplash.com/photo-1601506521937-2462031a92e6?q=80&w=1000&auto=format&fit=crop"
  }
];

const ServicesList = () => {
  return (
    <section className="w-full bg-background py-20 px-6 md:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* COLUNA ESQUERDA: Lista de Texto */}
        <div className="w-full lg:w-1/2 flex flex-col gap-24 py-12">
          {services.map((service) => (
            <div key={service.id} className="group flex flex-col gap-4 border-l-2 border-border pl-8 hover:border-foreground transition-colors duration-500">
              <span className="text-sm font-mono text-muted-foreground">/{service.id}</span>
              <h3 className="text-4xl md:text-5xl font-bold text-foreground group-hover:text-destructive transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* COLUNA DIREITA: Imagem Sticky (Fixa) */}
        <div className="w-full lg:w-1/2 hidden lg:block relative">
          <div className="sticky top-24 h-[600px] w-full overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
               alt="Services Atmosphere"
               className="w-full h-full object-cover filter brightness-75 hover:scale-105 transition-transform duration-700"
             />
             
             {/* Overlay Decorativo */}
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
             
             <div className="absolute bottom-8 left-8">
                <div className="bg-foreground/10 backdrop-blur-md px-4 py-2 rounded-full border border-foreground/20 inline-flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground uppercase">Explore Services</span>
                  <ArrowRight size={14} className="text-foreground"/>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesList;
