import { supabase } from '@/lib/supabase';

// Tipo que mapeia o que esperamos baseados na seção
export interface SiteSettings {
  [key: string]: string;
}

// Objeto para cache simples
let settingsCache: SiteSettings | null = null;

/**
 * Busca todas configuracoes da tabela site_settings
 * Opcionalmente filtrar por secao para ser mais eficiente
 */
export const getSiteSettings = async (section?: string): Promise<SiteSettings> => {
  // Retorna do cache se já buscou tudo antes (pra não ficar pingando no banco toda hora)
  if (!section && settingsCache) {
    return settingsCache;
  }

  let query = supabase.from('site_settings').select('key, value');
  
  if (section) {
    query = query.eq('section', section);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Erro ao buscar configurações do site:', error);
    return {};
  }

  const settings: SiteSettings = {};
  if (data) {
    data.forEach(item => {
      settings[item.key] = item.value;
    });
  }

  // Se buscou tudo, guarda no cache
  if (!section) {
    settingsCache = settings;
  }

  return settings;
};
