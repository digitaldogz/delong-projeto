import { supabase } from "@/lib/supabase";

export interface ServiceItem {
  id: string | number;
  slug: string;
  number: string;
  title: string;
  short_description: string;
  full_description: string;
  image: string;
  is_active: boolean;
}

// Fallback estático caso o Supabase falhe
const staticServices: ServiceItem[] = [
  {
    id: 1,
    slug: "filmes-institucionais",
    number: "01",
    title: "Filmes Institucionais",
    short_description: "Produções focadas em contar a história verdadeira da sua marca.",
    full_description: "Trabalhamos com prefeituras, grandes indústrias e empresas para produzir filmes que não apenas informam, mas elevam a reputação corporativa, reforçando autoridade e consolidando um posicionamento estratégico no mercado.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
    is_active: true
  }
];

export const getServices = async (): Promise<ServiceItem[]> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    
    // Se a tabela antiga não tiver slug ainda, a gente cria um provisório na hora
    const formattedData = data?.map(s => ({
      ...s,
      slug: s.slug || s.title.toLowerCase().replace(/ /g, '-')
    }));
    
    if (formattedData && formattedData.length > 0) return formattedData;
    return staticServices;
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    return staticServices;
  }
};

export const getServiceBySlug = async (slug: string): Promise<ServiceItem | null> => {
  try {
    const services = await getServices();
    return services.find(s => s.slug === slug) || null;
  } catch (error) {
    console.error('Erro ao buscar serviço por slug:', error);
    return staticServices.find(s => s.slug === slug) || null;
  }
};
