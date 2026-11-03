<<<<<<< HEAD
# CIC 2026 — Luiz Henrique Corrêa Monteiro

Website pessoal estático para apresentação acadêmica e profissional no XXXVIII Congresso de Iniciação Científica da UNESP (CIC 2026).

## Tecnologias

- HTML5 semântico
- CSS3 (layout responsivo, animações e temas)
- JavaScript puro
- SVG para ilustrações vetoriais
- Sem build, backend ou dependências JavaScript

## Como abrir localmente

1. Extraia o ZIP.
2. Abra a pasta `cic2026-site`.
3. Clique duas vezes em `index.html` para abrir no navegador.

O site foi estruturado para funcionar diretamente pelo arquivo `index.html`. A fonte Manrope/DM Mono é carregada do Google Fonts quando há internet; fontes de sistema são usadas como alternativa.

## Configuração de links

Edite `config.js`, no objeto `SITE_CONFIG.links`:

```js
links: {
  instagramVideo: "COLOCAR_LINK_DO_VIDEO_AQUI",
  voting: "COLOCAR_LINK_DA_VOTACAO_AQUI",
  laboratory: "https://rick-12q.github.io/SCOM_1_LIFS_SITE/",
  instagram: "COLOCAR_LINK_DO_INSTAGRAM_AQUI",
  linkedin: "https://www.linkedin.com/in/luiz-henrique-corr%C3%AAa-monteiro-681783300/",
  email: "COLOCAR_EMAIL_AQUI"
}
```

Substitua os valores `COLOCAR_..._AQUI` pelos endereços definitivos. O código não abre nem mantém botões quebrados: enquanto o valor for um placeholder, o botão informa que precisa ser configurado.

Para e-mail, você pode informar `nome@dominio.com` ou `mailto:nome@dominio.com`.

## Como substituir sua fotografia

1. Coloque sua foto em `assets/images/`, preferencialmente em JPG ou WebP.
2. Edite `config.js`:
   `profile: "assets/images/profile.jpg"`
3. A imagem é apresentada em proporção vertical e com `object-fit: cover`. Uma foto vertical, com boa iluminação, funciona melhor.

A imagem atual `profile-placeholder.svg` é apenas um placeholder gráfico e não representa uma pessoa real.

## Como inserir as imagens do laboratório

A página do LIFS foi consultada como referência visual, mas o ambiente de criação não conseguiu baixar automaticamente os arquivos de imagem originais do repositório. Por isso, os arquivos atuais são placeholders SVG claramente identificados; não são apresentados como fotografias reais.

Substitua os caminhos no `config.js` pelos arquivos que você inserir em `assets/images/`:

| Campo | Arquivo sugerido | Conteúdo |
|---|---|---|
| `reactor` | `reactor-2.jpg` | Fotografia real do Reator 2 do LIFS (referência principal) |
| `magnetron` | `magnetron-sputtering.jpg` | Equipamento de Magnetron Sputtering |
| `afm` | `afm.jpg` | Imagem/topografia obtida por AFM |
| `laboratory1` | `laboratory-1.jpg` | Vista geral do laboratório |
| `laboratory2` | `laboratory-2.jpg` | Equipamento de caracterização |
| `sample` | `sample.jpg` | Amostras e substratos |
| `profile` | `profile.jpg` | Sua fotografia |

Exemplo:

```js
images: {
  profile: "assets/images/profile.jpg",
  reactor: "assets/images/reactor-2.jpg",
  magnetron: "assets/images/magnetron-sputtering.jpg",
  afm: "assets/images/afm.jpg",
  laboratory1: "assets/images/laboratory-1.jpg",
  laboratory2: "assets/images/laboratory-2.jpg",
  sample: "assets/images/sample.jpg"
}
```

Use imagens em JPG/WebP otimizadas, idealmente com largura de 1200–1800 px. Preserve os créditos e as autorizações de uso das imagens.

## Logo da UNESP

O rodapé contém uma identificação tipográfica “UNESP”, não uma reprodução vetorial da logomarca oficial. Isso evita redesenhar ou distorcer a marca. Para incluir a marca oficial, obtenha o arquivo institucional autorizado e salve-o em `assets/logos/unesp.svg` (ou PNG); depois substitua o bloco `.unesp-wordmark` no rodapé por uma tag `<img>` mantendo as proporções.

Referência institucional consultada: página de identidade visual da Agência UNESP de Inovação e materiais institucionais da Universidade.

## Idioma e tema

