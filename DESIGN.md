# DESIGN.md — Sistema de Design "Noir & Or"

> Sistema de design de luxo, inspirado na estética de páginas editoriais de alta perfumaria e skincare (fundo preto, tipografia dourada, muito espaço vazio, imagens com luz quente).
> **É uma referência de estilo, não uma cópia de marca.** Não use logos, nomes, fotos, vídeos ou fontes de nenhuma marca real. Use a marca do projeto.

Arquivos deste sistema:
- `DESIGN.md`: este documento (regras e componentes)
- `tokens.css`: **fonte única da verdade** para todos os valores (cores, fontes, tamanhos, espaços, movimento)
- `styleguide.html`: página de referência visual com todos os componentes prontos

---

## 1. Princípios

1. **Silêncio é luxo.** Muito espaço vazio entre as seções. Na dúvida, aumente o respiro em vez de acrescentar elementos.
2. **Uma cor de destaque.** Dourado (`--color-gold`) sobre preto. Não existe segunda cor de destaque. Nada de vermelho, azul, gradientes coloridos ou sombras.
3. **Caixa alta espaçada para títulos, caixa baixa leve para leitura.** Títulos em maiúsculas com letter-spacing largo; textos corridos finos (peso 300).
4. **Linhas finas, cantos retos.** Divisórias de 1px, ícones de traço fino, raio 0 na maior parte. Botões quase nunca são "caixas": o CTA padrão é texto com ícone.
5. **A imagem conta a história.** Fotos e vídeos ocupam grandes áreas. O texto vem curto e ao lado da imagem.
6. **Ritmo editorial.** A página alterna blocos: imagem cheia → texto centralizado → três colunas → imagem + texto (alternando lados) → grade de produtos em fundo claro.

---

## 2. Cores

Use sempre as variáveis de `tokens.css`. **Nunca escreva HEX direto em componentes.**

| Token | Valor | Uso |
|---|---|---|
| `--color-noir` | `#000000` | Fundo principal do site |
| `--color-noir-soft` | `#1a1a1a` | Barra de sub-navegação, superfícies escuras |
| `--color-gold` | `#cdb181` | Títulos, textos e ícones **sobre preto**. Fundo de selo "NOVO" e de botão circular |
| `--color-gold-deep` | `#7a6540` | Texto dourado **sobre fundos claros** (ivory/branco) |
| `--color-bronze` | `#5b4d33` | Texto secundário e hover sobre fundos claros |
| `--color-ivory` | `#fbf7f3` | Fundo da seção de produtos |
| `--color-cloud` | `#fefcfa` | Navegação no tema claro |
| `--color-ink` | `#1d1d1d` | Texto escuro sobre branco |
| `--color-white` | `#ffffff` | Fundo de breadcrumb/formulários; texto do selo |
| `--color-gray-400` | `#9b9b9b` | Links do rodapé (sobre preto) |
| `--color-gray-500` | `#767676` | Labels e textos de apoio (sobre branco) |
| `--color-line-light` | `rgba(255,255,255,.2)` | Divisórias e bordas sobre preto |
| `--color-line-gold` | `rgba(205,177,129,.2)` | Divisórias sobre ivory |
| `--color-overlay` | `rgba(0,0,0,.7)` | Fundo de modais e menus |

**Proporção de uso:** ~70% preto · ~15% ivory/branco · ~10% dourado (texto) · ~5% cinzas.

### Regras de contraste (obrigatórias)
- Dourado `#cdb181` sobre preto: 10.2:1 ✅
- Dourado `#cdb181` sobre ivory: **1.9:1 ❌.** Não use para texto. Sobre fundos claros use `--color-gold-deep` (5.2:1 ✅) ou `--color-bronze` (7.7:1 ✅).
- Texto branco sobre dourado (selo "NOVO") só em 11px semibold caixa alta, como elemento decorativo curto. Para botões sólidos dourados, use texto **preto** (10.2:1).

### Temas por seção
- Padrão (escuro): `:root`. Fundo preto, texto dourado.
- `.theme-ivory`: fundo ivory, texto `gold-deep`. Usado na grade de produtos.
- `.theme-white`: fundo branco, texto `ink`. Usado em breadcrumb, newsletter e formulários.

