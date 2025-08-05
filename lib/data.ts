export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Smartphone Galaxy S24",
    description:
      'O mais recente smartphone Samsung com câmera de 200MP, processador Snapdragon 8 Gen 3 e tela AMOLED de 6.8".',
    price: 4999.99,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    category: "Eletrônicos",
  },
  {
    id: "2",
    name: "Notebook Dell Inspiron",
    description:
      "Notebook Dell Inspiron 15 com processador Intel i7, 16GB RAM, SSD 512GB e tela Full HD.",
    price: 3499.99,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    category: "Eletrônicos",
  },
  {
    id: "3",
    name: "Fones de Ouvido Sony WH-1000XM5",
    description:
      "Fones de ouvido sem fio com cancelamento de ruído ativo, bateria de 30h e qualidade de áudio excepcional.",
    price: 1899.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Eletrônicos",
  },
  {
    id: "4",
    name: 'Smart TV LG 55" 4K',
    description:
      "Smart TV LG 55 polegadas com resolução 4K, webOS, HDR e conectividade Wi-Fi.",
    price: 2799.99,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    category: "Eletrônicos",
  },
  {
    id: "5",
    name: "Câmera Canon EOS R6",
    description:
      "Câmera mirrorless Canon EOS R6 com sensor full-frame, estabilização de 5 eixos e gravação 4K.",
    price: 12999.99,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    category: "Eletrônicos",
  },
  {
    id: "6",
    name: "Apple Watch Series 9",
    description:
      "Apple Watch Series 9 com monitor cardíaco, GPS, resistente à água e tela sempre ligada.",
    price: 3999.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    category: "Eletrônicos",
  },
  {
    id: "7",
    name: 'iPad Pro 12.9"',
    description:
      "iPad Pro 12.9 polegadas com chip M2, tela Liquid Retina XDR e suporte à Apple Pencil.",
    price: 8999.99,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    category: "Eletrônicos",
  },
  {
    id: "8",
    name: "Console PlayStation 5",
    description:
      "Console PlayStation 5 com controle DualSense, SSD ultra-rápido e gráficos de nova geração.",
    price: 4499.99,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
    category: "Games",
  },
  {
    id: "9",
    name: "Drone DJI Mini 3 Pro",
    description:
      "Drone DJI Mini 3 Pro com câmera 4K, peso inferior a 250g e bateria de 34 minutos.",
    price: 3999.99,
    image:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop",
    category: "Eletrônicos",
  },
  {
    id: "10",
    name: "MacBook Air M2",
    description:
      "MacBook Air com chip M2, 8GB RAM, SSD 256GB e até 18 horas de bateria.",
    price: 7999.99,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "Eletrônicos",
  },
  {
    id: "11",
    name: 'Monitor Samsung 27" Curvo',
    description:
      "Monitor Samsung 27 polegadas curvo, resolução Full HD, 144Hz e tempo de resposta 1ms.",
    price: 1299.99,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    category: "Eletrônicos",
  },
  {
    id: "12",
    name: "Xbox Series X",
    description:
      "Console Xbox Series X com processador AMD Zen 2, SSD 1TB e suporte a 4K 120fps.",
    price: 3999.99,
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    category: "Games",
  },
];

export const categories = [
  "Todos",
  "Eletrônicos",
  "Games",
  "Smartphones",
  "Notebooks",
  "Acessórios",
];
