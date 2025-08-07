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
  {
    id: "13",
    name: "Controle Sem Fio DualSense PS5",
    description:
      "Controle com resposta tátil e gatilhos adaptáveis para imersão em jogos de nova geração.",
    price: 479.9,
    image:
      "https://images.unsplash.com/photo-1605835963874-a7c87f56259e?q=80&w=1470&auto=format&fit=crop",
    category: "Games",
  },
  {
    id: "14",
    name: "Headset Gamer Surround 7.1",
    description:
      "Headset com som imersivo e microfone removível, ideal para sessões intensas de jogos.",
    price: 329.0,
    image:
      "https://images.unsplash.com/photo-1600186279172-fdbaefd74383?q=80&w=1470&auto=format&fit=crop",
    category: "Games",
  },
  {
    id: "15",
    name: "Smartphone Galaxy S22 128GB",
    description:
      "Smartphone com tela AMOLED de 6.1 polegadas, câmera tripla e desempenho de ponta.",
    price: 3899.99,
    image:
      "https://images.unsplash.com/photo-1707438095956-25a7a502df16?q=80&w=2062&auto=format&fit=crop",
    category: "Smartphones",
  },
  {
    id: "16",
    name: "iPhone 14 Pro 256GB",
    description:
      "iPhone com câmera Pro de 48MP, Dynamic Island e chip A16 Bionic ultrarrápido.",
    price: 8299.0,
    image:
      "https://images.unsplash.com/photo-1677144677444-9ab5de19143f?q=80&w=1469&auto=format&fit=crop",
    category: "Smartphones",
  },
  {
    id: "17",
    name: "Notebook Dell Inspiron 15",
    description:
      "Notebook com processador Intel i7, SSD de 512GB e tela Full HD antirreflexo.",
    price: 4599.9,
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1470&auto=format&fit=crop",
    category: "Notebooks",
  },
  {
    id: "18",
    name: "MacBook Air M2 13'' 256GB",
    description:
      "Notebook ultrafino com chip Apple M2, bateria de longa duração e tela Liquid Retina.",
    price: 8999.0,
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1470&auto=format&fit=crop",
    category: "Notebooks",
  },
  {
    id: "19",
    name: "Carregador Rápido USB-C 20W",
    description:
      "Carregador compacto com tecnologia de carregamento rápido compatível com iPhone e Android.",
    price: 119.9,
    image:
      "https://images.unsplash.com/photo-1555449368-099e5eb46842?q=80&w=764&auto=format&fit=crop",
    category: "Acessórios",
  },
  {
    id: "20",
    name: "Suporte Articulado para Notebook",
    description:
      "Suporte ergonômico com altura ajustável, ideal para melhorar a postura durante o uso.",
    price: 89.9,
    image:
      "https://images.unsplash.com/photo-1623251606108-512c7c4a3507?q=80&w=1374&auto=format&fit=crop",
    category: "Acessórios",
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
