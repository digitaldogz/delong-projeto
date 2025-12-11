import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    size: "large",
    slug: "hanoi-convention",
    title: "HANOI CONVENTION",
    client: "Ministry of Public Security",
    year: "2025",
    category: "Events",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2600&auto=format&fit=crop"
  },
  {
    id: 2,
    size: "large",
    slug: "brave-warrior",
    title: "THE BRAVE WARRIOR",
    client: "Reality TV Show",
    year: "2025",
    category: "Production",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: 3,
    size: "small",
    slug: "msb-private-concert",
    title: "SOUL OF THE NATION",
    client: "MSB Bank",
    year: "2025",
    category: "Events",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    size: "small",
    slug: "exhibition-public-security",
    title: "RED STAGE LIVE",
    client: "Viettel",
    year: "2025",
    category: "Events",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    size: "small",
    slug: "vinfast-fierce-spirit",
    title: "BLUE HORIZON",
    client: "VietinBank",
    year: "2025",
    category: "Production",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    size: "small",
    slug: "campaign-we-got-you",
    title: "VICTORY PATH",
    client: "Gov",
    year: "2025",
    category: "Events",
    image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop"
  }
];

const SelectedCases = () => {
  return (
    <section className="w-full bg-background px-6 md:px-12 py-24 border-t border-border">
      
      {/* Cabeçalho da Seção */}
      <div className="mb-16">
        <span className="text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase flex items-center gap-2 mb-4">
          <span className="w-1 h-1 bg-foreground rounded-full"></span>
          Our Works
        </span>
        <h2 className="text-5xl md:text-7xl font-medium text-foreground tracking-tight">
          Selected Cases
        </h2>
      </div>

      {/* GRID DE PROJETOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        
        {projects.map((project) => (
          <Link 
            key={project.id}
            to={`/projeto/${project.slug}`}
            className={`group cursor-pointer flex flex-col gap-4 ${
              project.size === 'large' ? 'md:col-span-1 lg:col-span-2' : 'col-span-1'
            }`}
          >
            {/* Container da Imagem com Zoom no Hover */}
            <div className="relative w-full overflow-hidden aspect-[16/9] bg-secondary">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              
              {/* Overlay "View Case" */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/20 backdrop-blur-[2px]">
                <div className="bg-foreground/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 border border-foreground/20">
                  <span className="text-xs font-bold text-foreground uppercase tracking-widest">View Case</span>
                  <ArrowUpRight className="w-4 h-4 text-foreground" />
                </div>
              </div>
            </div>

            {/* Informações do Projeto */}
            <div className="flex justify-between items-start border-t border-border pt-4">
               <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground uppercase leading-tight mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {project.client}
                  </p>
               </div>
               
               <div className="text-right">
                 <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
                   {project.category}
                 </span>
                 <span className="block text-xs text-muted-foreground/60 font-mono">
                   {project.year}
                 </span>
               </div>
            </div>
          </Link>
        ))}

      </div>
      
      {/* Botão de Ver Todos */}
      <div className="mt-20 flex justify-center">
        <Link to="/projetos" className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-border pb-1 hover:text-primary hover:border-primary transition-colors">
          View All Projects
        </Link>
      </div>

    </section>
  );
};

export default SelectedCases;
