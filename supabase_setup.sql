-- ==========================================
-- ESTRUTURA DO BACKEND: DELONG MEDIA HOUSE
-- ==========================================

-- 1. Criação da Tabela PHOTOS (Para a aba de Fotos)
CREATE TABLE IF NOT EXISTS public.photos (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    client TEXT,
    category TEXT,
    year TEXT,
    service TEXT,
    image TEXT,
    description TEXT,
    gallery TEXT[],
    sort_order INTEGER DEFAULT 0
);

-- População Inicial da Tabela PHOTOS
INSERT INTO public.photos (slug, year, category, title, client, service, image, description, gallery, sort_order) VALUES
('inca-divide-peru-2019', '2019', 'Fotos', 'INCA DIVIDE PERU', 'Inca Divide', 'Cobertura Fotográfica', '/photos/inca-divide-peru-2019/capa.webp', 'Cobertura fotográfica da dramática corrida Inca Divide no Peru.', ARRAY[]::TEXT[], 1),
('world-cup-petropolis-2022', '2022', 'Fotos', 'WORLD CUP PETRÓPOLIS', 'World Cup', 'Cobertura Fotográfica', '/photos/world-cup-petropolis-2022/capa.webp', 'Cobertura oficial da etapa brasileira da Copa do Mundo em Petrópolis.', ARRAY[]::TEXT[], 2),
('bikingman-franca-2023', '2023', 'Fotos', 'BIKINGMAN FRANÇA', 'BikingMan', 'Cobertura Fotográfica', '/photos/bikingman-franca-2023/capa.webp', 'Ultramaratona de ciclismo sem suporte ao redor de regiões montanhosas na França.', ARRAY[]::TEXT[], 3),
('world-cup-suica-2023', '2023', 'Fotos', 'WORLD CUP SUÍÇA', 'World Cup', 'Cobertura Fotográfica', '/photos/world-cup-suica-2023/capa.webp', 'Registro de alta performance da Copa do Mundo na Suíça.', ARRAY[]::TEXT[], 4),
('world-cup-austria-2023', '2023', 'Fotos', 'WORLD CUP AÚSTRIA', 'World Cup', 'Cobertura Fotográfica', '/photos/world-cup-austria-2023/capa.webp', 'Imagens exclusivas dos atletas nas pistas exigentes da Áustria.', ARRAY[]::TEXT[], 5),
('bikingman-portugal-2023', '2023', 'Fotos', 'BIKINGMAN PORTUGAL', 'BikingMan', 'Cobertura Fotográfica', '/photos/bikingman-portugal-2023/capa.webp', 'Desafios extremos e belas paisagens ao longo das rotas de Portugal.', ARRAY[]::TEXT[], 6),
('world-cup-republica-tcheca-2023', '2023', 'Fotos', 'WORLD CUP REPÚBLICA TCHECA', 'World Cup', 'Cobertura Fotográfica', '/photos/world-cup-republica-tcheca-2023/capa.webp', 'Competição intensa e técnica na clássica pista da República Tcheca.', ARRAY[]::TEXT[], 7),
('bikingman-corsica-2023', '2023', 'Fotos', 'BIKINGMAN CÓRSICA', 'BikingMan', 'Cobertura Fotográfica', '/photos/bikingman-corsica-2023/capa.webp', 'Exploração visual das rotas impiedosas na ilha da Córsica.', ARRAY[]::TEXT[], 8),
('xterra', 'Vários', 'Fotos', 'XTERRA', 'Xterra', 'Cobertura Fotográfica', '/photos/xterra/capa.webp', 'Etapas Ilhabela, Mangaratiba, Paraty, Tiradentes, Praia do Rosa, Ilha do Mel e Ouro Preto.', ARRAY[]::TEXT[], 9),
('ironman-70-3', 'Vários', 'Fotos', 'IRONMAN 70.3', 'Ironman', 'Cobertura Fotográfica', '/photos/ironman-70-3/capa.webp', 'Etapas icônicas com imagens deslumbrantes no Rio de Janeiro, Maceió e Fortaleza.', ARRAY[]::TEXT[], 10),
('avelar-sports', 'Vários', 'Fotos', 'AVELAR SPORTS', 'Avelar Sports', 'Cobertura Fotográfica', '/photos/avelar-sports/capa.webp', 'Coberturas completas dos eventos esportivos no padrão Avelar Sports.', ARRAY[]::TEXT[], 11),
('cimtb', 'Vários', 'Fotos', 'CIMTB', 'CIMTB', 'Cobertura Fotográfica', '/photos/cimtb/capa.webp', 'Capturando a emoção e a poeira da Copa Internacional de Mountain Bike.', ARRAY[]::TEXT[], 12),
('campeonatos-brasileiros-de-mtb', 'Vários', 'Fotos', 'CAMPEONATOS BRASILEIROS DE MTB', 'CBC', 'Cobertura Fotográfica', '/photos/campeonatos-brasileiros-de-mtb/capa.webp', 'Disputas emocionantes de DH, XC, XCM e ENDURO.', ARRAY[]::TEXT[], 13),
('best-of-ensaios', 'Vários', 'Fotos', 'BEST OF ENSAIOS', 'Delong', 'Ensaios Fotográficos', '/photos/best-of-ensaios/capa.webp', 'Uma seleção com o melhor dos nossos ensaios fotográficos.', ARRAY[]::TEXT[], 14)
ON CONFLICT (slug) DO NOTHING;

