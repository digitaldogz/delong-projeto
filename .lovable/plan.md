
# Plano: VideoPlayer Universal (YouTube + Bunny Stream + URL Direta)

## Objetivo
Criar um componente de vídeo universal que detecta automaticamente a fonte e renderiza o player apropriado, permitindo flexibilidade total para hospedar vídeos sem restrições de copyright.

---

## Fontes de Vídeo Suportadas

| Fonte | Formato do Campo | Exemplo |
|-------|------------------|---------|
| YouTube | `youtubeId: "abc123"` | `youtubeId: "q--pHHzrsCs"` |
| Bunny Stream | `bunnyVideo: { libraryId, videoId }` | `bunnyVideo: { libraryId: "123456", videoId: "abc-xyz" }` |
| URL Direta | `videoUrl: "https://..."` | `videoUrl: "https://cdn.example.com/video.mp4"` |

---

## Arquivos a Criar/Modificar

### 1. CRIAR: `src/components/VideoPlayer.tsx`

Componente universal que detecta automaticamente o tipo de vídeo:

```text
Estrutura do Componente:
├── Props Interface
│   ├── youtubeId?: string
│   ├── bunnyVideo?: { libraryId: string, videoId: string }
│   ├── videoUrl?: string
│   └── title?: string
│
├── Lógica de Detecção
│   ├── Se bunnyVideo → renderiza iframe Bunny
│   ├── Se youtubeId → renderiza iframe YouTube
│   └── Se videoUrl → renderiza <video> nativo HTML5
│
└── Renderização
    ├── Container aspect-video responsivo
    ├── Iframe ou Video element
    └── Estilo consistente entre players
```

**Bunny Stream Embed:**
```text
URL: https://iframe.mediadelivery.net/embed/{libraryId}/{videoId}
Parâmetros: ?autoplay=false&loop=false&muted=false&preload=true
```

**HTML5 Video (URL Direta):**
```text
<video controls preload="metadata">
  <source src="{videoUrl}" type="video/mp4" />
</video>
```

### 2. MODIFICAR: `src/data/projects.ts`

Atualizar interface Project para suportar múltiplas fontes:

```text
Antes:
  youtubeId?: string;

Depois:
  youtubeId?: string;
  bunnyVideo?: {
    libraryId: string;
    videoId: string;
  };
  videoUrl?: string;
```

### 3. MODIFICAR: `src/pages/ProjectDetail.tsx`

Substituir YouTubeEmbed por VideoPlayer universal:

```text
Antes:
  import YouTubeEmbed from "@/components/YouTubeEmbed";
  {project.youtubeId && <VideoSection videoId={project.youtubeId} />}

Depois:
  import VideoPlayer from "@/components/VideoPlayer";
  {(project.youtubeId || project.bunnyVideo || project.videoUrl) && (
    <VideoSection project={project} />
  )}
```

### 4. MANTER: `src/components/YouTubeEmbed.tsx`

Manter como backup/legado caso seja usado em outro lugar.

---

## Detalhes Técnicos

### VideoPlayer Component

```text
interface VideoPlayerProps {
  youtubeId?: string;
  bunnyVideo?: {
    libraryId: string;
    videoId: string;
  };
  videoUrl?: string;
  title?: string;
}

Prioridade de renderização:
1. bunnyVideo (se definido)
2. youtubeId (se definido)
3. videoUrl (se definido)
4. null (nenhum vídeo)
```

### Bunny Stream Options

```text
Parâmetros disponíveis no iframe:
├── autoplay=false (não inicia automaticamente)
├── loop=false (não repete)
├── muted=false (com som)
├── preload=true (carrega preview)
├── responsive=true (adapta ao container)
└── controls=true (mostra controles)
```

### Estilo Consistente

```text
Container:
├── aspect-video (16:9)
├── bg-secondary (placeholder enquanto carrega)
├── overflow-hidden
└── shadow-2xl (sombra elegante)

Iframe/Video:
├── absolute inset-0
├── w-full h-full
└── border-0
```

---

## Exemplos de Uso no projects.ts

```text
// Projeto com YouTube
{
  slug: "expo-irati",
  youtubeId: "q--pHHzrsCs",
  // bunnyVideo e videoUrl não definidos
}

// Projeto com Bunny Stream
{
  slug: "video-musical",
  bunnyVideo: {
    libraryId: "123456",
    videoId: "abc-def-ghi"
  },
  // youtubeId e videoUrl não definidos
}

// Projeto com URL Direta (MP4)
{
  slug: "demo-reel",
  videoUrl: "https://cdn.exemplo.com/videos/demo.mp4",
  // youtubeId e bunnyVideo não definidos
}
```

---

## Arquivos Finais

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/components/VideoPlayer.tsx` | CRIAR | Componente universal multi-fonte |
| `src/data/projects.ts` | MODIFICAR | Adicionar bunnyVideo e videoUrl na interface |
| `src/pages/ProjectDetail.tsx` | MODIFICAR | Usar VideoPlayer ao invés de YouTubeEmbed |
| `src/components/YouTubeEmbed.tsx` | MANTER | Backup/legado |

---

## Como Usar Bunny Stream

Após criar conta no Bunny.net:

1. Fazer upload do vídeo no Bunny Stream
2. Copiar o Library ID (nas configurações da biblioteca)
3. Copiar o Video ID (na página do vídeo)
4. Adicionar no projeto:

```text
bunnyVideo: {
  libraryId: "SEU_LIBRARY_ID",
  videoId: "SEU_VIDEO_ID"
}
```

---

## Resultado Esperado

- Player universal que aceita 3 fontes diferentes
- Detecção automática do tipo de vídeo
- Estilo visual consistente entre todas as fontes
- Flexibilidade para usar YouTube (gratuito) ou Bunny (sem restrições)
- Preparado para URLs diretas de MP4 se necessário