---

## 3. Tipografia

**Família:** `Montserrat` (Google Fonts, gratuita), pesos 200, 300, 400 e 600. Uma família só para tudo, como nas referências.
**Utilitária:** `Helvetica Neue / Arial` (sistema), só no rodapé e em formulários.
**Alternativa de display (opcional):** `Lexend Exa` peso 300 para os títulos, se quiser letras mais largas.
❌ Não baixe nem use fontes proprietárias de marcas.

| Estilo | Desktop (tam/altura/espaçamento) | Mobile | Peso | Caixa | Uso |
|---|---|---|---|---|---|
| `display-xl` | 40 / 48 / 5px | 25 / 33 / 3px | 300 | MAIÚSCULA | Título do hero (1 por página) |
| `display-l` | 30 / 36 / 3px | 25 / 33 / 3px | 300 | MAIÚSCULA | Títulos de seção e de produto (h2) |
| `display-m` | 20 / 26 / 3px | 18 / 24 / 2px | 400 | MAIÚSCULA | Frase de destaque sob vídeo |
| `lead` | 22 / 31 / 0.1px | 16 / 21 / 1px | 300 | normal | Parágrafo de abertura centralizado |
| `body` | 14 / 20 / 0.1px | igual | 300 | normal | Textos corridos |
| `eyebrow` | 11 / 14 / 2px | 10 / 13 / 1px | 600 | MAIÚSCULA | Rótulo acima de títulos ("REGENERE") |
| `label` | 11 / 14 / 0.5px | igual | 400–600 | MAIÚSCULA | Itens de navegação, CTAs |
| `small` | 12 / 18 | igual | 600 | MAIÚSCULA | Nome de produto, preço, títulos do rodapé |
| `caption` | 11 / 16 | igual | 300 | normal | Notas legais, asteriscos |

Regras:
- Títulos `display-*` **sempre** em maiúsculas e peso 300. Nunca negrito.
- Máximo de ~3 linhas por título. Quebre títulos longos em 2 linhas de propósito.
- Todo título de seção vem com um `eyebrow` acima (8px de distância).
- Texto corrido nunca passa de 460px de largura ao lado de imagem, nem de 780px centralizado.
- Não use itálico, sublinhado decorativo ou cores diferentes dentro de um título.

---

## 4. Espaçamento e layout

**Escala (base 4):** 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 96 · 128 · 160 → `--space-1` … `--space-40`.

| Item | Desktop | Tablet | Mobile |
|---|---|---|---|
| Margem lateral (`--gutter`) | 48px | 32px | 20px |
| Respiro entre seções (`--section-y`) | 128px | 96px | 64px |
| Container máximo | 1200px (largo: 1382px) | 100% | 100% |
| Grade | 12 colunas | 6 colunas | 1–2 colunas |
| Grade de produtos | 3 colunas | 2 colunas | 2 colunas compactas (gap 16px) |

**Breakpoints:** mobile ≤ 600px · tablet 601–960px · desktop ≥ 961px.

Distâncias internas padrão:
- eyebrow → título: 8px
- título → parágrafo: 24–32px
- parágrafo → CTA: 32px
- selo "NOVO" → eyebrow: 24px

---

## 5. Bordas, raios, ícones

- Divisórias: `1px solid var(--line)`. Nunca mais grossas que 1px.
- Raio: **0** em imagens, cards, seções e botões. `2px` só no selo. `5px` só em superfícies pequenas (dropdown, tooltip). `50%` em botões de ícone circulares.
- **Sem sombras** (`box-shadow`) e sem `blur`, exceto o vidro da sub-nav no mobile.
- Ícones: estilo linha (outline), 20px, traço 1.25px, na cor do texto. Biblioteca sugerida: Lucide ou Phosphor (Light).

---

## 6. Componentes

> Todos os componentes estão implementados em `styleguide.html`. Use-os como referência exata.

