
# Plano: Melhorar Fluidez das Páginas de Portfolio

## Objetivo
Tornar as páginas Projects, ProjectDetail e ServicesPage instantâneas e fluidas, removendo animações pesadas de entrada nos títulos e imagens principais.

---

## Páginas Afetadas
- `src/pages/Projects.tsx` - Lista de projetos
- `src/pages/ProjectDetail.tsx` - Detalhe do projeto
- `src/pages/ServicesPage.tsx` - Página de serviços

**A página Home NÃO será alterada.**

---

## Mudanças por Arquivo

### 1. Projects.tsx

**Problema atual:**
- Título "Projetos" anima com `y: 50, duration: 0.9` (lento demais)
- Grid de projetos anima individualmente com stagger

**Solução:**
- Remover animação do título - aparece fixo imediatamente
- Manter apenas fade sutil no filtro
- Simplificar animação do grid (remover scale nas imagens)

```text
ANTES:
├── Título: y:50 + fade (0.9s) ❌
├── Filtro: y:12 + fade (0.55s)
└── Cards: y:40 + fade + scale imagem

DEPOIS:
├── Título: SEM ANIMAÇÃO (fixo)
├── Filtro: y:8 + fade (0.4s) ✓
└── Cards: apenas fade simples (sem scale)
```

---

### 2. ProjectDetail.tsx

**Problema atual:**
- Imagem hero anima com `scale: 1.06, duration: 1.1` (muito pesado)
- Título anima com `y: 40, duration: 0.8`
- Gradient anima separadamente

**Solução:**
- Remover TODAS as animações do HeroBanner (imagem + título = fixos)
- Manter apenas metadata com fade leve
- Galeria mantém fade suave no scroll

```text
ANTES:
├── Imagem: scale + fade (1.1s) ❌
├── Gradient: fade (0.6s) ❌
├── Título: y:40 + fade (0.8s) ❌
└── Metadata: fade + stagger (0.4s)

DEPOIS:
├── Imagem: VISÍVEL IMEDIATO
├── Gradient: VISÍVEL IMEDIATO
├── Título: VISÍVEL IMEDIATO
└── Metadata: fade leve (0.3s) ✓
```

---

### 3. ServicesPage.tsx

**Problema atual:**
- Título "Serviços" anima com `y: 80, duration: 1` (muito lento)
- Descrição e CTA animam também
- Cada serviço tem animação complexa (número, título, descrição, imagem separados)

**Solução:**
- Remover animação do título principal
- Manter apenas fade rápido na descrição/CTA
- Simplificar animação dos serviços: um único fade por item

```text
ANTES:
├── Título: y:80 + fade (1s) ❌
├── Descrição: y:24 + fade (0.7s)
├── CTA: y:16 + fade (0.5s)
└── Serviços: 4 animações por item (número, título, desc, imagem)

DEPOIS:
├── Título: SEM ANIMAÇÃO (fixo)
├── Descrição: y:12 + fade (0.4s) ✓
├── CTA: y:8 + fade (0.3s) ✓
└── Serviços: 1 fade único por item (0.5s)
```

---

## Resumo das Mudanças

| Elemento | Antes | Depois |
|----------|-------|--------|
| Títulos principais | Animam de baixo (0.8-1s) | **Fixos/Imediatos** |
| Imagem hero | Scale + fade (1.1s) | **Visível imediata** |
| Metadata/filtros | Múltiplos staggers | Fade simples (0.3-0.4s) |
| Itens de serviço | 4 animações por item | 1 fade por item |
| Grid de projetos | Scale + fade complexo | Apenas fade |

---

## Resultado Esperado

- Páginas abrem **instantaneamente** com título e imagem já visíveis
- Scroll revela conteúdo com fades **sutis e rápidos**
- Sem "piscadas" ou elementos que demoram a aparecer
- Experiência fluida e profissional
