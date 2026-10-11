# DIREÇÕES E CONTEXTO COMPLETO PARA O CLAUDE

Este documento contém todo o histórico técnico, decisões de arquitetura, incidentes recentes e soluções implementadas no projeto **Delong Media House**. Ele foi estruturado para que você (Claude) compreenda exatamente o estado atual da aplicação e saiba como dar continuidade ou auditar o sistema.

---

## 1. Visão Geral da Arquitetura

- **Frontend:** React 18, Vite, TypeScript, TailwindCSS, Radix UI / shadcn/ui, Lucide Icons, GSAP, Framer Motion.
- **Hospedagem & Infraestrutura:** Vercel (Single Page Application - SPA).
  - Domínios oficiais: `https://www.delongmediahouse.com.br` e `https://delongmediahouse.com`.
- **Banco de Dados & Backend:** Supabase (PostgreSQL Gerenciado).
  - Project ID: `aapcuojdllvcfmomvhfx`
  - URL da API: `https://aapcuojdllvcfmomvhfx.supabase.co`
  - Chave Pública (Anon): `sb_publishable_YayR5J2rQ_X4GpkGMINbnw_xupSt3w5`
- **Armazenamento de Vídeos & CDN:** BunnyCDN (Stream & Pull Zone).
  - Pull Zone CDN: `https://vz-b5c6f4c7-023.b-cdn.net`

---

## 2. O Incidente Recente (Outubro/2026): Supabase Pausado

### O Problema:
O cliente (Cesar) recebeu um e-mail do Supabase informando que o projeto foi **pausado por inatividade**:
> *"Your Supabase Project Delong has been paused. To optimize cloud resources, we automatically pause free-tier projects after 7 days of inactivity."*

Quando um projeto é pausado no plano gratuito do Supabase, o DNS da API (`*.supabase.co`) é desativado temporariamente, fazendo com que o site pare de carregar projetos, fotos e configurações dinâmicas.

### Por que a tentativa anterior de UptimeRobot falhou?
Anteriormente, foi configurado um monitor no **UptimeRobot** pingando a URL raiz do site (`https://delongmediahouse.com.br`).
- **A pegadinha técnica:** O site é uma SPA estática servida pelo Edge Cache da Vercel.
- O robô do UptimeRobot apenas fazia uma requisição `HTTP GET` simples para baixar o arquivo `index.html`.
- **O robô NÃO executa JavaScript.** Logo, o código React/Supabase client (`@supabase/supabase-js`) nunca era executado pelo robô.
- Para a infraestrutura do Supabase, o banco de dados continuou recebendo **zero requisições** nos últimos 7 dias, culminando na pausa automática.

---

## 3. Solução Definitiva Implementada

Para resolver permanentemente sem depender de visitas manuais ou pagar o plano Pro de US$ 25/mês do Supabase:

### A. Rota Serverless na Vercel (`api/ping.js`)
Criamos uma função serverless nativa na Vercel que roda no Node.js do servidor:
- **Arquivo:** `api/ping.js`
- **Comportamento:** Ao receber uma requisição `GET`, a função executa uma consulta real direta ao banco de dados:
  ```javascript
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase.from('projects').select('id').limit(1);
  ```
- **Retorno:** Se o banco responder, retorna status `200 OK` com payload JSON:
  ```json
  {
    "success": true,
    "message": "Supabase pinged successfully!",
    "timestamp": "2026-10-11T14:02:04.438Z"
  }
  ```
- **Fallback de Credenciais:** As chaves estão protegidas com fallbacks diretos no código para garantir que funcione mesmo se as variáveis de ambiente não estiverem configuradas no painel da Vercel.

### B. Vercel Cron Job e Roteamento (`vercel.json`)
O arquivo `vercel.json` foi atualizado para agendar uma execução diária automática e garantir que a rota `/api` não seja interceptada pelo rewrite da SPA:
```json
{
  "crons": [
    {
      "path": "/api/ping",
      "schedule": "0 12 * * *"
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### C. Integração com UptimeRobot
O usuário foi instruído a alterar a URL do monitor no UptimeRobot de:
- `https://delongmediahouse.com.br`  ➡️  `https://www.delongmediahouse.com.br/api/ping`
Com isso, a cada 5 minutos o UptimeRobot chama a serverless function, gerando atividade real contínua no Supabase.

---

## 4. Validação & Testes Executados

1. **Restauração do Banco:** O projeto foi despausado via botão **"Resume project"** no dashboard do Supabase e o banco já está respondendo normalmente.
2. **Teste da Rota ao Vivo:**
   ```bash
   curl -iL https://delongmediahouse.com.br/api/ping
   ```
   **Resultado:** `HTTP/2 200 OK` confirmado, confirmando a consulta direta ao Supabase.
3. **Teste do Frontend:**
   ```bash
   curl -iL https://www.delongmediahouse.com.br
   ```
   **Resultado:** `HTTP/2 200 OK` com o HTML e assets da Vercel respondendo perfeitamente.

---

## 5. Outros Ajustes Importantes Recentes no Código

1. **Capas dos Vídeos (`src/pages/ProjectDetail.tsx` & `src/components/VideoPlayer.tsx`):**
   - O primeiro vídeo (`i === 0`) utiliza a imagem oficial cadastrada na coluna `image` do banco como `poster`.
   - Os vídeos subsequentes (`i > 0`) utilizam a thumbnail automática gerada pelo BunnyCDN: `preview.webp` (substituindo a antiga extensão `thumbnail.jpg` que gerava 404).
   - O player utiliza `object-cover` para garantir que vídeos verticais fiquem esticados sem barras pretas.

2. **Segurança (Row Level Security - RLS no Supabase):**
   - Todas as tabelas públicas (`projects`, `photos`, `services`, `site_config`, `site_settings`) possuem RLS habilitado com política:
     - `Enable read access for all users` (Permite `SELECT` público para que o site leia os dados).
     - Modificações (`INSERT`, `UPDATE`, `DELETE`) só podem ser feitas via sessão de administrador logado no Supabase.

3. **Correção na Galeria do "Sobre Nós" (`src/pages/AboutPage.tsx`):**
   - Foi corrigido um bug onde strings literais `"{config.about_image_1}"` quebravam imagens no carrossel de fotos.

---

## 6. Próximos Passos / O que Observar

- Se o cliente precisar adicionar novos cases ou editar o site, ele utiliza o editor nativo de tabelas do Supabase.
- Foi sugerido anteriormente a criação de um painel CMS básico em `/admin` com senha para facilitar o upload sem precisar lidar com JSON arrays no Supabase caso o cliente queira maior praticidade no futuro.