### 6.1 Header
- Fundo preto, altura 104px (desktop) / 56px (mobile).
- **Marca centralizada** (wordmark em texto ou SVG da marca do projeto), dourada, ~36px de altura no desktop, 20px no mobile.
- Ícones à direita: busca, conta, favoritos, sacola (20px, dourados, 16px de espaço entre eles).
- Mobile: menu (hamburger) + busca à esquerda, conta + sacola à direita.

### 6.2 Sub-navegação de coleção (sticky)
- Barra flutuante centralizada, máx. ~856px, fundo `--color-noir-soft`, borda `1px var(--color-line-light)`, altura 50px.
- À esquerda: bloco com nome da coleção em 2 linhas (linha 1 peso 300, linha 2 peso 600) + divisória vertical dourada de 1px.
- Itens: `label` 11px, caixa alta, letter-spacing 0.5px, dourado a 60% de opacidade. Item ativo: 100% de opacidade e sublinhado dourado de 1px colado na base da barra.
- Fica fixa a 28px do topo ao rolar.
- Mobile: vira um seletor de largura total com o item ativo + chevron, fundo `--color-nav-glass`.

### 6.3 Hero editorial
- Vídeo ou imagem de largura total (16:9 desktop, 4:5 mobile), sem texto por cima.
- Abaixo: `eyebrow` centralizado → `display-xl` centralizado → `lead` centralizado (máx. 780px) → nota legal `caption`.
- Botão de play: círculo 36px com borda 1px dourada e triângulo dourado.

### 6.4 Tríptico (3 pilares)
- Divisória superior de 1px em largura total.
- 3 colunas iguais, cada uma com `eyebrow` + `display-l` (2 linhas).
- CTA no rodapé de cada coluna: texto "CONHEÇA" (`label` semibold) + **botão circular** de 32px, fundo dourado, ícone "+" preto.
- Mobile: colunas empilhadas, com divisória entre elas.

### 6.5 Destaque de produto (díptico)
- Duas metades: imagem (50%) + texto (coluna de até 460px). Os lados alternam a cada bloco.
- Ordem do texto: selo `NOVO` (opcional) → `eyebrow` com verbo no imperativo (REGENERE, RESTAURE, PREPARE, SUAVIZE) → `display-l` com o nome do produto → `body` → CTA "ADICIONAR AO CARRINHO" com ícone de sacola.
- Miniatura de vídeo opcional (≈ 80×56px) num canto, com play.

**Selo "NOVO":** fundo dourado, texto branco, 11px, peso 600, letter-spacing 2px, padding 5px 8px, raio 2px.

### 6.6 Frase de impacto
- Linha única em `display-m`, centralizada, logo abaixo de um vídeo ou imagem.

### 6.7 Carrossel
- Setas finas (chevron 16px) nas laterais, sem fundo. Sem bolinhas. Pode ter um contador "1 / 5" em `caption`.

### 6.8 Grade de produtos (`.theme-ivory`)
- Fundo ivory. À esquerda, `eyebrow` + `display-l` (até 3 linhas). Grade de 3 colunas à direita/abaixo.
- **Card de produto** (sem borda e sem fundo próprio):
  - imagem do produto em fundo ivory, proporção 1:1, produto centralizado
  - nome: `small` 12px semibold caixa alta, centralizado
  - descrição: `body` 14px peso 300, caixa alta, cor `--text-muted`
  - preço: `small` 12px semibold
  - CTA: "ADICIONAR AO CARRINHO" sublinhado (1px, 4px abaixo do texto)
- Espaço entre cards: 48px na vertical.

### 6.9 Botões e links

| Tipo | Aparência | Uso |
|---|---|---|
| **Link CTA (primário)** | Texto `label` 11px semibold caixa alta + ícone 12px à esquerda. Sem caixa. Hover: opacidade 0.7 | Padrão em todo o site |
| **Link sublinhado** | Igual ao primário, com `text-decoration` de 1px e offset 4px | Cards de produto |
| **Botão circular** | 32px, fundo dourado, ícone preto. Hover: escala 1.08 | "Conheça +", abrir gaveta |
| **Botão play** | 36px, borda 1px dourada, transparente | Vídeos |
| **Botão sólido** (extensão para formulários e checkout) | Altura 48px, padding 0 32px, raio 0, fundo dourado, texto **preto** 11px semibold, letter-spacing 2px. Variante contorno: borda 1px dourada, texto dourado | Enviar formulário, finalizar compra |

