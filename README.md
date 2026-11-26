# Site DOMMA — documentação completa

Página de coleção da marca **DOMMA** (glosses labiais e perfumes), com a estrutura de seções e a estética de uma página editorial de alta perfumaria (referência: página Sublimage Les Extraits da Chanel). Visual: sistema de design **Noir & Or** (preto, dourado e marfim).

> **Regra de ouro:** antes e depois de qualquer alteração, rode
> `node tools/verificar-site.mjs` e só publique se aparecer **"Tudo certo"**.
> Depois de cada alteração aprovada, faça um **commit** no Git (veja "Histórico e como voltar atrás").

---

## 1. Estrutura de pastas

```
domma-site/
├── index.html              ← a página inteira (todas as seções)
├── css/
│   ├── tokens.css          ← cores, fontes, tamanhos, espaços (NÃO escreva valores soltos fora daqui)
│   └── site.css            ← estilo de cada seção/componente
├── js/
│   └── site.js             ← vídeos, parallax, gavetas, carrossel, produtos da grade, newsletter
├── img/                    ← fotos (já otimizadas, 1600px no lado maior)
├── video/                  ← vídeos comprimidos para web
├── tools/
│   └── verificar-site.mjs  ← verificação automática (arquivos, IDs, sintaxe)
├── DESIGN.md               ← sistema de design Noir & Or (regras visuais)
├── styleguide.html         ← vitrine visual dos componentes do sistema
├── .agents/rules/          ← regras que o Antigravity segue automaticamente
└── README.md               ← este arquivo
```

Para abrir: dê dois cliques em `index.html` ou, no Antigravity, peça para servir a pasta (ex.: `npx serve .`).

---

## 2. Seções da página (na ordem)

| # | Seção | Onde no HTML | O que tem |
|---|---|---|---|
| 1 | Cabeçalho | `<header class="header">` | Logo "DOMMA" (texto) no centro; busca, conta, favoritos, sacola |
| 2 | Barra da coleção (fixa ao rolar) | `.subnav` | A coleção · O filme · Gloss labial · Perfumes · Comprar. No celular vira lista (`#subnav-select`) |
| 3 | Vídeo do topo (hero) | `#hero` | 3 filmes em sequência, sem som: Gloss → Celina → Glam'mor Intense. Linhas de capítulo, botões pausar e som. Parallax |
| 4 | Título | `.hero__copy` | "Beleza que revela sua presença" + texto + "Assistir ao filme" |
| 5 | Conheça (tríptico) | `.triptych` | 3 blocos com capa (foto escurecida) que abrem uma janela grande no centro da tela: `#d-tons`, `#d-perfumes`, `#d-design` |
| 6 | Manifesto | `.manifesto` | Parágrafo centralizado |
| 7 | O filme | `#filme` | Filme narrado (48 s) com som, ao clicar |
| 8 | Glosses | `#gloss` | 3 blocos imagem + texto (Berry, Chocolate, Prisma) com miniatura de vídeo e luz dourada; faixa de vídeo + frase |
| 9 | Perfumes | `#perfumes` | Glam'mor Intense e Celina; faixa de vídeo + frase |
| 10 | Em cena (carrossel) | `#campanha` | 4 páginas de fotos, setas e contador |
| 11 | Todos os produtos | `#produtos` | Grade em fundo marfim, gerada por `js/site.js` |
| 12 | Trilha | `.breadcrumb` | DOMMA • Beleza e perfumaria |
| 13 | Contato | `.contact` | WhatsApp, Seja afiliada, Newsletter |
| 14 | Rodapé | `<footer>` | 4 colunas, redes sociais, texto legal |
| — | Player | `#player` | Janela que abre os filmes dos produtos |

---

## 3. Como fazer as alterações mais comuns

### Textos
Edite direto no `index.html`. Títulos grandes ficam em caixa alta automaticamente (não digite em maiúsculas).

### Produtos da grade (nome, descrição, foto)
Só em `js/site.js`, na lista `products` no topo:
```js
{ name: "Celina", desc: "Eau de Parfum · 75 ml", img: "img/celina-detalhe.jpg", pos: "50% 65%", hover: "img/celina-caixas.jpg", hpos: "50% 50%" }
```
`img` = foto principal do produto (fundo limpo). `hover` = foto de campanha que aparece ao passar o mouse (opcional).
`pos` / `hpos` = qual parte de cada foto aparece no quadrado (horizontal vertical).

