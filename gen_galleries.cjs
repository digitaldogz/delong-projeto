const fs = require('fs');
const path = require('path');

const folders = fs.readdirSync('public/projects/galleries');
let sql = '-- Execute isto no SQL Editor para associar as fotos aos projetos\n';

const map = {
  'almeidarun': 'esporte-almeidarun',
  'ANTONY GABRIEL': 'shows-antony-e-gabriel',
  'BRUNO E MARRONE': 'shows-bruno-e-marrone',
  'EDSON HUDSON': 'shows-edson-hudson', // May not exist
  'expo 24': 'expo-irati-2024',
  'festa pessego': 'festa-pessego-25',
  'franco run': 'esporte-franco-run',
  'GUILHERME SANTIAGO': 'shows-guilherme-e-santiago',
  'iratrail': 'esporte-iratrail',
  'ivaskorun': 'esporte-ivaskorun',
  'LUAN PEREIRA': 'shows-luan-pereira',
  'natal irati': 'eventos-natal-irati-25',
  'Radio Radar': 'shows-radio-radar',
};

for (const folder of folders) {
  if (folder.startsWith('.') || !map[folder]) continue;
  const slug = map[folder];
  
  const files = fs.readdirSync(path.join('public/projects/galleries', folder)).filter(f => !f.startsWith('.'));
  if (files.length === 0) continue;
  
  const pgPaths = files.map(f => `'/projects/galleries/${folder}/${f}'`).join(',');
  sql += `UPDATE projects SET gallery = ARRAY[${pgPaths}]::text[] WHERE slug = '${slug}';\n`;
}

fs.writeFileSync('update_galleries.sql', sql);
