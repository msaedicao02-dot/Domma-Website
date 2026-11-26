# Site DOMMA — regras para não quebrar o site

- Leia @README.md antes de qualquer alteração: ele explica cada seção, cada arquivo e o que o JavaScript precisa.
- ANTES e DEPOIS de qualquer mudança, rode `node tools/verificar-site.mjs`. Se aparecer "ERRO", corrija antes de seguir.
- Faça uma alteração por vez e um commit do Git ao final de cada alteração aprovada, com mensagem em português explicando o que mudou.
- Nunca renomeie nem apague os IDs e atributos listados no README (seção "O que o JavaScript precisa"). Se precisar mudar um, mude também em js/site.js.
- Para trocar foto ou vídeo, substitua o arquivo mantendo o MESMO nome. Se usar nome novo, atualize todas as referências (index.html e js/site.js).
- Vídeos novos: comprima antes (ver README, seção "Vídeos"). Nunca coloque arquivos de vídeo originais (centenas de MB) no site.
- Produtos da grade ficam só em js/site.js (lista `products`). Não duplique no HTML.
- Fatos da marca que não podem mudar sem a confirmação do dono: grafia "Glam'mor Intense"; Celina tem 75 ml (não 100 ml); Glam'mor Intense tem 100 ml; glosses têm 5,5 g; slogan "Beleza que revela sua presença".
- Não invente preços, notas olfativas, benefícios ou depoimentos. Se faltar informação, pergunte.
- Teste em 390px (celular) e 1440px (computador) e confira se o vídeo do topo toca, as gavetas abrem e as miniaturas mostram a luz dourada.
