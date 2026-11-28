# Site DOMMA — documentação completa

Página de coleção da marca **DOMMA** (glosses labiais e perfumes), com a estrutura de seções e a estética de uma página editorial de alta perfumaria (referência: página Sublimage Les Extraits da Chanel). Visual: sistema de design **Noir & Or** (preto, dourado e marfim).

HTML, CSS e JavaScript puros: **sem dependências e sem etapa de build**.

> **Regra de ouro:** antes e depois de qualquer alteração, rode
> `npm run verificar` (ou `node tools/verificar-site.mjs`) e só publique se aparecer **"Tudo certo"**.
> Depois de cada alteração aprovada, faça um **commit** no Git (veja "Histórico e como voltar atrás").

---

## 1. Estrutura de pastas

```
domma-site/
├── public/                     ← SÓ ESTA PASTA VAI PARA O AR
│   ├── index.html              ← a página inteira (todas as seções)
│   ├── 404.html                ← página "não encontrada" (o Netlify usa sozinho)
│   ├── favicon.svg             ← ícone da aba
│   ├── apple-touch-icon.png    ← ícone ao salvar no celular
│   ├── robots.txt              ← instruções para o Google
│   ├── _headers                ← cache e segurança no Netlify
│   └── assets/
│       ├── css/
│       │   ├── tokens.css      ← cores, fontes, tamanhos, espaços (NÃO escreva valores soltos fora daqui)
│       │   └── site.css        ← estilo de cada seção/componente
│       ├── fonts/            ← Dafora (títulos e logo): .woff e .ttf
│       ├── js/
│       │   └── site.js         ← vídeos, parallax, janelas, painéis do Em cena, produtos, glitter, menu, newsletter
│       ├── img/                ← fotos (1600 px no lado maior) + og-domma.jpg (prévia ao compartilhar)
│       └── video/              ← vídeos comprimidos para web
├── templates/
│   └── design_system.html      ← vitrine do design system (lê ../public/assets/css/tokens.css)
├── docs/
│   └── DESIGN.md               ← regras do sistema de design Noir & Or
├── tools/
│   └── verificar-site.mjs      ← verificação automática antes de publicar
├── extras/
│   └── fotos-sem-uso/          ← fotos que saíram do site (não vão para o ar)
├── .agents/rules/              ← regras que o Antigravity segue automaticamente
├── netlify.toml                ← deploy pelo Git: publica a pasta public/
├── package.json                ← atalhos: npm run verificar / dev / pacote
├── .editorconfig  .gitignore
└── README.md                   ← este arquivo
```

**Para ver no computador:** `npm run dev` (servidor local da pasta `public/`) ou dois cliques em `public/index.html`. Pelo servidor local tudo funciona como no ar; abrindo o arquivo direto, só a newsletter avisa que precisa estar publicada.

---

## 2. Como publicar (deploy)

### Opção A — Arrastar e soltar (mais simples)
1. Rode `npm run verificar` e confira "Tudo certo".
2. Abra o painel do site no Netlify (ou **app.netlify.com/drop** na primeira vez).
3. Arraste a **pasta `public/`** (ou o `domma-site-publicar.zip`, que é a mesma coisa compactada). Não arraste a pasta do projeto inteiro.

### Opção B — Pelo Git (automático)
Conecte o repositório no Netlify. O `netlify.toml` já diz para publicar `public/` e roda o verificador antes: se houver erro, o deploy é cancelado e o site no ar continua o anterior.

### Na primeira publicação
- **Newsletter:** em *Site configuration → Forms*, clique em **Enable form detection** e publique de novo. As inscrições aparecem em *Forms → newsletter*.
- **Domínio próprio:** em *Domain management*. Depois, troque o `og:image` no `<head>` do `index.html` pelo endereço completo (ex.: `https://domma.com.br/assets/img/og-domma.jpg`).

---

## 3. Seções da página (na ordem)