Nunca use botões arredondados (pill), com gradiente ou com sombra.

### 6.10 Formulários (`.theme-white`)
- Campo com linha inferior de 1px (sem caixa), altura 44px, label 14px peso 300 cinza.
- Foco: linha inferior fica `--color-ink` (no escuro, dourada).
- Erro: texto 11px em `--color-ink` com ícone. Não use vermelho vivo.

### 6.11 Breadcrumb
- Fundo branco, `small`: "MARCA • Categoria", com a marca em semibold `ink` e a categoria em cinza.

### 6.12 Rodapé
- Fundo preto. Marca centralizada no topo (dourada ou branca).
- 4 colunas: título em `small` semibold caixa alta, branco `#f9f9f9`; links em 14px peso 300, `--color-gray-400`, 27px entre linhas.
- Divisória de 1px; abaixo, idioma/região à esquerda e ícones sociais à direita (14px, cinza).
- Texto legal 11px cinza.

---

## 7. Imagem e vídeo

- **Luz:** quente, dourada/âmbar, como luz de vela ou fim de tarde. Fundos escuros.
- **Enquadramento:** close-ups de pele, mãos e rostos parcialmente cortados; macros de textura (creme, óleo, gotas).
- **Produto:** fotografado em fundo ivory liso ou recortado (PNG sem fundo).
- **Vídeo:** sem som por padrão, loop, play/pausa visíveis.
- Proporções: hero 16:9 · destaque 4:5 ou 1:1 · produto 1:1 · miniatura de vídeo 3:2.
- Use apenas imagens próprias ou de bancos gratuitos (Unsplash, Pexels). Placeholders: gradiente radial âmbar → preto.

---

## 8. Movimento

- Transição padrão: `var(--dur)` (0.3s) com `var(--ease)` = `cubic-bezier(.25,.46,.45,.94)`.
- **Revelar ao rolar:** elementos entram com `opacity 0 → 1` e `translateY(24px → 0)` em 0.9s, um após o outro (atraso de 120ms).
- Hover de link: opacidade 1 → 0.7. Hover de imagem: zoom 1 → 1.03 em 0.5s.
- Nada de bounce, rotação ou parallax exagerado.
- Respeite `prefers-reduced-motion` (já está nos tokens).

---

## 9. Voz e texto

- **Eyebrows:** verbos no imperativo ou categorias curtas, em maiúsculas: REGENERE · RESTAURE · PREPARE · SUAVIZE · PESQUISA · INGREDIENTES.
- **Títulos:** curtos, substantivos fortes: "INGREDIENTES EXCEPCIONAIS", "REGENERAÇÃO DEFINITIVA".
- **Corpo:** sensorial e confiante, frases médias, sem emojis, sem exclamações, sem gírias.
- **CTAs:** "CONHEÇA", "ADICIONAR AO CARRINHO", "VER O FILME", "DESCOBRIR".

---

## 10. Acessibilidade

- Contraste mínimo 4.5:1 para texto (ver regras da seção 2).
- Foco visível: `outline: 1px solid var(--accent); outline-offset: 4px`.
- Todo ícone clicável tem `aria-label`. Toda imagem tem `alt` descritivo.
- Área mínima de toque: 44×44px (no botão circular de 32px, aumente a área clicável com padding invisível).
- Vídeos decorativos com botão de pausa acessível.

---

## 11. Faça / Não faça

✅ Faça
- Use apenas tokens de `tokens.css`
- Muito espaço em branco (preto)
- Títulos em caixa alta, peso 300, letter-spacing largo
- Alterne imagem e texto entre esquerda e direita
- Ícones de linha fina

❌ Não faça
- Inventar cores, tamanhos ou espaçamentos
- Usar negrito em títulos grandes
- Usar dourado para texto sobre fundo claro (use `gold-deep`)
- Colocar sombras, gradientes coloridos, cantos arredondados grandes ou botões pill
- Usar logos, nomes, fotos ou fontes de marcas reais
- Encher a tela de elementos ou textos longos
