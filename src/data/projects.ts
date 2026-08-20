import { supabase } from '@/lib/supabase';

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
  youtubeId?: string;
  bunnyVideo?: {
    libraryId: string;
    videoId: string;
  };
  videoUrl?: string;
  videoUrl2?: string;
  hoverVideoUrl?: string;
  videoOrientation?: string;
  gallery: string[];
}

// Dados estáticos como fallback (caso Supabase esteja indisponível)
const staticProjects: Project[] = [
  {
    id: 1,
    slug: "expo-irati-2024",
    year: "2024",
    category: "Evento",
    title: "DOCUMENTÁRIO EXPO IRATI 2024",
    client: "Prefeitura de Irati",
    service: "Eventos / Produção",
    image: "/projects/eventos/capa24EXPO01043.jpg",
    description:
      "Comissionado pela Prefeitura Municipal de Irati, este documentário é o registro definitivo da ExpoIrati 2024. Nossa produção mobilizou uma estrutura técnica avançada para capturar a magnitude do evento, equilibrando a precisão do agronegócio com a energia dos grandes espetáculos. O resultado é uma narrativa audiovisual que não apenas documenta números, mas preserva a identidade cultural e o crescimento econômico da região em uma obra de alto impacto técnico e institucional.",
    fullDescription:
      "Capturamos a essência e a energia da maior feira do Centro-Sul no documentário oficial da ExpoIrati 2024.",
    videoUrl: "/projects/expo-irati-2024/DOCUMENTARY_EXPO-001-006.mp4",
    gallery: [
      "/projects/eventos/24EXPO00973.jpg",
      "/projects/eventos/24EXPO00988.jpg",
      "/projects/eventos/24EXPO01484.jpg",
      "/projects/eventos/24EXPO01378.jpg",
      "/projects/eventos/24EXPO01654.jpg",
    ],
  },
  {
    id: 2,
    slug: "institucional-prefeitura-irati",
    year: "2024",
    category: "Institucional",
    title: "PREFEITURA DE IRATI",
    client: "Prefeitura de Irati",
    service: "Institucional / Vídeo",
    image: "/projects/institucional-prefeitura-irati/capa.jpg",
    description: "Vídeo institucional horizontal para a Prefeitura de Irati.",
    fullDescription: "Produção de vídeo institucional destacando as ações e o desenvolvimento na cidade de Irati.",
    videoUrl: "/projects/institucional-prefeitura-irati/video.mp4",
    hoverVideoUrl: "/projects/institucional-prefeitura-irati/hover.mp4",
    gallery: [],
  },
  {
    id: 3,
    slug: "aciai-institucional",
    year: "2024",
    category: "Institucional",
    title: "ACIAI",
    client: "ACIAI",
    service: "Institucional / Vídeo",
    image: "/projects/aciai-institucional/capa.jpg",
    description: "Vídeo institucional focado no fortalecimento do comércio e indústria local.",
    fullDescription: "Apresentação institucional horizontal produzida para a Associação Comercial e Empresarial de Irati.",
    videoUrl: "/projects/aciai-institucional/video.mp4",
    gallery: [],
  },
];

// Cache em memória para projetos do Supabase
let projectsCache: Project[] | null = null;

/**
 * Converte um registro do Supabase para o formato Project
 */
const mapSupabaseToProject = (data: any): Project => ({
  id: data.id,
  slug: data.slug,
  year: data.year || '',
  category: data.category || '',
  title: data.title,
  client: data.client || '',
  service: data.service || '',
  image: data.image || '',
  description: data.description || '',
  fullDescription: data.full_description || '',
  videoUrl: data.video_url || undefined,
  videoUrl2: data.video_url2 || undefined,
  hoverVideoUrl: data.hover_video_url || undefined,
  videoOrientation: data.video_orientation || 'horizontal',
  gallery: data.gallery || [],
});

/**
 * Busca todos os projetos do Supabase (com cache).
 * Faz fallback para dados estáticos se der erro.
 */
export const getProjects = async (): Promise<Project[]> => {
  if (projectsCache) return projectsCache;

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      projectsCache = data.map(mapSupabaseToProject);
      return projectsCache;
    }
  } catch (e) {
    console.warn('Supabase indisponível para projects, usando dados estáticos.');
  }

  return staticProjects;
};

/**
 * Busca um projeto por slug. Tenta Supabase primeiro, fallback estático.
 */
export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return mapSupabaseToProject(data);
    }
  } catch (e) {
    console.warn('Supabase indisponível, buscando projeto estático.');
  }

  // Fallback estático
  return staticProjects.find((p) => p.slug === slug) || null;
};

/**
 * Busca projetos relacionados (excluindo o atual).
 */
export const getRelatedProjects = async (currentSlug: string, limit: number = 3): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .neq('slug', currentSlug)
      .order('sort_order', { ascending: true })
      .limit(limit);

    if (!error && data && data.length > 0) {
      return data.map(mapSupabaseToProject);
    }
  } catch (e) {
    console.warn('Supabase indisponível para projetos relacionados.');
  }

  return staticProjects.filter((p) => p.slug !== currentSlug).slice(0, limit);
};

// Exporta para uso síncrono na listagem (fallback estático para compatibilidade)
export const projects = staticProjects;