**Preços:** ainda não existem. Para incluir, acrescente `price: "R$ 000,00"` em cada produto e, no `grid.innerHTML`, a linha `<p class="t-small">${esc(p.price)}</p>` depois da descrição.

### Links (comprar, WhatsApp, redes, afiliada)
Procure por `href="#"` no `index.html` e troque pelo link real. Os botões "Comprar" da grade estão em `js/site.js` (`<a href="#" ...>Comprar</a>`).

### Trocar uma foto
Substitua o arquivo em `img/` **mantendo o mesmo nome**. Tamanho recomendado: 1600px no lado maior, JPG qualidade ~80.
Para ajustar o enquadramento, mude o `style="object-position:50% 40%"` da imagem.

### Trocar ou adicionar vídeos
1. Comprima antes (os originais têm centenas de MB):
   ```bash
   # vídeo grande (topo / filme):
   ffmpeg -i ORIGINAL.mp4 -vf "scale=1920:-2,fps=30" -c:v libx264 -preset veryfast -crf 26 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart video/NOME.mp4
   # miniatura (6 s, sem som):
   ffmpeg -ss 3 -t 6 -i video/NOME.mp4 -an -vf "scale=320:-2" -r 24 -c:v libx264 -preset veryfast -crf 28 -pix_fmt yuv420p -movflags +faststart video/prev-NOME.mp4
   # capa (poster):
   ffmpeg -ss 2 -i video/NOME.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 4 img/poster-NOME.jpg
   ```
2. **Vídeos do topo:** lista `clips` em `js/site.js` + um botão `.chapter` por vídeo no `index.html` (com `data-i` 0, 1, 2… na mesma ordem). Se mudar a quantidade, ajuste `grid-template-columns:repeat(3,...)` de `.chapters` no `site.css`.
3. **Miniaturas com luz dourada:** cada `.vthumb` tem `data-film` (filme completo que abre no player) e um `<video src="video/prev-....mp4">` (trecho curto).

| Arquivo | Uso |
|---|---|
| `video/gloss.mp4`, `celina.mp4`, `intense.mp4` | Vídeos do topo, faixas de vídeo e filmes dos produtos |
| `video/filme-domma.mp4` | Filme narrado (seção "O filme") |
| `video/prev-*.mp4` | Trechos das miniaturas com luz dourada |
| `img/poster-*.jpg` | Capas dos vídeos antes de carregar |

### Capas do "Conheça"
Em cada `.triptych__item`, troque a `<img>` dentro de `.triptych__media`. O escurecimento é automático (`filter:brightness(.42)` no `site.css`).

### Janelas do "Conheça"
São os `<dialog class="drawer" id="d-...">` logo depois do tríptico. O botão de cada bloco aponta com `data-drawer="d-..."`.
Cada janela tem duas partes: `.drawer__media` (foto grande à esquerda) e `.drawer__text` (texto + link no fim). No celular a foto fica em cima e o texto embaixo, em tela cheia.
O link no fim (`.drawer__go`) fecha a janela e leva para a seção indicada no `href`. Fecha também com o botão Fechar, a tecla Esc ou clicando fora.

### Newsletter
Hoje mostra a mensagem "Formulário ainda não conectado". Para conectar, troque o trecho final de `js/site.js` (seção Newsletter) pelo envio ao seu serviço de e-mail.

---

## 4. O que o JavaScript precisa (NÃO renomear nem apagar)

**IDs:** `hero`, `hero-pause`, `hero-sound`, `film-video`, `film-play`, `player`, `gallery`, `gallery-count`, `grid`, `newsletter`, `form-note`, `subnav-select`, `colecao`, `filme`, `gloss`, `perfumes`, `produtos`, `d-tons`, `d-perfumes`, `d-design`.

**Classes e atributos:** `.chapter` + `data-i`, `data-drawer`, `data-close`, `.vthumb` (+ `.vthumb__fill`, `.vthumb__glow`), `data-film`, `video.autoloop`, `.gallery__arrow` + `data-dir`, `.gallery__track`, `.subnav__item`, `.reveal`, `.hero__media video`, `.diptych__media img`, `.triptych__media img`, `.wide video` (parallax).

O `tools/verificar-site.mjs` confere tudo isso automaticamente.