| # | Seção | Onde no HTML | O que tem |
|---|---|---|---|
| 1 | Cabeçalho | `<header class="header">` | Logo "DOMMA" no centro; menu ☰ (celular), lupa (leva aos produtos), conta, favoritos, sacola |
| — | Menu do celular | `#mnav` | Lista de seções em tela cheia, abre pelo ☰ |
| 2 | Barra da coleção | `.subnav`, primeiro item dentro de `<main>` | A coleção · O filme · Perfumes · Gloss labial · Comprar. Acompanha a rolagem, fica clara sobre fundo claro e some no rodapé. No celular vira lista (`#subnav-select`). **Não mova o menu para dentro de uma seção** |
| 3 | Vídeo do topo | `#hero` | 3 filmes em sequência, sem som: Celina → Glam'mor Intense → Gloss. Linhas de capítulo, pausar e som. Parallax |
| 4 | Título | `.hero__copy` | "Beleza que revela sua presença" + texto + "Assistir ao filme" |
| 5 | Conheça | `.triptych` | 3 cards com capa que crescem ao passar o mouse e abrem uma janela no centro: `#d-perfumes`, `#d-tons`, `#d-design` |
| 6 | Manifesto | `.manifesto` | Parágrafo centralizado |
| 7 | O filme | `#filme` | Filme narrado (48 s) com som, ao clicar |
| 8 | Perfumes | `#perfumes` | Glam'mor Intense (com vídeo de fundo desfocado) e Celina, cada um com preço e botão Comprar; frase |
| 9 | Glosses | `#gloss` | Berry, Chocolate, Prisma com miniatura de vídeo e luz dourada, preço e botão Comprar; frase |
| 10 | Em cena | `#campanha` | 4 painéis que se expandem: 01 Celina, 02 Glam'mor Intense, 03 Três tons (caixas), 04 Chocolate |
| 11 | Todos os produtos | `#produtos` | Grade em fundo marfim, gerada pelo `site.js`, com preço e botão Comprar (foto troca ao passar o mouse) |
| 12 | Presente | `#presente` | "Você chegou ao fim": cupom de boas-vindas com botão Copiar cupom (anunciado no topo da página) |
| 12b | Contato | `#contato` | WhatsApp, Seja afiliada, Novidades (newsletter ou Instagram) |
| 13 | Faixa final | `.breadcrumb` (último item do `<main>`) | "DOMMA • Beleza e perfumaria": no fim é a única coisa visível acima do rodapé |
| 14 | Rodapé | `<footer>` | Ocupa a tela menos a faixa; revelado como cortina |
| — | Barra de compra | `#buybar` | Só no celular: "DOMMA a partir de R$…" + Comprar, fixa embaixo depois do vídeo do topo; some na grade, no presente, no contato e no fim |
| — | Player | `#player` | Janela que abre os filmes dos produtos |

---

## 4. Como fazer as alterações mais comuns

Todos os caminhos abaixo são dentro de `public/`.

### Textos
Edite direto no `index.html`. Títulos grandes ficam em caixa alta automaticamente (não digite em maiúsculas).

### Loja: preços, links de compra, WhatsApp, cupom (tudo num lugar só)
No topo do `assets/js/site.js`, no bloco **`LOJA`**:
```js
produtos: {
  glammor: { nome: "Glam'mor Intense", preco: "R$ 179,90", link: "" },
  ...
},
whatsapp: "",        // só números: "5511999999999"
afiliada: "",        // link para quem quer ser afiliada
cupom: { codigo: "BEMVINDA10", titulo: "10% off na primeira compra" },
newsletterUrl: "",   // endereço do serviço de e-mail (ex.: Formspree)
clarityId: "",       // Microsoft Clarity (mapa de rolagem)
```
- **Os preços e o cupom de hoje são FICTÍCIOS.** Troque antes de divulgar e crie o cupom de verdade na sua loja/checkout.
- O preço aparece sozinho no bloco do produto, na grade e na barra do celular ("a partir de" = o menor preço).
- **Para onde vai o botão Comprar:** o `link` do produto; se estiver vazio, abre o WhatsApp com a mensagem "Olá! Quero comprar …"; se o WhatsApp também estiver vazio, abre o Instagram (@dommaoficiall). "Atendimento por WhatsApp" e "Quero ser afiliada" seguem a mesma ideia.
- Nos blocos de produto, cada botão tem `data-buy="glammor"` (ou `celina`, `berry`, `chocolate`, `prisma`) e o preço fica em `<p class="diptych__price" data-price="...">`. Produto novo: acrescente no `LOJA.produtos` e na lista `products` logo abaixo (com a mesma `key`).