- O tema escuro é o padrão.
- O botão de tema alterna entre claro e escuro.
- O botão `EN` alterna para inglês; em inglês, o botão passa a exibir `PT`.
- Tema e idioma ficam salvos em `localStorage` no navegador.
- A faixa de imagens pode ser pausada/retomada pelo botão próprio.
- O site respeita `prefers-reduced-motion`.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (por exemplo, `cic2026-site`).
2. Envie o conteúdo desta pasta para a raiz do repositório: `index.html`, `config.js`, `css/`, `js/` e `assets/`.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde a publicação.
7. Abra o endereço informado pelo GitHub Pages.

Todos os caminhos são relativos, então o site também funciona em repositórios publicados em subcaminhos do GitHub Pages.

## Observações de conteúdo

- Os links do vídeo e da votação permanecem intencionalmente sem URL até serem fornecidos.
- Os valores experimentais apresentados são os informados no briefing. Os gráficos de transmitância e ângulo de contato representam tendências aproximadas, não séries experimentais ponto a ponto.
- O item “Melhor trabalho CIC 2026” foi mantido conforme informado no briefing.
- A marca UNESP no rodapé é identificação textual; não é a logomarca oficial.
=======
# CIC 2026 — Divulgação Científica

![UNESP](https://img.shields.io/badge/UNESP-Sorocaba-1F4E79?style=for-the-badge&logo=academia&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Website desenvolvido para o **Congresso de Iniciação Científica da UNESP (CIC 2026), em Atibaia**, com o propósito de aproximar a pesquisa acadêmica do público e ampliar a divulgação do trabalho científico.

---

## Sobre o projeto

Este site é, antes de tudo, uma iniciativa de **divulgação científica**. A proposta é apresentar de maneira acessível, visual e interativa o trabalho de pesquisa desenvolvido na UNESP, mostrando não apenas os resultados, mas também o processo experimental, os equipamentos, as técnicas e as pessoas envolvidas.

A iniciativa também busca ampliar o alcance da pesquisa para além dos espaços acadêmicos tradicionais. O desenvolvimento do site acompanha minha participação no **Painel de Jovens Comunicadores de Ciência**, para o qual fui selecionado. A ideia é utilizar diferentes formatos e recursos de comunicação para despertar o interesse pela ciência, tornar a pesquisa mais compreensível e valorizar o trabalho realizado nas universidades públicas.

Mais do que um portfólio, este espaço foi pensado como uma ferramenta complementar de comunicação: um lugar em que qualquer pessoa possa conhecer o estudo, entender como ele foi conduzido e descobrir um pouco mais sobre a produção científica da UNESP.

## A pesquisa

**Síntese e caracterização de filmes ultrafinos de carbono**

O trabalho investiga a produção de filmes finos de carbono por meio da técnica de *Magnetron Sputtering* pulsado e sua caracterização por diferentes métodos experimentais.

O site reúne uma apresentação da pesquisa, da metodologia utilizada, dos equipamentos envolvidos e dos principais resultados obtidos, com recursos visuais para facilitar a compreensão do estudo.

## Objetivos de comunicação

- Divulgar a pesquisa desenvolvida na UNESP para públicos dentro e fora da universidade.
- Apresentar conceitos e procedimentos científicos em linguagem acessível.
- Dar visibilidade ao trabalho experimental, aos equipamentos e às etapas da pesquisa.
- Aproximar estudantes, pesquisadores e comunidade do cotidiano da ciência.
- Explorar recursos digitais e interativos como ferramentas de comunicação científica.

## Tecnologias utilizadas

- **HTML5** — estrutura e organização do conteúdo.
- **CSS3** — identidade visual, responsividade, animações e efeitos vinculados à rolagem.
- **JavaScript** — interações, navegação, alternância de tema e efeitos dinâmicos.

O projeto é estático: não exige backend, banco de dados ou processo de compilação.

## Estrutura do projeto

```text
RICK_CIC_WS/
├── index.html
├── config.js
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── images/
│       ├── profile.jpg
│       ├── reactor-2.jpg
│       ├── magnetron-sputtering.jpg
│       ├── dektak-150.jpg
│       ├── lambda-750.jpg
│       ├── rame-hart.jpg
│       ├── park-xe100-afm.jpg
│       ├── afm.jpg
│       └── laboratory-1.jpg
└── README.md
```


Desenvolvido para o **CIC 2026 — UNESP, Atibaia**, como iniciativa de comunicação e divulgação científica.
>>>>>>> 2f7e6b989cfd0cc1964af0506938b5ed2128c86f
