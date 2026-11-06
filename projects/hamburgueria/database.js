/**
 * Hamburguers Mágicos - Database Centralizado
 * Otimizado para o ecossistema learnTECH
 */

export const database = {
  settings: {
    businessUnit: "Hamburguers Mágicos",
    currency: "R$",
    theme: "Dark Premium",
    lastUpdate: "2026-04-21",
  },

  categories: [
    { id: "artesanal", name: "Artesanais Premium" },
    { id: "acompanhamentos", name: "Acompanhamentos Arcanos" },
    { id: "elixires", name: "Elixires (Bebidas)" },
    { id: "sobremesas", name: "Sobremesas Encantadas" },
  ],

  products: [
    // --- CATEGORIA: ARTESANAIS PREMIUM ---
    {
      id: "h1",
      categoryId: "artesanal",
      name: "Mago do Bacon",
      description:
        "Blend de costela 180g, muito bacon crocante, cheddar cremoso e maionese defumada.",
      price: 34.9,
      image: "hamburguer-1.jpg",
      discount: 10,
      isNew: false,
    },
    {
      id: "h2",
      categoryId: "artesanal",
      name: "Feitiço de Picanha",
      description:
        "Picanha pura grelhada no fogo, queijo prato, alface, tomate e cebola roxa.",
      price: 38.0,
      image: "hamburguer-2.jpg",
      discount: 0,
      isNew: true,
    },
    {
      id: "h3",
      categoryId: "artesanal",
      name: "Portal de Cheddar",
      description:
        "Duplo smash de 80g, muito cheddar, picles artesanal e cebola caramelizada.",
      price: 26.5,
      image: "hamburguer-3.jpg",
      discount: 15,
      isNew: false,
    },
    {
      id: "h4",
      categoryId: "artesanal",
      name: "Mestre Supremo",
      description:
        "Hambúrguer alto com múltiplas camadas de queijo, bacon e molho secreto arcano.",
      price: 42.9,
      image: "hamburguer-4.jpg",
      discount: 0,
      isNew: true,
    },
    {
      id: "h5",
      categoryId: "artesanal",
      name: "Eclipse de Carne",
      description:
        "Smash burger com bordas crocantes, pão brioche amanteigado e molho especial.",
      price: 28.0,
      image: "hamburguer-5.jpg",
      discount: 0,
      isNew: false,
    },
    {
      id: "h6",
      categoryId: "artesanal",
      name: "Monstro do Espaço",
      description:
        "A força bruta: 3 carnes de 120g, camadas triplas de queijo e pão artesanal.",
      price: 54.0,
      image: "hamburguer-6.jpg",
      discount: 0,
      isNew: false,
    },
    {
      id: "h7",
      categoryId: "artesanal",
      name: "Monstro do Espaço",
      description:
        "A força bruta: 3 carnes de 120g, camadas triplas de queijo e pão artesanal.",
      price: 54.0,
      image: "hamburguer-7.jpg",
      discount: 0,
      isNew: false,
    },

    {
      id: "h8",
      categoryId: "artesanal",
      name: "Monstro do Espaço",
      description:
        "A força bruta: 3 carnes de 120g, camadas triplas de queijo e pão artesanal.",
      price: 54.0,
      image: "hamburguer-8.jpg",
      discount: 0,
      isNew: false,
    },
    {
      id: "h9",
      categoryId: "artesanal",
      name: "Monstro do Espaço",
      description:
        "A força bruta: 3 carnes de 120g, camadas triplas de queijo e pão artesanal.",
      price: 54.0,
      image: "hamburguer-9.jpg",
      discount: 0,
      isNew: false,
    },
    // --- CATEGORIA: ACOMPANHAMENTOS ARCANOS ---
    {
      id: "a1",
      categoryId: "acompanhamentos",
      name: "Batata Arcana",
      description:
        "Batatas rústicas com páprica defumada e molho especial da casa.",
      price: 18.0,
      image: "batata-rustica.jpg",
      discount: 0,
      isNew: false,
    },
    {
      id: "a2",
      categoryId: "acompanhamentos",
      name: "Anéis de Saturno",
      description: "Onion rings extra crocantes com molho barbecue artesanal.",
      price: 22.0,
      image: "aneis-de-saturno.jpg",
      discount: 0,
      isNew: true,
    },
    {
      id: "a3",
      categoryId: "acompanhamentos",
      name: "Nuggets de Ouro",
      description:
        "Pedaços de frango empanados na farinha panko com molho honey mustard.",
      price: 24.9,
      image: "frango-pedacos.jpg",
      discount: 5,
      isNew: false,
    },
    {
      id: "a4",
      categoryId: "acompanhamentos",
      name: "Batatas Estelares",
      description:
        "Batata palito crocante coberta com cheddar derretido e bacon bits.",
      price: 26.0,
      image: "batata-frita.jpg",
      discount: 0,
      isNew: false,
    },

    // --- CATEGORIA: ELIXIRES (BEBIDAS) ---
    {
      id: "e1",
      categoryId: "elixires",
      name: "Poção de Cola",
      description:
        "Refrigerante clássico de 350ml servido com gelo e limão siciliano.",
      price: 8.0,
      image: "soda.jpg", // Substitua pelo arquivo correto se houver
      discount: 0,
      isNew: false,
    },
    {
      id: "e2",
      categoryId: "elixires",
      name: "Suco de Marte",
      description:
        "Suco natural detox de morango, amora e um toque de gengibre.",
      price: 14.0,
      image: "suco-morango.jpg",
      discount: 0,
      isNew: true,
    },
    {
      id: "e3",
      categoryId: "elixires",
      name: "Milkshake Galáctico",
      description:
        "Shake de baunilha premium com granulados coloridos e chantilly artesanal.",
      price: 19.9,
      image: "shake-baunilha.jpg",
      discount: 0,
      isNew: false,
    },
    {
      id: "e4",
      categoryId: "elixires",
      name: "Néctar de Vênus",
      description: "Limonada suíça cremosa batida com leite condensado e gelo.",
      price: 12.0,
      image: "limonada.jpg",
      discount: 0,
      isNew: false,
    },

    // --- CATEGORIA: SOBREMESAS ENCANTADAS ---
    {
      id: "s1",
      categoryId: "sobremesas",
      name: "Brownie do Infinito",
      description:
        "Brownie de chocolate belga aquecido com sorvete de baunilha e calda quente.",
      price: 24.0,
      image: "brownie-infinito.jpg",
      discount: 0,
      isNew: true,
    },
    {
      id: "s2",
      categoryId: "sobremesas",
      name: "Cookie Cósmico",
      description:
        "Cookie gigante de baunilha com gotas generosas de chocolate meio amargo.",
      price: 12.0,
      image: "cookie-cosmico.jpg",
      discount: 0,
      isNew: false,
    },
  ],
};