---

## 5. Efeitos (como funcionam)

- **Vídeo do topo:** dois `<video>` sobrepostos que se alternam com fade; começa sem som (os navegadores bloqueiam som automático); pausa quando sai da tela.
- **Parallax:** a mídia anda mais devagar que a página dentro da moldura (`.px`, amplitude 6% da altura, escala 1,14).
- **Cards do Conheça crescem ao passar o mouse:** no computador, o card em foco fica mais largo (`flex-grow:1.32`, 0,7 s) e os outros dois encolhem, como na referência da Chanel. No celular os cards ficam empilhados, sem esse efeito. Para mudar a intensidade, altere o `1.32` em `.triptych__item:hover` no `site.css`.
- **Luz dourada nas miniaturas:** contorno SVG (`rect` com `pathLength=1`) que se desenha conforme o trecho avança, com um ponto de brilho na ponta; recomeça a cada repetição.
- **Revelar ao rolar:** elementos `.reveal` aparecem suavemente.
- **Acessibilidade:** com "reduzir movimento" ligado no aparelho, vídeos não tocam sozinhos, o parallax desliga e as miniaturas ficam com o contorno completo.

---

## 6. Informações da marca (confirmadas)

- Slogan: **Beleza que revela sua presença.** (tirado do filme narrado)
- Gloss Labial **01 Berry**, **02 Chocolate**, **03 Prisma**: 5,5 g cada
- **Glam'mor Intense** (grafia com apóstrofo): Eau de Parfum, **100 ml**
- **Celina**: Eau de Parfum, **75 ml** (não 100 ml)
- Textos dos produtos foram escritos só com o que aparece nas fotos (cor, brilho, frasco, tampa). **Não há notas olfativas, benefícios nem preços inventados.**

## 7. Pendências antes de publicar oficialmente

- [ ] Preços dos 5 produtos
- [ ] Logo oficial em SVG/PNG (hoje é "DOMMA" em texto)
- [ ] Links: checkout/comprar, WhatsApp, Instagram, TikTok, "Seja afiliada"
- [ ] Conectar a newsletter a um serviço de e-mail
- [ ] Razão social, CNPJ e endereço no rodapé
- [ ] Revisar os textos dos produtos

---

## 8. Histórico e como voltar atrás

O projeto é um repositório Git. Cada etapa tem uma versão salva (tag).

| Versão | O que entrou |
|---|---|
| v1-estrutura | Página com as mesmas seções da referência, fotos dos produtos, design system Noir & Or |
| v2-videos | Vídeos no topo (3 filmes em sequência), seção "O filme", miniaturas que abrem filmes, faixas de vídeo, fotos da campanha Glam'mor, slogan |
| v3-efeitos | Parallax ao rolar e luz dourada contornando as miniaturas de vídeo |
| v4-capas | Capas nos 3 blocos do "Conheça", foto da modelo Berry no carrossel, README, regras e verificador |
| v5-fotos | Nova foto do Celina no bloco do perfume; foto da mão com os 3 glosses na capa "Três tons assinatura" |
| v6-janela | Janela do "Conheça" centralizada e maior: foto à esquerda, texto à direita e link para a seção do produto |
| v7-fotos-modelos | Modelos nos blocos do Chocolate e do Prisma; grade de produtos troca para foto de campanha ao passar o mouse; aplicação do Chocolate no carrossel |
| v9-conheca-cresce | Cards do "Conheça" crescem na largura ao passar o mouse (os outros encolhem) |

> As versões v1 a v3 foram feitas antes do Git. Da v4 em diante, cada versão tem uma tag no Git; a versão atual é a última da tabela.
> A v8 (vídeos dentro das janelas do "Conheça") foi testada e desfeita a pedido; o site voltou exatamente ao estado da v7.

Comandos úteis (no terminal do Antigravity, dentro da pasta):
```bash
git status                       # o que mudou
git add -A && git commit -m "Troca preço do Celina"   # salvar uma alteração
git log --oneline                # ver histórico
git diff                         # ver exatamente o que mudou antes de salvar
git restore index.html           # desfazer mudanças não salvas em um arquivo
git checkout v4-capas -- .       # voltar todos os arquivos para a versão v4
```
No Antigravity também dá para pedir: *"rode o verificador e faça commit com a mensagem X"*.
