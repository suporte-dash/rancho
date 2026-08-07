# Rancho Pirabas — Landing Page

Landing page institucional para o **Rancho Pirabas**, bar e espaço para eventos à beira-mar em São João de Pirabas (PA), construída a partir de informações públicas encontradas no Google Maps, Instagram e Facebook do estabelecimento.

## Conceito de design — "O Sol Poente"

A página é construída ao redor do maior diferencial real do local: o pôr do sol. Cada seção herda uma cor de um gradiente contínuo que vai do dourado da tarde (Hero) até a noite estrelada (Rodapé), com o disco solar se movendo suavemente (parallax) conforme o usuário rola a página. Uma linha de horizonte em SVG separa as seções, reforçando a narrativa visual.

- **Paleta:** Âmbar do Poente `#ff7a45` · Magenta do Crepúsculo `#c4467a` · Índigo da Noite `#2b2140` · Verde-Rio `#0f4a4d` · Areia `#f7ecd9` · Espuma `#fffbf4`
- **Tipografia:** `Fraunces` (display/serifada) + `Plus Jakarta Sans` (corpo/UI), via Google Fonts.

## Estrutura de pastas

```
rancho-pirabas/
├── index.html          # Página única com todas as seções + SEO/JSON-LD
├── css/
│   └── style.css       # Tokens de design, layout, responsividade, animações
├── js/
│   └── main.js         # Header on-scroll, menu mobile, parallax da foto do hero,
│                        #   scroll reveal (IntersectionObserver), carrossel
│                        #   da galeria, ano dinâmico no rodapé
├── assets/
│   └── images/
│       ├── logo-mark.svg          # Marca (sol + rio)
│       ├── comidas/               # Fotos reais: café da manhã, petiscos etc.
│       ├── deck/                  # Fotos reais: fachada, deck, passarela
│       ├── drinks/                 # Fotos reais: drinks autorais
│       ├── por-do-sol/            # Fotos reais: pôr do sol, decoração
│       ├── visitantes/            # Fotos reais: clientes no ambiente
│       └── cardapio/              # Flyers originais do cardápio (comidas/bebidas)
└── README.md
```

## Tecnologias

HTML5 semântico + CSS3 (custom properties, grid, flexbox) + JavaScript ES6+ puro — **sem frameworks pesados**, sem dependências de build. Basta abrir `index.html` em um servidor estático (ou publicar em qualquer hospedagem).

## SEO implementado

- Meta title/description, Open Graph, Twitter Cards
- `robots`, `canonical`
- Schema.org / JSON-LD do tipo `BarOrPub` (LocalBusiness), com endereço, geolocalização, telefone, horário de funcionamento e redes sociais
- `alt` descritivo em todas as imagens, HTML semântico (`header`, `main`, `section`, `footer`, `figure`)
- Lazy loading nativo (`loading="lazy"`) nas imagens da galeria e no mapa

## ⚠️ Pontos sinalizados para confirmação manual

O link do Google Maps fornecido carrega os dados via JavaScript no navegador, o que impede a extração automática de alguns campos. Os seguintes pontos ainda estão marcados diretamente no código (busque por `[A CONFIRMAR]` e comentários `NOTA PARA MANUTENÇÃO`):

1. **Nota média e quantidade de avaliações do Google** — seção `#avaliacoes` (`index.html`) e bloco `aggregateRating` do JSON-LD. Ainda não confirmado.
2. **Comentários reais de avaliações** — os três cards de depoimento continuam como placeholders; nenhum comentário foi inventado.
3. ~~Fotografias reais~~ — **✅ Resolvido.** O cliente enviou fotos reais do local (fachada, deck, drinks, comidas, pôr do sol e visitantes), já otimizadas e integradas no Hero, na seção Sobre e na Galeria. Organizadas em `assets/images/{comidas,deck,drinks,por-do-sol,visitantes,cardapio}/`.
4. **Site oficial** — não foi localizado um site próprio do estabelecimento; o link fica comentado no HTML (`<!-- <a class="channel-card" href="#">Site oficial</a> -->`) para ativação futura.
5. **Endereço completo** — confirmado apenas parcialmente ("Tv. da Glória"); o número/complemento pode ser adicionado quando disponível.

## Cardápio

Os itens e preços exibidos na seção `#cardapio` foram extraídos de dois flyers oficiais enviados pelo cliente (ver `assets/images/cardapio/`). A seção mostra apenas uma seleção de itens por categoria (para não poluir a página nem desatualizar rápido); os flyers completos ficam disponíveis via botão "Cardápio de comidas" / "Cardápio de bebidas", que abrem as imagens originais em alta resolução. Atualize os preços em `index.html` (bloco `.menu-grid`) sempre que o cardápio mudar.

## Dados confirmados usados no conteúdo

- Nome: Rancho Pirabas
- Cidade/Estado: São João de Pirabas — PA
- Coordenadas: -0.7650672, -47.1740857
- Funcionamento: sexta, sábado e domingo, das 16h às 23h
- Telefone/WhatsApp: (91) 98553-6871
- Instagram: @ranchopirabas (26 mil seguidores)
- Facebook: /ranchopirabas (7,7 mil curtidas)
- Formas de pagamento: Pix, Visa, Mastercard, Elo (confirmado via flyer de cardápio)

## Publicação

O projeto é 100% estático. Basta fazer upload da pasta para qualquer hospedagem (Vercel, Netlify, GitHub Pages, cPanel etc.) e apontar o domínio para `index.html`. Lembre-se de atualizar as URLs absolutas de Open Graph/Twitter Card (`https://www.ranchopirabas.com.br/...`) para o domínio final escolhido.
