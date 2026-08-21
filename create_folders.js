import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data: projects, error: fetchError } = await supabase.from('projects').select('slug');
  if (fetchError) {
    console.error("Erro ao buscar projetos:", fetchError);
    return;
  }
  
  console.log(`Encontrados ${projects.length} projetos. Criando pastas no bucket 'fotos'...`);
  
  const dummyFile = new Blob([''], { type: 'text/plain' });
  let count = 0;
  
  for (const p of projects) {
    if (!p.slug) continue;
    const { error: uploadError } = await supabase.storage.from('fotos').upload(`${p.slug}/.pasta_vazia`, dummyFile, { upsert: true });
    if (!uploadError) {
      console.log(`Pasta criada: ${p.slug}`);
      count++;
    } else {
      console.error(`Erro ao criar pasta ${p.slug}:`, uploadError.message);
    }
  }
  
  console.log(`\nPronto! ${count} pastas criadas com sucesso.`);
}
run();
