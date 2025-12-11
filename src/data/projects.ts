export interface Project {
  id: number;
  slug: string;
  year: string;
  category: string;
  title: string;
  client: string;
  service: string;
  image: string;
  description: string;
  fullDescription: string;
  videoUrl?: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "exhibition-public-security",
    year: "2025",
    category: "Events",
    title: "EXHIBITION THE PUBLIC SECURITY",
    client: "Ministry of Public Security",
    service: "Events / Production",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    description: "Comissionado pelo Ministério da Segurança Pública para a exibição '80 Anos de Jornada Pela Independência'. A Zeit (Delong) projetou um espaço experiencial em larga escala no Centro de Exibições do Vietnã.",
    fullDescription: "Em 20.000m², engajamos visitantes diretamente com divisões especializadas através de atividades interativas, displays de equipamentos e demonstrações, refletindo a disciplina da força e sua modernização.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-large-crowd-of-people-at-a-concert-462-large.mp4",
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    slug: "vinfast-fierce-spirit",
    year: "2025",
    category: "VinFast",
    title: "VINFAST EXHIBITION 'THE FIERCE SPIRIT'",
    client: "VinFast Global",
    service: "Events / Branding",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
    description: "Uma experiência imersiva de marca para o lançamento global da VinFast, destacando a inovação e o espírito pioneiro da montadora vietnamita.",
    fullDescription: "O evento reuniu líderes da indústria automotiva e mídia internacional para celebrar a expansão global da VinFast com uma apresentação multissensorial única.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-highway-at-night-4305-large.mp4",
    gallery: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    slug: "hanoi-convention",
    year: "2025",
    category: "Events",
    title: "HANOI CONVENTION",
    client: "Ministry of Public Security",
    service: "Events / Production",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
    description: "Convenção internacional realizada em Hanói reunindo delegações de mais de 50 países para discussões sobre segurança global.",
    fullDescription: "Um evento de três dias com painéis, workshops e networking, projetado para facilitar a cooperação internacional em segurança pública.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-people-walking-in-a-busy-street-1284-large.mp4",
    gallery: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    slug: "campaign-we-got-you",
    year: "2025",
    category: "Marketing",
    title: "CAMPAIGN 'WE GOT YOU'",
    client: "Digital Trust Alliance",
    service: "Marketing / Digital",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1973&auto=format&fit=crop",
    description: "Campanha digital multicanal focada em construir confiança e segurança no ambiente digital para consumidores e empresas.",
    fullDescription: "A campanha alcançou mais de 10 milhões de pessoas através de redes sociais, TV e mídia digital, estabelecendo novos padrões de comunicação sobre segurança cibernética.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-2598-large.mp4",
    gallery: [
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=1973&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=2074&auto=format&fit=crop"
    ]
  },
  {
    id: 5,
    slug: "brave-warrior",
    year: "2025",
    category: "Production",
    title: "REALITY TV SHOW: THE BRAVE WARRIOR",
    client: "Ministry of Public Security",
    service: "Production / TV",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop",
    description: "Reality show que acompanha o treinamento intensivo de candidatos a forças especiais, revelando os desafios físicos e mentais da profissão.",
    fullDescription: "Produção de 12 episódios com equipe de mais de 100 profissionais, capturando momentos autênticos de superação e camaradagem.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-running-through-a-sand-dune-1141-large.mp4",
    gallery: [
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: 6,
    slug: "msb-private-concert",
    year: "2025",
    category: "Events",
    title: "MSB PRIVATE CONCERT",
    client: "MSB Bank",
    service: "Events / Entertainment",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770&auto=format&fit=crop",
    description: "Concerto exclusivo para clientes VIP do MSB Bank, apresentando artistas internacionais em uma noite memorável.",
    fullDescription: "Evento para 500 convidados selecionados com produção de palco de última geração, catering premium e experiências personalizadas.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-concert-4306-large.mp4",
    gallery: [
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1459749411177-0473ef71607b?q=80&w=2070&auto=format&fit=crop"
    ]
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getRelatedProjects = (currentSlug: string, limit: number = 3): Project[] => {
  return projects.filter(p => p.slug !== currentSlug).slice(0, limit);
};
