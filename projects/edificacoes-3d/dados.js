/*
 * dados.js · Edificações 3D.
 * Catálogo dos projetos 3D (SketchUp): título, categoria, descrição e imagens.
 * Para incluir um projeto, acrescente um objeto; a primeira imagem é a capa.
 */
const PROJETOS = [
  {
    "id": "uma-maravilha",
    "titulo": "Uma maravilha",
    "categoria": "Residências",
    "descricao": "Casa térrea com fachada contemporânea, varanda integrada e paisagismo.",
    "imagens": [
      "projeto-13-1.png",
      "projeto-13-2.png",
      "projeto-13-3.png",
      "projeto-13-4.png",
      "projeto-13-5.png",
      "projeto-13-6.png",
      "projeto-13-7.png"
    ]
  },
  {
    "id": "um-lar",
    "titulo": "Um lar",
    "categoria": "Residências",
    "descricao": "Residência compacta pensada para família pequena, com áreas sociais abertas.",
    "imagens": [
      "projeto-14-1.png",
      "projeto-14-2.png",
      "projeto-14-3.png",
      "projeto-14-4.png"
    ]
  },
  {
    "id": "um-classico",
    "titulo": "Um Clássico",
    "categoria": "Residências",
    "descricao": "Linhas tradicionais, telhado aparente e alpendre na entrada.",
    "imagens": [
      "projeto-9-1.png",
      "projeto-9-2.png",
      "projeto-9-3.png",
      "projeto-9-4.png"
    ]
  },
  {
    "id": "no-detalhe",
    "titulo": "No detalhe",
    "categoria": "Residências",
    "descricao": "Estudo de acabamentos, esquadrias e iluminação da fachada.",
    "imagens": [
      "projeto-10-1.png",
      "projeto-10-2.png",
      "projeto-10-3.png",
      "projeto-10-4.png"
    ]
  },
  {
    "id": "casa-romance",
    "titulo": "Casa Romance",
    "categoria": "Residências",
    "descricao": "Maquete humanizada com mobiliário, vegetação e iluminação natural.",
    "imagens": [
      "casa-1-humanizada-1.png",
      "casa-1-humanizada-2.png",
      "casa-1-humanizada-3.png",
      "casa-1-humanizada-4.png",
      "casa-1-humanizada-5.png",
      "casa-1-humanizada-6.bmp",
      "casa-1-humanizada-7.png",
      "casa-1-humanizada-8-projeto.bmp"
    ]
  },
  {
    "id": "casa-de-sol",
    "titulo": "Casa de Sol",
    "categoria": "Residências",
    "descricao": "Projeto social de casa popular com ventilação cruzada e quintal.",
    "imagens": [
      "casa-2-casa-amiga-1.png",
      "casa-2-casa-amiga-2.png",
      "casa-2-casa-amiga-3.png",
      "casa-2-casa-amiga-4.png",
      "casa-2-casa-amiga-5.png",
      "casa-2-casa-amiga-6.bmp",
      "casa-2-casa-amiga-7.bmp"
    ]
  },
  {
    "id": "uma-casinha",
    "titulo": "Uma Casinha",
    "categoria": "Residências",
    "descricao": "Casa modelo de um pavimento, ideal para lotes estreitos.",
    "imagens": [
      "casa-3-casa-modelo-1.png",
      "casa-3-casa-modelo-2.png"
    ]
  },
  {
    "id": "meu-sitio",
    "titulo": "Meu sítio",
    "categoria": "Residências",
    "descricao": "Casa de campo com varanda ampla e área de lazer.",
    "imagens": [
      "casa-4-sitio-1.png",
      "casa-4-sitio-2.png"
    ]
  },
  {
    "id": "minha-casa-minimalista",
    "titulo": "Minha casa minimalista",
    "categoria": "Residências",
    "descricao": "Volumes puros, churrasqueira com piscina e vistas de frente, fundos, alto e planta.",
    "imagens": [
      "projeto-2-1.png",
      "projeto-2-2.png",
      "projeto-2-3.png",
      "projeto-2-4.png",
      "projeto-2-5.png",
      "projeto-2-6.png",
      "projeto-2-7.png",
      "projeto-2-8.png"
    ]
  },
  {
    "id": "minhas-ferias",
    "titulo": "Minhas férias",
    "categoria": "Residências",
    "descricao": "Casa de veraneio com deck e integração com a área externa.",
    "imagens": [
      "projeto-3-1.png",
      "projeto-3-2.png",
      "projeto-3-3.png",
      "projeto-3-4.png",
      "projeto-3-5.png",
      "projeto-3-6.png",
      "projeto-3-7.png",
      "projeto-3-8.png"
    ]
  },
  {
    "id": "do-meu-jeito",
    "titulo": "Do meu jeito",
    "categoria": "Residências",
    "descricao": "Projeto personalizado com cores e materiais escolhidos pelo cliente.",
    "imagens": [
      "projeto-7-1.png",
      "projeto-7-2.png",
      "projeto-7-3.png",
      "projeto-7-4.png"
    ]
  },
  {
    "id": "a-realeza",
    "titulo": "A realeza",
    "categoria": "Residências",
    "descricao": "Residência de alto padrão em dois pavimentos.",
    "imagens": [
      "projeto-11-1.png",
      "projeto-11-2.png",
      "projeto-11-3.png",
      "projeto-11-4.png",
      "projeto-11-5.png",
      "projeto-11-6.png"
    ]
  },
  {
    "id": "tracos-certos",
    "titulo": "Traços certos",
    "categoria": "Residências",
    "descricao": "Estudo volumétrico com cortes e perspectivas técnicas.",
    "imagens": [
      "projeto-1-1.jpg",
      "projeto-1-2.jpg",
      "projeto-1-3.jpg"
    ]
  },
  {
    "id": "que-projeto-lindo",
    "titulo": "Que projeto lindo",
    "categoria": "Residências",
    "descricao": "Sobrado com fachada em madeira e grandes aberturas.",
    "imagens": [
      "projeto-8-1.png",
      "projeto-8-2.png",
      "projeto-8-3.png",
      "projeto-8-4.png",
      "projeto-8-5.png",
      "projeto-8-6.png",
      "projeto-8-7.png"
    ]
  },
  {
    "id": "cada-detalhe",
    "titulo": "Cada detalhe",
    "categoria": "Residências",
    "descricao": "Detalhamento de fachada e áreas de convivência.",
    "imagens": [
      "projeto-12-1.png",
      "projeto-12-2.png",
      "projeto-12-3.png",
      "projeto-12-4.png"
    ]
  },
  {
    "id": "nossa-vila",
    "titulo": "Nossa vila",
    "categoria": "Condomínios e vilas",
    "descricao": "Vila de casas geminadas com área comum.",
    "imagens": [
      "vila-1.png",
      "vila-2.png"
    ]
  },
  {
    "id": "era-uma-vez",
    "titulo": "Era uma vez",
    "categoria": "Condomínios e vilas",
    "descricao": "Condomínio residencial em Santo André com blocos e áreas verdes.",
    "imagens": [
      "condominio-1-santo-andre-1.png",
      "condominio-1-santo-andre-2.png",
      "condominio-1-santo-andre-3.png"
    ]
  },
  {
    "id": "cidadezinha",
    "titulo": "Cidadezinha",
    "categoria": "Condomínios e vilas",
    "descricao": "Estudo urbano de pequeno bairro planejado.",
    "imagens": [
      "projeto-4-1.png",
      "projeto-4-2.png",
      "projeto-4-3.png",
      "projeto-4-4.png",
      "projeto-4-5.png"
    ]
  },
  {
    "id": "cidadezinha-crescendo",
    "titulo": "Cidadezinha crescendo",
    "categoria": "Condomínios e vilas",
    "descricao": "Segunda etapa do bairro, com novas quadras e equipamentos.",
    "imagens": [
      "projeto-5-1.png",
      "projeto-5-2.png",
      "projeto-5-3.png",
      "projeto-5-4.png"
    ]
  },
  {
    "id": "minha-casa",
    "titulo": "Minha casa",
    "categoria": "Interiores",
    "descricao": "Ambientes internos: sala de estar e área da piscina.",
    "imagens": [
      "meu-1-sala.bmp",
      "meu-2-piscina.bmp"
    ]
  },
  {
    "id": "linhas-curtas",
    "titulo": "Linhas curtas",
    "categoria": "Móveis",
    "descricao": "Móveis planejados de linhas retas e compactas.",
    "imagens": [
      "movel-1.png",
      "movel-2.png"
    ]
  },
  {
    "id": "linhas-longas",
    "titulo": "Linhas longas",
    "categoria": "Móveis",
    "descricao": "Painéis e bancadas contínuas.",
    "imagens": [
      "movel-3.png",
      "movel-4.png"
    ]
  },
  {
    "id": "linhas-curvas",
    "titulo": "Linhas curvas",
    "categoria": "Móveis",
    "descricao": "Peças com cantos arredondados e acabamento orgânico.",
    "imagens": [
      "movel-5.png",
      "movel-6.png"
    ]
  }
];
/* fim de dados.js */
