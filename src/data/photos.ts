import { supabase } from '@/lib/supabase';

export interface PhotoCollection {
  id: number;
  slug: string;
  year: string;
  category: string;
  title: string;
  client: string;
  service: string;
  image: string;
  description: string;
  gallery: string[];
}

// Dados estáticos como fallback
const staticPhotoCollections: PhotoCollection[] = [
  {
    id: 1,
    slug: "inca-divide-peru-2019",
    year: "2019",
    category: "Fotos",
    title: "INCA DIVIDE PERU",
    client: "Inca Divide",
    service: "Cobertura Fotográfica",
    image: "/photos/inca-divide-peru-2019/capa.webp",
    description: "Cobertura fotográfica da dramática corrida Inca Divide no Peru.",
    gallery: [],
  },
  {
    id: 2,
    slug: "world-cup-petropolis-2022",
    year: "2022",
    category: "Fotos",
    title: "WORLD CUP PETRÓPOLIS",
    client: "World Cup",
    service: "Cobertura Fotográfica",
    image: "/photos/world-cup-petropolis-2022/capa.webp",
    description: "Cobertura oficial da etapa brasileira da Copa do Mundo em Petrópolis.",
    gallery: [],
  },
  {
    id: 3,
    slug: "bikingman-franca-2023",
    year: "2023",
    category: "Fotos",
    title: "BIKINGMAN FRANÇA",
    client: "BikingMan",
    service: "Cobertura Fotográfica",
    image: "/photos/bikingman-franca-2023/capa.webp",
    description: "Ultramaratona de ciclismo sem suporte ao redor de regiões montanhosas na França.",
    gallery: [],
  },
  {
    id: 4,
    slug: "world-cup-suica-2023",
    year: "2023",
    category: "Fotos",
    title: "WORLD CUP SUÍÇA",
    client: "World Cup",
    service: "Cobertura Fotográfica",
    image: "/photos/world-cup-suica-2023/capa.webp",
    description: "Registro de alta performance da Copa do Mundo na Suíça.",
    gallery: [],
  },
  {
    id: 5,
    slug: "world-cup-austria-2023",
    year: "2023",
    category: "Fotos",
    title: "WORLD CUP AÚSTRIA",
    client: "World Cup",
    service: "Cobertura Fotográfica",
    image: "/photos/world-cup-austria-2023/capa.webp",
    description: "Imagens exclusivas dos atletas nas pistas exigentes da Áustria.",
    gallery: [],
  },
  {
    id: 6,
    slug: "bikingman-portugal-2023",
    year: "2023",
    category: "Fotos",
    title: "BIKINGMAN PORTUGAL",
    client: "BikingMan",
    service: "Cobertura Fotográfica",
    image: "/photos/bikingman-portugal-2023/capa.webp",
    description: "Desafios extremos e belas paisagens ao longo das rotas de Portugal.",
    gallery: [],
  },
  {
    id: 7,
    slug: "world-cup-republica-tcheca-2023",
    year: "2023",
    category: "Fotos",
    title: "WORLD CUP REPÚBLICA TCHECA",
    client: "World Cup",
    service: "Cobertura Fotográfica",
    image: "/photos/world-cup-republica-tcheca-2023/capa.webp",
    description: "Competição intensa e técnica na clássica pista da República Tcheca.",
    gallery: [],
  },
  {
    id: 8,
    slug: "bikingman-corsica-2023",
    year: "2023",
    category: "Fotos",
    title: "BIKINGMAN CÓRSICA",
    client: "BikingMan",
    service: "Cobertura Fotográfica",
    image: "/photos/bikingman-corsica-2023/capa.webp",
    description: "Exploração visual das rotas impiedosas na ilha da Córsica.",
    gallery: [],
  },
  {
    id: 9,
    slug: "xterra",
    year: "Vários",
    category: "Fotos",
    title: "XTERRA",
    client: "Xterra",
    service: "Cobertura Fotográfica",
    image: "/photos/xterra/capa.webp",
    description: "Etapas Ilhabela, Mangaratiba, Paraty, Tiradentes, Praia do Rosa, Ilha do Mel e Ouro Preto.",
    gallery: [],
  },
  {
    id: 10,
    slug: "ironman-70-3",
    year: "Vários",
    category: "Fotos",
    title: "IRONMAN 70.3",
    client: "Ironman",
    service: "Cobertura Fotográfica",
    image: "/photos/ironman-70-3/capa.webp",
    description: "Etapas icônicas com imagens deslumbrantes no Rio de Janeiro, Maceió e Fortaleza.",
    gallery: [],
  },
  {
    id: 11,
    slug: "avelar-sports",
    year: "Vários",
    category: "Fotos",
    title: "AVELAR SPORTS",
    client: "Avelar Sports",
    service: "Cobertura Fotográfica",
    image: "/photos/avelar-sports/capa.webp",
    description: "Coberturas completas dos eventos esportivos no padrão Avelar Sports.",
    gallery: [],
  },
  {
    id: 12,
    slug: "cimtb",
    year: "Vários",
    category: "Fotos",
    title: "CIMTB",
    client: "CIMTB",
    service: "Cobertura Fotográfica",
    image: "/photos/cimtb/capa.webp",
    description: "Capturando a emoção e a poeira da Copa Internacional de Mountain Bike.",
    gallery: [],
  },
  {
    id: 13,
    slug: "campeonatos-brasileiros-de-mtb",
    year: "Vários",
    category: "Fotos",
    title: "CAMPEONATOS BRASILEIROS DE MTB",
    client: "CBC",
    service: "Cobertura Fotográfica",
    image: "/photos/campeonatos-brasileiros-de-mtb/capa.webp",
    description: "Disputas emocionantes de DH, XC, XCM e ENDURO.",
    gallery: [],
  },
  {
    id: 14,
    slug: "best-of-ensaios",
    year: "Vários",
    category: "Fotos",
    title: "BEST OF ENSAIOS",
    client: "Delong",
    service: "Ensaios Fotográficos",
    image: "/photos/best-of-ensaios/capa.webp",
    description: "Uma seleção com o melhor dos nossos ensaios fotográficos.",
    gallery: [],
  }
];

// Exporta para uso na listagem (estático como fallback)
export const photoCollections = staticPhotoCollections;

/**
 * Busca uma coleção de fotos por slug.
 * Tenta primeiro no Supabase; se falhar, busca nos dados estáticos.
 */
export const getPhotoBySlug = async (slug: string): Promise<PhotoCollection | null> => {
  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return {
        id: data.id,
        slug: data.slug,
        year: data.year || '',
        category: data.category || 'Fotos',
        title: data.title,
        client: data.client || '',
        service: data.service || '',
        image: data.image || '',
        description: data.description || '',
        gallery: data.gallery || [],
      };
    }
  } catch (e) {
    console.warn('Supabase indisponível para photos, usando dados estáticos.');
  }

  // Fallback para dados estáticos
  return staticPhotoCollections.find((p) => p.slug === slug) || null;
};

/**
 * Busca coleções de fotos relacionadas (excluindo a atual).
 */
export const getRelatedPhotos = (currentSlug: string, limit: number = 3): PhotoCollection[] => {
  return staticPhotoCollections.filter((p) => p.slug !== currentSlug).slice(0, limit);
};