### Produtos da grade (descrição e fotos)
Na lista `products`, logo abaixo do `LOJA`:
```js
{ key: "celina", desc: "Eau de Parfum · 75 ml", img: "assets/img/celina-detalhe.jpg", pos: "50% 65%", hover: "assets/img/celina-modelo-1.jpg", hpos: "50% 28%" }
```
`key` = produto no `LOJA` (de onde vêm nome, preço e link). `img` = foto principal. `hover` = foto que aparece ao passar o mouse (opcional). `pos` / `hpos` = parte da foto que aparece no quadrado (horizontal vertical).

### Outros links (conta, favoritos, rodapé, TikTok)
Procure por `href="#"` no `index.html` e troque pelo link real. Enquanto estiverem com `#`, clicar neles não faz nada (não pula para o topo). O verificador mostra quantos ainda faltam.

### Trocar uma foto
Substitua o arquivo em `assets/img/` **mantendo o mesmo nome**. Tamanho recomendado: 1600 px no lado maior, JPG qualidade ~80. Para ajustar o enquadramento, mude o `style="object-position:50% 40%"` da imagem.
Com o cache de 7 dias (`_headers`), quem já visitou pode ver a foto antiga por alguns dias. Para trocar na hora, use um nome novo (ex.: `celina-v2.jpg`) e atualize as referências.

### Trocar ou adicionar vídeos
1. Comprima antes (os originais têm centenas de MB), rodando dentro de `public/`:
   ```bash
   # vídeo grande (topo / filme):
   ffmpeg -i ORIGINAL.mp4 -vf "scale=1920:-2,fps=30" -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart assets/video/NOME.mp4
   # miniatura (6 s, sem som):
   ffmpeg -ss 3 -t 6 -i assets/video/NOME.mp4 -an -vf "scale=320:-2" -r 24 -c:v libx264 -preset veryfast -crf 28 -pix_fmt yuv420p -movflags +faststart assets/video/prev-NOME.mp4
   # capa (poster):
   ffmpeg -ss 2 -i assets/video/NOME.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 4 assets/img/poster-NOME.jpg
   ```
2. **Vídeos do topo:** lista `clips` em `assets/js/site.js` + um botão `.chapter` por vídeo no `index.html` (com `data-i` 0, 1, 2… na mesma ordem). Se mudar a quantidade, ajuste `repeat(3,...)` de `.chapters` no `site.css`.
3. **Miniaturas com luz dourada:** cada `.vthumb` tem `data-film` (filme completo que abre no player) e um `<video src="assets/video/prev-....mp4">` (trecho curto).

| Arquivo | Uso |
|---|---|
| `assets/video/gloss.mp4`, `celina.mp4`, `intense.mp4` | Vídeo do topo, faixas de vídeo e filmes dos produtos |
| `assets/video/filme-domma.mp4` | Filme narrado (seção "O filme") |
| `assets/video/prev-*.mp4` | Trechos das miniaturas com luz dourada |
| `assets/video/glammor-fundo.mp4` | Fundo desfocado do bloco do Glam'mor Intense (já desfocado no arquivo, vai e volta para emendar sem corte) |
| `assets/img/poster-*.jpg` | Capas dos vídeos antes de carregar |
| `assets/img/og-domma.jpg` | Imagem que aparece ao compartilhar o link (1200×630) |

### Capas e janelas do "Conheça"
Capas: em cada `.triptych__item`, troque a `<img>` dentro de `.triptych__media` (o escurecimento é automático).
Janelas: são os `<dialog class="drawer" id="d-...">` logo depois. Cada uma tem `.drawer__media` (foto) e `.drawer__text` (texto + link `.drawer__go`, que fecha a janela e leva à seção do `href`).

### Design system (templates/design_system.html)
Vitrine com cores, tipografia, botões e componentes. Lê `../public/assets/css/tokens.css`, então mudar uma cor no `tokens.css` muda o site e a vitrine juntos. Se mover a página de pasta, ajuste o `href` do `<link>` no topo e rode o verificador.