-- 2. Criação da Tabela SERVICES (Para a aba de Serviços)
CREATE TABLE IF NOT EXISTS public.services (
    id SERIAL PRIMARY KEY,
    number TEXT NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    image TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- População Inicial da Tabela SERVICES
INSERT INTO public.services (number, title, short_description, full_description, image, sort_order) VALUES
('01', 'Cobertura de Eventos', 'Registro estratégico de eventos e grandes feiras.', 'Cobertura audiovisual para eventos, desde grandes festivais a shows corporativos...', '/services/exposicao.jpg', 1),
('02', 'Filmes Institucionais', 'Fortalecemos a história da sua marca ou empresa.', 'Ajudamos empresas a comunicar seus valores através de filmes cinematográficos...', '/services/institucional.jpg', 2),
('03', 'Vídeos Publicitários', 'Peças com linguagem ágil e estética de alto impacto.', 'Comerciais para TV e campanhas digitais focadas em engajamento...', '/services/publicitario.jpg', 3),
('04', 'Fotografia Profissional', 'Trabalho de excelência capturando os detalhes.', 'Ensaios e cobertura fotográfica com padrão internacional de qualidade...', '/services/fotografia.jpg', 4),
('05', 'Produção de Sites', 'Plataformas imersivas que refletem o padrão Delong.', 'Criação de web sites super modernos e otimizados com altíssima performance...', '/services/sites.jpg', 5);

-- 3. Criação da Tabela SITE_SETTINGS (Chave-Valor)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id SERIAL PRIMARY KEY,
    section TEXT NOT NULL,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    label TEXT NOT NULL
);

-- População Inicial da Tabela SITE_SETTINGS
INSERT INTO public.site_settings (section, key, value, label) VALUES
-- HERO SECTION
('hero', 'video_url', '/DOCUMENTARY_EXPO.mp4', 'Vídeo de fundo da Home Page (URL)'),
('hero', 'title_line_1', 'A Arte é o Princípio —', 'Título Principal Linha 1'),
('hero', 'title_line_2', 'Criatividade no Comando', 'Título Principal Linha 2'),

-- HOME STATS
('home', 'intro_title', 'A referência em produção audiovisual de alto impacto.', 'Título Intro da Home'),
('home', 'intro_description', 'Fundada para inovar, a Delong Media House é uma produtora audiovisual full-service. Criamos vídeos que conectam e convertem, atuando como braço direito da sua comunicação visual.', 'Descrição da Intro na Home'),
('home', 'stat_1_value', '200', 'Estatística 1 (Número)'),
('home', 'stat_1_label', 'Eventos organizados para grandes marcas', 'Estatística 1 (Descrição)'),
('home', 'stat_2_value', '1000', 'Estatística 2 (Número)'),
('home', 'stat_2_label', 'Publicações de comunicação desenhadas', 'Estatística 2 (Descrição)'),
('home', 'stat_3_value', '50', 'Estatística 3 (Número)'),
('home', 'stat_3_label', 'Equipe experiente e apaixonada', 'Estatística 3 (Descrição)'),

-- ABOUT
('about', 'hero_image', '/projects/galleries/cesar/502451891.jpg', 'Foto de capa (Banner topo do "Sobre")'),
('about', 'cesar_image', '/projects/galleries/cesar/305A4844.jpg', 'Foto do manifesto (Foto do César)'),
('about', 'bio_paragraph_1', 'César Delong atua no audiovisual desde 2014, quando transformou a paixão por contar histórias no seu propósito de vida. Em 2021, fundou a agência Delong Media House para elevar o nível das produções do mercado, entregando filmes mais dinâmicos e resultados excepcionais.', 'Biografia - Parágrafo 1'),
('about', 'bio_paragraph_2', 'Fotógrafo reconhecido internacionalmente em concursos de fotos de esportes, une a expertise da captura de movimento e iluminação à entrega estética dos mais de mil trabalhos produzidos nos últimos anos. Apaixonado pela essência de cada marca que constrói junto de seus clientes.', 'Biografia - Parágrafo 2'),
('about', 'vision_text', 'Consolidar a atuação criativa no mercado de altíssimo padrão, liderando a inovação tecnológica unida à alma das histórias verdadeiras gerando muito mais valor.', 'Texto de Visão'),
('about', 'mission_text', 'Atuar nos principais eventos e colaborar com as marcas que mais influenciam pessoas, criando conexões potentes onde a imagem fala com muita autoridade.', 'Texto de Missão'),

-- FOOTER
('footer', 'tagline', 'A arte move tudo', 'Slogan do Footer'),
('footer', 'description', 'Moldamos histórias e criamos experiências imersivas que convertem resultados reais.', 'Descrição do Footer'),
('footer', 'email', 'contato@cesardelong.com', 'E-mail de Contato'),
('footer', 'phone', '(42) 99927-7578', 'Telefone (Apresentação)'),
('footer', 'whatsapp', '5542999277578', 'WhatsApp (Somente Números)')
ON CONFLICT (key) DO NOTHING;

-- Garantir acesso de leitura anônimo para as novas tabelas
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users on photos" ON public.photos FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users on services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users on site_settings" ON public.site_settings FOR SELECT USING (true);
