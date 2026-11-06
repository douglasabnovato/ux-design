/**
 * learnTECH Coffee Ecosystem - Database
 * Objetivo: Estrutura resiliente para vitrine Dark Premium
 */

const learnTechDatabase = [
  // --- REFERÊNCIA 01: CHEIRIN BÃO (Origem e Afeto) ---
  {
    id: "CB-01",
    name: "Bão",
    category: "Grãos Especiais",
    description:
      "Notas de frutas amarelas e mel, acidez cítrica e corpo aveludado.",
    details: {
      origin: "Mantiqueira de Minas",
      process: "Natural",
      roast: "Média",
      sensory: ["Mel", "Acidez Cítrica", "Frutas Amarelas"],
    },
    methods: ["V60", "Chemex", "Prensa Francesa"],
    price: 53.9,
    unit: "250g",
    image: "assets/products/cafe.jpg",
  },
  {
    id: "CB-02",
    name: "Mió",
    category: "Grãos Especiais",
    description:
      "Notas frutadas, corpo sedoso, acidez delicada e finalização doce.",
    details: {
      origin: "Mantiqueira de Minas",
      sensory: ["Frutado", "Sedoso", "Doce"],
    },
    methods: ["V60", "Chemex", "Aeropress"],
    price: 55.9,
    unit: "250g",
    image: "assets/products/cafe.jpg",
  },
  {
    id: "CB-03",
    name: "Moca",
    category: "Grãos Especiais",
    description:
      "Grão raro, encorpado e doce, com notas de caramelo e chocolate.",
    details: {
      sensory: ["Caramelo", "Chocolate"],
      type: "Grão Moca (Peaberry)",
    },
    methods: ["Espresso", "Prensa Francesa"],
    price: 68.9,
    unit: "250g",
    image: "assets/products/cafe.jpg",
  },
  {
    id: "CB-04",
    name: "Microlote",
    category: "Grãos Especiais",
    description: "Grãos de pontuações altas e características únicas.",
    details: {
      type: "Edição Limitada",
      score: "85+ pontos SCAA",
      sensory: ["Complexidade Alta"],
    },
    methods: ["Taça Sensorial"],
    price: 74.9,
    unit: "250g",
    image: "assets/products/cafe.jpg",
  },

  // --- REFERÊNCIA 02: GRÃO MOENTE (Técnica e Brunch) ---
  {
    id: "GM-11",
    name: "Espresso Carioca",
    category: "Clássicos",
    description: "Dose de espresso (30ml) diluída em água quente (30ml).",
    details: { volume: "60ml", sensory: ["Equilibrado"] },
    price: 9.0,
    image: "assets/products/cafe.jpg",
  },
  {
    id: "GM-13",
    name: "Flat White",
    category: "Clássicos",
    description:
      "Duas doses de espresso com leite vaporizado de textura sedosa.",
    details: { volume: "160ml", sensory: ["Leitoso", "Aveludado"] },
    price: 17.0,
    image: "assets/products/cafe.jpg",
  },
  {
    id: "GM-14",
    name: "Cold Brew Laranja",
    category: "Gelados",
    description:
      "Café extraído a frio por 20h, suco de laranja, limão e xarope de gengibre.",
    details: {
      infusion: "20 horas",
      ingredients: ["Gengibre", "Laranja", "Limão"],
      sensory: ["Refrescante", "Cítrico"],
    },
    price: 18.0,
    image: "assets/products/cafe.jpg",
  },
  {
    id: "GM-15",
    name: "Affogato",
    category: "Sobremesas de Café",
    description: "Café extraído a frio servido com sorvete, amêndoas e calda.",
    details: { options: ["Chocolate", "Caramelo"], sensory: ["Doce"] },
    price: 26.0,
    image: "assets/products/cafe.jpg",
  },

  // --- REFERÊNCIA 03: LE PETIT CAFÉ (Pâtisserie) ---
  {
    id: "LP-23",
    name: "Cappuccino Le Petit",
    category: "Assinatura",
    description: "Espresso, leite vaporizado, canela e raspas de chocolate.",
    details: { garnish: "Chocolate Belga", sensory: ["Especiarias"] },
    price: 14.0,
    image: "assets/products/cafe.jpg",
  },
  {
    id: "LP-24",
    name: "Mocha Branco",
    category: "Assinatura",
    description:
      "Camadas de chocolate branco artesanal, espresso e leite cremoso.",
    details: { sensory: ["Chocolate Branco"] }, // Adicionado para evitar erro
    price: 16.0,
    image: "assets/products/cafe.jpg",
  },

  // --- REFERÊNCIA 04: PLANET COFFEE (Temático) ---
  {
    id: "PC-31",
    name: "Espresso Mercúrio",
    category: "Cosmic Edition",
    description:
      "Extração rápida e intensa, para quem precisa de energia orbital.",
    details: { intensity: "Máxima", sensory: ["Intenso"] },
    price: 9.0,
    image: "assets/products/cafe.jpg",
  },
  {
    id: "PC-32",
    name: "Cappuccino Vênus",
    category: "Cosmic Edition",
    description:
      "Cremoso e adocicado, inspirado na atmosfera densa do planeta.",
    details: { sensory: ["Cremoso", "Doce"] },
    price: 15.0,
    image: "assets/products/cafe.jpg",
  },
  {
    id: "PC-33",
    name: "Frappé Via Láctea",
    category: "Cosmic Edition",
    description: "Bebida gelada ultra cremosa com flocos de chocolate branco.",
    details: { sensory: ["Gelado", "Flocos"] },
    price: 22.0,
    image: "assets/products/cafe.jpg",
  },
];

export default learnTechDatabase;
