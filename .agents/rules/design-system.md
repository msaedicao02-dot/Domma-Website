# Design System — regras obrigatórias

- A fonte única da verdade visual é @DESIGN.md. Leia antes de qualquer tarefa de interface.
- Todos os valores (cores, fontes, tamanhos, espaçamentos, raios, sombras, duração de animação) vêm de @css/tokens.css via `var(--...)`. Nunca escreva HEX, px de fonte ou espaçamentos soltos nos componentes.
- Importe `tokens.css` uma única vez no CSS global do projeto, antes de qualquer outro estilo.
- Antes de criar um componente, confira se ele já existe em @styleguide.html e reproduza a mesma estrutura e as mesmas classes.
- Títulos: caixa alta, peso 300, letter-spacing dos tokens. Nunca negrito em títulos grandes.
- Dourado (`--color-gold`) só para texto sobre fundos escuros. Sobre ivory/branco use `--color-gold-deep` ou `--color-bronze`.
- Sem sombras, sem gradientes coloridos, sem botões arredondados (pill), raio 0 por padrão.
- Não usar logos, nomes, fotos, vídeos ou fontes de marcas reais. Use a marca do projeto e placeholders.
- Todo layout deve funcionar em 375px, 768px e 1440px. Teste os três no navegador e envie screenshots antes de concluir.
- Respeite `prefers-reduced-motion` e o contraste mínimo de 4.5:1.
- Se algo não estiver definido no DESIGN.md, PERGUNTE antes de decidir. Não invente.
