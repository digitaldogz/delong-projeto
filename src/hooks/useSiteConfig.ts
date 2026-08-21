import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface SiteConfig {
  hero_video_url: string;
  hero_title: string;
  hero_subtitle: string;
  about_text_1: string;
  about_text_2: string;
  about_image_1: string;
  about_image_2: string;
  instagram_url: string;
  contact_email: string;
  whatsapp_number: string;
}

const defaultConfig: SiteConfig = {
  hero_video_url: '/DOCUMENTARY_EXPO.mp4',
  hero_title: 'A Arte é o Princípio —',
  hero_subtitle: 'Criatividade no Comando',
  about_text_1: 'Fundada pelo fotógrafo Cesar Delong, a Delong Media House é uma produtora audiovisual de atuação nacional, dedicada a registrar e contar histórias por meio de imagens marcantes.',
  about_text_2: 'Cesar Delong atua desde 2014 com ampla trajetória na cobertura dos principais eventos esportivos no Brasil e exterior, hoje liderando equipes de produção audiovisual na captação de filmes institucionais e publicitários.',
  about_image_1: '/projects/galleries/iratrail/DELONG00021.jpg',
  about_image_2: '/projects/galleries/iratrail/DELONG00025.jpg',
  instagram_url: 'https://www.instagram.com/cesardelong/',
  contact_email: 'contato@cesardelong.com',
  whatsapp_number: '5542999999999'
};

let configCache: SiteConfig | null = null;

export const useSiteConfig = () => {
  const [config, setConfig] = useState<SiteConfig>(configCache || defaultConfig);
  const [loading, setLoading] = useState(!configCache);

  useEffect(() => {
    if (configCache) return;
    
    const fetchConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('*')
          .eq('id', 1)
          .single();
          
        if (!error && data) {
          configCache = data as SiteConfig;
          setConfig(data as SiteConfig);
        }
      } catch (e) {
        console.warn('Erro ao buscar site_config:', e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConfig();
  }, []);

  return { config, loading };
};
