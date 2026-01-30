
# Plano: Animação de Transição de Página Sofisticada

## Objetivo
Criar uma transição de página elegante e fluida ao clicar em um case/projeto. A animação será inspirada em agências de design premium, com overlay curtain effect e sequência coordenada.

---

## Conceito da Animação

### Fluxo da Transição

```text
CLIQUE NO CASE
     │
     ▼
┌─────────────────────────────────────┐
│  1. CURTAIN SLIDE (0.4s)            │
│     Overlay escuro desliza do       │
│     bottom para cima, cobrindo tela │
└─────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│  2. NAVEGAÇÃO (durante overlay)     │
│     Route change acontece           │
│     enquanto tela está coberta      │
└─────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│  3. REVEAL (0.5s)                   │
│     Overlay desliza para cima,      │
│     revelando a nova página         │
└─────────────────────────────────────┘
```

---

## Arquivos a Criar/Modificar

### 1. CRIAR: `src/components/PageTransition.tsx`

Componente de transição global com overlay animado:

- **Overlay Element**: Div fullscreen com z-index alto
- **Estado**: `isTransitioning`, `targetPath`
- **Animação GSAP**: clipPath ou translateY para curtain effect
- **Callback**: Executa navegação durante a cobertura

```text
Estrutura do Componente:
├── TransitionContext (estado global)
├── Overlay div (fixed, inset-0, z-[9999])
├── useTransitionNavigate hook (substitui navigate)
└── Sequência GSAP:
    ├── Entrada: scaleY 0 → 1 (0.4s)
    ├── Navegar durante pausa
    └── Saída: scaleY 1 → 0 (0.5s)
```

### 2. MODIFICAR: `src/App.tsx`

- Wrap rotas com `TransitionProvider`
- Adicionar `TransitionOverlay` no root

### 3. MODIFICAR: `src/components/SelectedCases.tsx`

- Substituir `<Link>` por componente custom com transição
- Usar `useTransitionNavigate()` ao invés de Link direto

### 4. MODIFICAR: `src/pages/Projects.tsx`

- Mesma mudança: usar transição customizada nos links

### 5. MODIFICAR: `src/pages/ProjectDetail.tsx`

- Aplicar nos links de "Mais Projetos"

---

## Detalhes Técnicos

### TransitionContext

```text
interface TransitionState {
  isTransitioning: boolean;
  navigate: (path: string) => void;
}

Fluxo:
1. User clica → navigate(path)
2. isTransitioning = true
3. GSAP anima overlay IN (0.4s)
4. Aguarda 100ms
5. router.navigate(path)
6. Aguarda 150ms (página carrega)
7. GSAP anima overlay OUT (0.5s)
8. isTransitioning = false
```

### Animação do Overlay (GSAP)

```text
ENTRADA (cubrir tela):
├── clipPath: "inset(100% 0 0 0)" → "inset(0% 0 0 0)"
├── duration: 0.4s
└── ease: "power4.inOut"

SAÍDA (revelar página):
├── clipPath: "inset(0% 0 0 0)" → "inset(0 0 100% 0)"
├── duration: 0.5s
└── ease: "power4.out"
```

### Easing Recomendado

```text
ENTRADA: power4.inOut (suave, profissional)
SAÍDA: power4.out (desacelera elegantemente)
```

---

## Componente CaseLink

Componente wrapper para links de projetos:

```text
<CaseLink to="/projeto/expo-irati-2024">
  <div className="case-card">...</div>
</CaseLink>

Comportamento:
1. onClick captura clique
2. preventDefault()
3. Dispara transição via context
4. Navega após animação
```

---

## Cronograma da Animação

| Fase | Duração | Descrição |
|------|---------|-----------|
| Curtain IN | 400ms | Overlay cobre a tela de baixo para cima |
| Hold | 100ms | Pausa para navegação |
| Route Change | ~50ms | React Router navega |
| Page Load | 150ms | Nova página monta |
| Curtain OUT | 500ms | Overlay revela de cima para baixo |
| **Total** | **~1.2s** | Transição completa |

---

## Visual do Overlay

```text
Opção: Overlay minimalista com logo
┌────────────────────────────────────┐
│                                    │
│                                    │
│         [logo pequeno]             │
│                                    │
│                                    │
└────────────────────────────────────┘
Cor: background (preto) com logo centralizado
```

---

## Arquivos Finais

| Arquivo | Ação |
|---------|------|
| `src/components/PageTransition.tsx` | CRIAR |
| `src/App.tsx` | Adicionar provider e overlay |
| `src/components/SelectedCases.tsx` | Usar CaseLink |
| `src/pages/Projects.tsx` | Usar CaseLink |
| `src/pages/ProjectDetail.tsx` | Usar CaseLink nos relacionados |

---

## Resultado Esperado

- Transição elegante tipo "curtain reveal"
- Sensação cinematográfica e premium
- Sem cortes abruptos entre páginas
- Logo aparece brevemente durante transição
- Experiência fluida similar a sites de agências como Zeit Media
