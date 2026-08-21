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
  }
];

export const getPhotos = async (): Promise<PhotoCollection[]> => {
  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    if (data && data.length > 0) return data;
    return staticPhotoCollections;
  } catch (error) {
    console.error('Erro ao buscar fotos:', error);
    return staticPhotoCollections;
  }
};

export const getPhotoBySlug = async (slug: string): Promise<PhotoCollection | null> => {
  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('is_active', true)
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

  return staticPhotoCollections.find((p) => p.slug === slug) || null;
};

export const getRelatedPhotos = async (currentSlug: string, limit: number = 3): Promise<PhotoCollection[]> => {
  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .eq('is_active', true)
      .neq('slug', currentSlug)
      .order('sort_order', { ascending: true })
      .limit(limit);

    if (!error && data) return data;
  } catch (e) {}
  
  return staticPhotoCollections.filter((p) => p.slug !== currentSlug).slice(0, limit);
};