### Newsletter
O formulário envia para `LOJA.newsletterUrl` (ex.: um formulário do Formspree, que manda as inscrições para o seu e-mail). **Na Vercel o Netlify Forms não funciona**, então, enquanto o endereço estiver vazio, o formulário some e no lugar aparece "Novidades: Seguir @dommaoficiall" (`#news-alt`). Publicado no Netlify, sem endereço, ele volta a usar o Netlify Forms. Há um campo escondido anti-spam (`empresa`).

### Medir até onde as clientes rolam
- **Vercel Web Analytics:** no painel da Vercel, abra o projeto → *Analytics* → *Enable*. O site já carrega o script sozinho (`LOJA.vercelAnalytics`). Mostra visitas, páginas e de onde vieram.
- **Microsoft Clarity (grátis):** crie um projeto em clarity.microsoft.com com o endereço do site, copie o *Project ID* e cole em `LOJA.clarityId`. Mostra o mapa de rolagem (até onde cada pessoa desceu), cliques e gravações das visitas.

---

## 5. O que o JavaScript precisa (NÃO renomear nem apagar)

**IDs:** `hero`, `hero-pause`, `hero-sound`, `film-video`, `film-play`, `player`, `grid`, `newsletter`, `form-note`, `subnav-select`, `colecao`, `filme`, `gloss`, `perfumes`, `campanha`, `produtos`, `contato`, `d-tons`, `d-perfumes`, `d-design`, `mnav`, `conteudo`, `presente`, `gift-copy`, `gift-note`, `news-alt`, `buybar`.

**Classes e atributos:** `.chapter` + `data-i`, `data-drawer`, `data-close`, `data-mnav-open`, `.vthumb` (+ `.vthumb__fill`, `.vthumb__glow`), `data-film`, `video.autoloop`, `.scene` (+ `.scene__text`, `.scene__num`, `.scene__title`, `.scene__desc`, classe `.is-open`), `.subnav`, `.subnav__item`, `.glitter`, `.reveal`, `.hero__media video`, `.diptych__media img`, `.triptych__media img`, `.wide video` (parallax); `data-buy`, `data-price`, `data-from`, `data-whats`, `data-afiliada`, `data-cupom`, `data-cupom-titulo` (preenchidos pelo `LOJA`).

O verificador confere tudo isso automaticamente, além de todos os links internos `#secao`.

---

## 6. Efeitos (como funcionam)

