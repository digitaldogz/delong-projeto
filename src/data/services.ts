import { supabase } from '@/lib/supabase';

export interface ServiceItem {
  id: number;
  number: string;
  title: string;
  short_description: string;
  full_description: string;
  image: string;
  sort_order: number;
}

export const getServices = async (): Promise<ServiceItem[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Erro ao buscar serviços:', error);
    return [];
  }

  return data || [];
};
