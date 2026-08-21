const fs = require('fs');
let file = fs.readFileSync('src/data/projects.ts', 'utf-8');

file = file.replace(/year: data\.year/g, 'year: data.ano');
file = file.replace(/category: data\.category/g, 'category: data.categoria');
file = file.replace(/title: data\.title/g, 'title: data.titulo');
file = file.replace(/client: data\.client/g, 'client: data.cliente');
file = file.replace(/image: data\.image/g, 'image: data.capa_do_projeto');
file = file.replace(/description: data\.description/g, 'description: data.descricao_curta');
file = file.replace(/fullDescription: data\.full_description/g, 'fullDescription: data.descricao_completa');
file = file.replace(/videoUrls: data\.video_urls \|\| \(data\.video_url \? \[data\.video_url\] : \[\]\)/g, 'videoUrls: data.links_dos_videos || []');
file = file.replace(/videoOrientation: data\.video_orientation/g, 'videoOrientation: data.formato_dos_videos');
file = file.replace(/gallery: data\.gallery/g, 'gallery: data.galeria_de_fotos');

// Handle sort_order and is_active in the query
file = file.replace(/\.eq\('is_active', true\)/g, ".eq('ativo', true)");
file = file.replace(/\.order\('sort_order'/g, ".order('ordem_de_exibicao'");

fs.writeFileSync('src/data/projects.ts', file);
