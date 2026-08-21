DROP TABLE IF EXISTS public.projects CASCADE;

CREATE TABLE public.projects (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    year TEXT,
    category TEXT,
    title TEXT NOT NULL,
    client TEXT,
    service TEXT,
    image TEXT,
    description TEXT,
    full_description TEXT,
    video_url TEXT,
    video_url2 TEXT,
    hover_video_url TEXT,
    video_orientation TEXT DEFAULT 'horizontal',
    gallery TEXT[],
    sort_order INTEGER DEFAULT 0
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users on projects" ON public.projects FOR SELECT USING (true);

-- Insert dos projetos reais do portfólio oficial
INSERT INTO public.projects (slug, year, category, title, client, service, image, description, full_description, hover_video_url, sort_order) VALUES
('expo-irati-2024', '2024', 'Eventos', 'EXPO IRATI', 'Prefeitura Irati', 'Aftermovie Oficial', '/projects/galleries/expo/capa.webp', 'O maior evento da região documentado do céu à terra', 'Material institucional', 'COLAR_URL_DO_BUNNY.mp4', 1),
('shows-antony-e-gabriel', '2024', 'Shows', 'ANTONY E GABRIEL', 'Antony e Gabriel', 'Cobertura de Show', '/projects/shows-antony-e-gabriel/capa-antony-gabriel-optimized.jpg', 'Cobertura audiovisual vibrante da performance sertaneja', 'Apresentação musical da dupla.', 'COLAR_URL_DO_BUNNY.mp4', 2),
('shows-joao-neto-e-frederico', '2024', 'Shows', 'JOÃO NETO E FREDERICO', 'João Neto e Frederico', 'Cobertura de Show', '/projects/shows-joao-neto-e-frederico/capa-joao-neto-optimized.jpg', 'Filme de cobertura do show histórico', 'Material focado no impacto do show ao vivo, com ângulos criativos.', 'COLAR_URL_DO_BUNNY.mp4', 3),
('institucional-prefeitura-irati', '2024', 'Institucional', 'PREFEITURA DE IRATI', 'Prefeitura de Irati', 'Vídeo Institucional', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070', 'Campanha de turismo e desenvolvimento da cidade de Irati.', 'Vídeo de 3 minutos explorando as raízes culturais e o momento de expansão.', 'COLAR_URL_DO_BUNNY.mp4', 4),
('publicitario-lelac-ram', '2024', 'Publicitário', 'LELAC RAM', 'Lelac Ram', 'Comercial / Vertical', '/projects/publicitario-lelac-ram/capa.jpg', 'Vídeo vertical dinâmico focado em redes sociais para a Lelac RAM.', 'Conteúdo otimizado para plataformas verticais destacando a imponência e tecnologia.', 'COLAR_URL_DO_BUNNY.mp4', 5),
('esporte-iratrail', '2024', 'Esporte', 'IRATRAIL', 'Iratrail', 'Videoclipe Esportivo', '/projects/galleries/iratrail/DJI_0653.jpg', 'Desafio impiedoso de trail nas montanhas.', 'Cobertura de impacto para a corrida Iratrail.', 'COLAR_URL_DO_BUNNY.mp4', 6),
('shows-luan-pereira', '2024', 'Shows', 'LUAN PEREIRA', 'Luan Pereira', 'Cobertura de Show', '/projects/shows-luan-pereira/capa.jpg', 'Aftermovie repleto de energia do show do Luan Pereira.', 'Captura da intensa conexão entre o artista e fãs.', 'COLAR_URL_DO_BUNNY.mp4', 7),
('shows-bruno-e-marrone', '2024', 'Shows', 'BRUNO E MARRONE', 'Bruno e Marrone', 'Cobertura de Show', '/projects/shows-bruno-e-marrone/capa.jpg', 'Registro emocionante e energético', 'Cobertura audiovisual com múltiplas câmeras.', 'COLAR_URL_DO_BUNNY.mp4', 8),
('publicitario-fobras-aluminio', '2024', 'Publicitário', 'FOBRAS', 'Fobras', 'Comercial / Multiplataforma', '/projects/publicitario-fobras-aluminio/capa.jpg', 'Campanha publicitária multiplataforma', 'Produção de vídeo versátil entregue tanto em formado horizontal quanto vertical.', 'COLAR_URL_DO_BUNNY.mp4', 9),
('shows-guilherme-e-santiago', '2024', 'Shows', 'GUILHERME E SANTIAGO', 'Guilherme e Santiago', 'Cobertura de Show', '/projects/shows-guilherme-e-santiago/capa.jpg', 'Aftermovie dinâmico destacando a apresentação', 'Produção audiovisual capturando o alto astral.', 'COLAR_URL_DO_BUNNY.mp4', 10),
('shows-radio-radar', '2024', 'Shows', 'RÁDIO RADAR', 'Rádio Radar', 'Cobertura', '/projects/shows-radio-radar/capa.jpg', 'Festival patrocinado pela Rádio.', 'Documentário completo do evento.', 'COLAR_URL_DO_BUNNY.mp4', 11),
('publicitario-via-araucaria', '2024', 'Publicitário', 'VIA ARAUCÁRIA', 'Via Araucária', 'Vídeo Publicitário', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80', 'Campanha de reposicionamento corporativo', 'Produção audiovisual com foco em conversão.', 'COLAR_URL_DO_BUNNY.mp4', 12);