- **Fontes:** títulos grandes, logo DOMMA e menu do celular usam **Dafora** (`--font-display`, arquivos em `assets/fonts/`, declarada no `tokens.css`); o resto (parágrafos, rótulos, botões, menus, preços) usa **DM Sans** (`--font-sans`, carregada do Google Fonts pelo `<link>` no `<head>` do `index.html`, do `404.html` e do design system). Para trocar a fonte dos títulos, mude `--font-display` no `tokens.css`.
- **Blur nas fotos:** no computador, as capas do "Conheça" e os painéis do "Em cena" ficam desfocadas (as fotos dos blocos de produto ficam sempre nítidas, desde a v33) e ficam nítidas ao passar o mouse (0,6 s). No celular e em aparelhos sem mouse ficam sempre nítidas. A grade de produtos e os vídeos não têm blur. Intensidade: `--photo-blur` (6 px) no fim do `site.css`.
- **Vídeo do topo:** dois `<video>` sobrepostos que se alternam com fade; começa sem som (os navegadores bloqueiam som automático); pausa quando sai da tela.
- **Parallax:** a mídia anda mais devagar que a página dentro da moldura (`.px`, amplitude 6% da altura, escala 1,14).
- **Painéis do Em cena (acordeão):** 4 painéis lado a lado (`.scenes` > `.scene`). No computador, o painel com o mouse se abre (`flex-grow:2.6`, 0,8 s), os outros encolhem, e aparecem o título maior e a descrição. Clicar deixa o painel aberto (`.is-open`). No celular (até 960 px) os painéis ficam empilhados como faixas de 132 px; tocar abre o painel e o primeiro já começa aberto. Para trocar foto/texto, edite cada `<article class="scene">` no `index.html` (`object-position` ajusta o enquadramento). Intensidade: o `2.6` no fim do `site.css`.
- **Imagens que surgem ao rolar:** as fotos e vídeos dos blocos de produto, do Conheça, do Em cena, de "O filme" e da grade de produtos surgem de baixo para cima (como uma cortina abrindo) com um leve zoom que assenta, quando chegam na tela. Imagens que entram juntas surgem uma depois da outra. Quando a imagem sai totalmente da tela, ela se esconde e repete o efeito na volta. O vídeo do topo não tem o efeito. O `site.js` põe a classe `.img-rise` nas molduras (lista em `rises`); velocidade da cortina (1.4s) e do zoom (1.9s, de 1.18) no fim do `site.css`; atraso entre imagens: `RISE_STAGGER` (0,12 s) no `site.js`. Com "reduzir movimento", as imagens aparecem normais.
- **Títulos que sobem por trás de uma máscara:** todos os títulos grandes (`.t-display-xl` e `.t-display-l`, inclusive os das janelas do Conheça) entram subindo de baixo para cima, cortados na linha, uma linha depois da outra, quando aparecem na tela. Quando o título sai totalmente da tela, ele se esconde de novo e repete o efeito na volta. O `site.js` divide o título em palavras (`<span class="tw"><span class="tw__in">`) e guarda o texto original no `aria-label`. Velocidade: `1.2s` em `.title-mask .tw__in` no fim do `site.css`; atraso entre linhas: `LINE_DELAY` (0,14 s) no `site.js`. Para tirar o efeito de um título, troque a classe dele por outra ou remova-o da busca `.t-display-xl, .t-display-l` no `site.js`. Escreva os títulos como texto simples (pode usar `<br>`), sem `<span>` dentro.
- **Texto digitado com a rolagem:** textos com `class="write"` são digitados letra por letra conforme a página rola, com um cursor dourado piscando onde a digitação está; parou de rolar, a digitação para; rolando para cima, o texto é apagado de trás para frente. Está no manifesto e nas 2 frases grandes (as descrições dos produtos ficam legíveis na hora, desde a v33) ("Do toque do gloss..." e "Uma presença que fica na memória"). Num `<p>` simples, ponha `class="write"` no próprio `<p>`; quando o `<p>` tem glitter dentro, ponha o texto num `<span class="write">` (senão o glitter é apagado junto). Escreva só texto simples dentro (sem `<strong>`/links). Começo e fim da digitação: `WRITE_START` (0.95) e `WRITE_END` (0.42) no `site.js`, posições na altura da tela (diminuir o `WRITE_END` deixa a digitação mais lenta). Cursor: `.typer .ch.is-caret::after` no fim do `site.css`.
- **Vídeo de fundo desfocado (Glam'mor Intense):** o bloco do perfume na seção Perfumes tem `class="diptych diptych--bg"` e um `<div class="diptych__bg">` com o vídeo `glammor-fundo.mp4`. O desfoque já vem gravado no vídeo (mais leve para o celular). A força é a `opacity` (0.38) em `.diptych__bg video` no fim do `site.css`; as bordas de cima e de baixo somem no preto. Toca só quando aparece na tela. Para usar em outro produto, copie o `<div class="diptych__bg">`, acrescente `diptych--bg` no `<article>` e gere o vídeo com:
  `ffmpeg -i ORIGINAL.mp4 -an -filter_complex "[0:v]scale=960:-2,gblur=sigma=9,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0,format=yuv420p" -r 24 -c:v libx264 -preset veryfast -crf 30 -movflags +faststart assets/video/NOME-fundo.mp4`
- **Cards do Conheça crescem ao passar o mouse:** no computador, o card em foco fica mais largo (`flex-grow:1.32`, 0,7 s) e os outros encolhem. No celular ficam empilhados. Intensidade: o `1.32` em `.triptych__item:hover` no `site.css`.
- **Glitter dourado:** partículas em `<canvas>` dentro de `<span class="glitter ...">` que cintilam e sobem devagar, com parallax (cursor e rolagem) e brilho mais forte num raio de ~120 px do cursor (`HALO` no `site.js`). Ficam ao lado do título principal, no manifesto, em "O filme", na frase dos perfumes, em "Em cena" e no logo do rodapé. Só animam quando visíveis. Para tirar de um lugar, apague o `<span>`; brilho: quantidade (`/ 2600`) e opacidade (`0.62`) no `site.js`.
- **Rodapé revelado (cortina):** o `<main>` tem fundo e fica por cima (`z-index:1`); o rodapé fica preso no fim da tela (`position:sticky; bottom:0`). Só vale em telas com 640 px ou mais de altura. **Toda seção nova dentro de `<main>` precisa ter cor de fundo**, senão o rodapé aparece por trás.
- **Menu claro/escuro:** escuro sobre fundo preto, claro (`.is-light`) sobre produtos, contato e faixa final; some (`.is-gone`) quando o rodapé aparece.
- **Fim da página:** o rodapé tem a altura da tela menos a faixa branca (`--crumb-h`, 56 px).
- **Luz dourada nas miniaturas:** contorno SVG (`rect` com `pathLength=1`) que se desenha conforme o trecho avança, com brilho na ponta.
- **Revelar ao rolar:** elementos `.reveal` aparecem suavemente. Só ficam escondidos se o JavaScript carregou (classe `js` no `<html>`); sem JavaScript, tudo aparece normalmente.
- **Acessibilidade:** atalho "Pular para o conteúdo" (aparece ao apertar Tab); com "reduzir movimento" ligado no aparelho, vídeos não tocam sozinhos, o parallax desliga e as miniaturas ficam com o contorno completo.

---

> **Ordem dos produtos:** perfumes vêm sempre antes dos glosses (vídeo do topo, Conheça, seções, menus, grade e rodapé). Ao adicionar um produto novo, siga essa ordem.

## 7. Informações da marca (confirmadas)

- Slogan: **Beleza que revela sua presença.** (tirado do filme narrado)
- Gloss Labial **01 Berry**, **02 Chocolate**, **03 Prisma**: 5,5 g cada
- **Glam'mor Intense** (grafia com apóstrofo): Eau de Parfum, **100 ml**
- **Celina**: Eau de Parfum, **75 ml** (não 100 ml). Atenção: nas fotos `celina-modelo-1/2` o frasco diz "Desodorante Colônia 100ML"
- Textos dos produtos foram escritos só com o que aparece nas fotos. **Não há notas olfativas, benefícios nem preços inventados.**

## 8. Pendências antes de divulgar

- [ ] **Preços reais** dos 5 produtos (hoje são fictícios, no `LOJA` do `site.js`)
- [ ] **Links de compra** de cada produto e **número do WhatsApp** (no `LOJA`)
- [ ] **Cupom de verdade** criado no checkout (hoje `BEMVINDA10` é fictício)
- [ ] Endereço da newsletter (`LOJA.newsletterUrl`) e ID do Clarity (`LOJA.clarityId`)
- [ ] Notas olfativas dos perfumes, frete e formas de pagamento
- [ ] Confirmar o rótulo do Celina (foto diz "Desodorante Colônia 100ML", site diz Eau de Parfum 75 ml)
- [ ] Logo oficial em SVG/PNG (hoje é "DOMMA" em texto)
- [x] Instagram (@dommaoficiall) no rodapé
- [ ] Links: checkout/comprar, WhatsApp, TikTok, "Seja afiliada", conta, favoritos e links do rodapé (o verificador mostra quantos faltam)
- [ ] Domínio próprio e `og:image` com endereço completo
- [ ] Razão social, CNPJ e endereço no rodapé
- [ ] Revisar os textos dos produtos

---

## 9. Histórico e como voltar atrás

O projeto é um repositório Git. Cada etapa tem uma versão salva (tag).

| Versão | O que entrou |
|---|---|
| v1-estrutura | Página com as mesmas seções da referência, fotos dos produtos, design system Noir & Or |
| v2-videos | Vídeos no topo (3 filmes em sequência), seção "O filme", miniaturas que abrem filmes, faixas de vídeo, fotos da campanha Glam'mor, slogan |
| v3-efeitos | Parallax ao rolar e luz dourada contornando as miniaturas de vídeo |
| v4-capas | Capas nos 3 blocos do "Conheça", foto da modelo Berry no carrossel, README, regras e verificador |
| v5-fotos | Nova foto do Celina no bloco do perfume; mão com os 3 glosses na capa "Três tons assinatura" |
| v6-janela | Janela do "Conheça" centralizada e maior |
| v7-fotos-modelos | Modelos nos blocos do Chocolate e do Prisma; grade troca para foto de campanha ao passar o mouse |
| v9-conheca-cresce | Cards do "Conheça" crescem na largura ao passar o mouse |
| v10-glitter | Glitter dourado sutil em alguns cantos do site |
| v11-glitter-interativo | Glitter com parallax e brilho mais forte perto do cursor |
| v12-bordas-suaves | Bordas das fotos suavizadas (desfeito na v16) |
| v13-menu-rodape | Menu acompanha a rolagem; rodapé revelado como cortina |
| v14-fim-pagina | Menu some no rodapé; faixa "DOMMA • Beleza e perfumaria" depois do contato |
| v15-em-cena-celina | Duas fotos novas da modelo com o Celina no "Em cena" |
| v16-sem-suavizacao | Bordas suaves removidas |
| v17-em-cena-ordem | "Em cena" começa pelo Celina; página dos glosses só com o Chocolate |
| v18-pele-tratada | Foto da aplicação do Chocolate com limpeza de pele |
| v19-celina-grade | Card do Celina: modelo segurando o perfume ao passar o mouse |
| v20-templates | Design system em `templates/design_system.html`, lendo os tokens do site |
| v21-estrutura-deploy | Projeto reorganizado para deploy (`public/`, `docs/`, `extras/`); 404, favicon, prévia de compartilhamento, cache e segurança; menu do celular; newsletter no Netlify Forms; correções |
| v22-celina-modelo | Bloco do Celina (seção Perfumes) com a foto da modelo segurando o perfume |
| v23-fonte-dafora | Fonte Dafora nos títulos, no logo e no menu do celular; corrige o rodapé que cobria a parte de baixo do cabeçalho |
| v24-instagram | Botão do Instagram no rodapé ligado a @dommaoficiall (abre em nova aba) |
| v25-blur-fotos | Fotos desfocadas que ficam nítidas ao passar o mouse (blocos de produto, capas do Conheça, Em cena) |
| v26-em-cena-paineis | Carrossel do "Em cena" trocado por 4 painéis que se expandem (efeito acordeão); celina-modelo-2 e glammor-maos foram para `extras/fotos-sem-uso/` |
| v27-glammor-fundo | Vídeo de fundo desfocado e suave no bloco do Glam'mor Intense |
| v28-titulos-mascara | Títulos grandes sobem por trás de uma máscara, linha por linha, ao aparecer na tela |
| v29-texto-escrito | Descrições, manifesto e frases se escrevem da esquerda para a direita conforme a rolagem (trocado na v30) |
| v30-texto-digitado | Descrições, manifesto e frases digitados letra por letra conforme a rolagem, com cursor piscando |
| v31-perfumes-primeiro | Perfumes antes dos glosses em todo o site: vídeo do topo, Conheça, seções, menus, grade de produtos e rodapé |
| v32-imagens-surgem | Fotos e vídeos surgem de baixo para cima com zoom suave ao rolar |
| v33-versao-comercial | Preços (fictícios) e botão Comprar em cada produto, "Comprar agora" no topo, barra de compra no celular, presente/cupom no fim, fotos de produto nítidas, descrições sem digitação, sem as faixas de vídeo, vídeos do topo leves no celular, newsletter sem erro na Vercel, Vercel Analytics e Clarity prontos |
| v34-fonte-dm-sans | Textos menores (parágrafos, rótulos, botões, menus, preços, contato e rodapé) em DM Sans no lugar da Montserrat |

> As versões v1 a v3 foram feitas antes do Git. A v8 (vídeos nas janelas do "Conheça") foi testada e desfeita.

Comandos úteis (no terminal do Antigravity, dentro da pasta do projeto):
```bash
npm run verificar                # checar o site antes de publicar
npm run dev                      # ver o site no computador
npm run pacote                   # gerar domma-site-publicar.zip a partir de public/
git status                       # o que mudou
git add -A && git commit -m "Troca preço do Celina"   # salvar uma alteração
git log --oneline                # ver histórico
git restore public/index.html    # desfazer mudanças não salvas em um arquivo
git checkout v20-templates -- .  # voltar todos os arquivos para uma versão
```
No Antigravity também dá para pedir: *"rode o verificador e faça commit com a mensagem X"*.
