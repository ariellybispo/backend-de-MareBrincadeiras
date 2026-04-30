const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MercadoPagoConfig, Preference } = require('mercadopago');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ===== Catálogo de Produtos - Mare de Brincadeiras =====
const toysCatalog = [
  {
    id: 1,
    nome: 'Casa de Atividades Montessori - Emoticon',
    descricao: 'Casa de atividades inspirada na metodologia Montessori com luzes interativas, engrenagens móveis, xilofone e diversos acessórios. Desenvolvida para estimular coordenação motora e raciocínio lógico. Materiais seguros e duráveis.',
    precoEmCentavos: 19990,
    precoAntigoEmCentavos: 29990,
    desconto: 33,
    unidadesEmEstoque: 8,
    faixaEtaria: '1-3 anos',
    categoriaId: 'montessori',
    categoriaNome: 'Montessori',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80',
  },
  {
    id: 2,
    nome: 'Conjunto de Chocalhos de Madeira',
    descricao: 'Conjunto com 5 chocalhos artesanais de madeira natural, tingidos com corantes não tóxicos. Sons únicos em cada peça estimulam a percepção auditiva e visual do bebê.',
    precoEmCentavos: 8990,
    precoAntigoEmCentavos: 11990,
    desconto: 25,
    unidadesEmEstoque: 12,
    faixaEtaria: '0-1 ano',
    categoriaId: 'montessori',
    categoriaNome: 'Montessori',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&q=80',
  },
  {
    id: 3,
    nome: 'Boneca Barbie Fashionista',
    descricao: 'Boneca Barbie com roupa moderna e acessórios. Cabelo longo para penteados criativos. Estimula a imaginação e o desenvolvimento social.',
    precoEmCentavos: 7990,
    precoAntigoEmCentavos: null,
    desconto: null,
    unidadesEmEstoque: 25,
    faixaEtaria: '3-8 anos',
    categoriaId: 'bonecas',
    categoriaNome: 'Bonecas',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1602032816527-d37257ff0387?w=400&q=80',
  },
  {
    id: 4,
    nome: 'Lego Classic Peças Coloridas 200pç',
    descricao: 'Set com 200 peças coloridas para construções livres. Desenvolve criatividade, coordenação motora fina e raciocínio espacial.',
    precoEmCentavos: 14990,
    precoAntigoEmCentavos: 18990,
    desconto: 21,
    unidadesEmEstoque: 15,
    faixaEtaria: '4-12 anos',
    categoriaId: 'lego',
    categoriaNome: 'Lego',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80',
  },
  {
    id: 5,
    nome: 'Carrinho Hot Wheels Pista Looping',
    descricao: 'Pista com looping 360° e 2 carrinhos. Diversão garantida com manobras radicais. Fácil montagem e desmontagem.',
    precoEmCentavos: 11990,
    precoAntigoEmCentavos: 15990,
    desconto: 25,
    unidadesEmEstoque: 10,
    faixaEtaria: '4-10 anos',
    categoriaId: 'carrinhos',
    categoriaNome: 'Carrinhos',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&q=80',
  },
  {
    id: 6,
    nome: 'Pelúcia Urso Fofo 40cm',
    descricao: 'Urso de pelúcia super macio com 40cm. Material hipoalergênico, lavável à máquina. Companheiro perfeito para dormir.',
    precoEmCentavos: 5990,
    precoAntigoEmCentavos: null,
    desconto: null,
    unidadesEmEstoque: 30,
    faixaEtaria: '0-12 anos',
    categoriaId: 'peluclas',
    categoriaNome: 'Pelúcias',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  {
    id: 7,
    nome: 'Jogo de Tabuleiro Banco Imobiliário',
    descricao: 'Versão clássica com imóveis brasileiros. Para 2 a 6 jogadores. Desenvolve noções de matemática e estratégia.',
    precoEmCentavos: 8990,
    precoAntigoEmCentavos: 10990,
    desconto: 18,
    unidadesEmEstoque: 20,
    faixaEtaria: '8+ anos',
    categoriaId: 'jogos-tabuleiro',
    categoriaNome: 'Jogos de Tabuleiro',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=400&q=80',
  },
  {
    id: 8,
    nome: 'Kit Bola e Raquete Praia',
    descricao: 'Kit com bola, 2 raquetes e bolsa de transporte. Ideal para diversão na praia, parque ou quintal. Material resistente.',
    precoEmCentavos: 4990,
    precoAntigoEmCentavos: 6990,
    desconto: 29,
    unidadesEmEstoque: 18,
    faixaEtaria: '5+ anos',
    categoriaId: 'ar-livre',
    categoriaNome: 'Ar Livre',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&q=80',
  },
  {
    id: 9,
    nome: 'Quebra-Cabeça Infantil 60 Peças',
    descricao: 'Quebra-cabeça colorido com imagens de animais da floresta. Peças grandes e seguras, ideais para crianças pequenas.',
    precoEmCentavos: 3990,
    precoAntigoEmCentavos: 5490,
    desconto: 27,
    unidadesEmEstoque: 22,
    faixaEtaria: '3-6 anos',
    categoriaId: 'jogos',
    categoriaNome: 'Jogos',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1590005354167-6da97870c757?w=400&q=80',
  },
  {
    id: 10,
    nome: 'Pelúcia Dinossauro Rex 50cm',
    descricao: 'Pelúcia divertida do T-Rex com sons de rugido ao apertar a barriga. Super macia e resistente. Material hipoalergênico aprovado pelo INMETRO.',
    precoEmCentavos: 7490,
    precoAntigoEmCentavos: 9990,
    desconto: 25,
    unidadesEmEstoque: 14,
    faixaEtaria: '2-10 anos',
    categoriaId: 'peluclas',
    categoriaNome: 'Pelúcias',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1606206873764-fd15e242b2e0?w=400&q=80',
  },
  {
    id: 11,
    nome: 'Kit Arte e Pintura Criativa',
    descricao: 'Kit completo com 24 lápis de cor, 12 tintas guache, pincéis variados, bloco de desenho e avental. Estimula a criatividade artística.',
    precoEmCentavos: 6990,
    precoAntigoEmCentavos: null,
    desconto: null,
    unidadesEmEstoque: 20,
    faixaEtaria: '4+ anos',
    categoriaId: 'jogos',
    categoriaNome: 'Jogos',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
  },
  {
    id: 12,
    nome: 'Carrinho de Controle Remoto Turbo',
    descricao: 'Carrinho elétrico com controle remoto 2.4GHz, alcance de 50m, velocidade de até 20km/h. Bateria recarregável inclusa.',
    precoEmCentavos: 15990,
    precoAntigoEmCentavos: 19990,
    desconto: 20,
    unidadesEmEstoque: 9,
    faixaEtaria: '6-12 anos',
    categoriaId: 'carrinhos',
    categoriaNome: 'Carrinhos',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=80',
  },
  {
    id: 13,
    nome: 'Cozinha de Brinquedo Completa',
    descricao: 'Cozinha com fogão, pia, forno e mais de 30 acessórios. Sons e luzes realistas. Material ABS de alta resistência.',
    precoEmCentavos: 24990,
    precoAntigoEmCentavos: 31990,
    desconto: 22,
    unidadesEmEstoque: 7,
    faixaEtaria: '2-6 anos',
    categoriaId: 'jogos',
    categoriaNome: 'Jogos',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&q=80',
  },
  {
    id: 14,
    nome: 'Blocos de Madeira Coloridos 50pç',
    descricao: 'Set com 50 blocos de madeira natural pintados com tinta atóxica em 6 formatos. Desenvolvem raciocínio espacial, equilíbrio e criatividade.',
    precoEmCentavos: 8490,
    precoAntigoEmCentavos: 10990,
    desconto: 23,
    unidadesEmEstoque: 16,
    faixaEtaria: '1-5 anos',
    categoriaId: 'montessori',
    categoriaNome: 'Montessori',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1596460107916-430662021049?w=400&q=80',
  },
  {
    id: 15,
    nome: 'Bicicleta de Equilíbrio Infantil',
    descricao: 'Bicicleta sem pedal ideal para crianças aprenderem equilíbrio e coordenação. Guidão e selim ajustáveis. Estrutura leve em metal. Capacidade de 30kg.',
    precoEmCentavos: 18990,
    precoAntigoEmCentavos: 23990,
    desconto: 21,
    unidadesEmEstoque: 5,
    faixaEtaria: '2-5 anos',
    categoriaId: 'ar-livre',
    categoriaNome: 'Ar Livre',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&q=80',
  },
  {
    id: 16,
    nome: 'Pista Hot Wheels City com Garagem',
    descricao: 'Pista com garagem de 3 andares, elevador, loop e 3 carrinhos exclusivos. Mais de 1 metro de pista montada.',
    precoEmCentavos: 27990,
    precoAntigoEmCentavos: 34990,
    desconto: 20,
    unidadesEmEstoque: 8,
    faixaEtaria: '4-12 anos',
    categoriaId: 'carrinhos',
    categoriaNome: 'Carrinhos',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80',
  },
  {
    id: 17,
    nome: 'Boneca Baby Alive Come e Faz Xixi',
    descricao: 'Boneca interativa que come, bebe e faz xixi de verdade! Acompanha mamadeira, colher, comidinha e fralda. Desenvolve o cuidado e a empatia.',
    precoEmCentavos: 18990,
    precoAntigoEmCentavos: 23990,
    desconto: 21,
    unidadesEmEstoque: 12,
    faixaEtaria: '3-8 anos',
    categoriaId: 'bonecas',
    categoriaNome: 'Bonecas',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1561040712-b9b5b2167704?w=400&q=80',
  },
  {
    id: 18,
    nome: 'Lego Technic Caminhão Guincho',
    descricao: 'Set Lego Technic com 595 peças para montar um caminhão guincho funcional com guindaste e cabine articulada.',
    precoEmCentavos: 34990,
    precoAntigoEmCentavos: null,
    desconto: null,
    unidadesEmEstoque: 6,
    faixaEtaria: '9-16 anos',
    categoriaId: 'lego',
    categoriaNome: 'Lego',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&q=80',
  },
  {
    id: 19,
    nome: 'Escorregador Infantil com Piscina de Bolinhas',
    descricao: 'Escorregador colorido com piscina de bolinhas acoplada. Inclui 50 bolinhas coloridas. Estrutura em plástico reforçado, suporta até 25kg.',
    precoEmCentavos: 31990,
    precoAntigoEmCentavos: 41990,
    desconto: 24,
    unidadesEmEstoque: 4,
    faixaEtaria: '1-5 anos',
    categoriaId: 'ar-livre',
    categoriaNome: 'Ar Livre',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&q=80',
  },
  {
    id: 20,
    nome: 'Jogo Uno Edição Especial 112 Cartas',
    descricao: 'Edição especial do clássico Uno com 112 cartas e cartas coringas exclusivas. Para 2 a 10 jogadores.',
    precoEmCentavos: 3490,
    precoAntigoEmCentavos: 4990,
    desconto: 30,
    unidadesEmEstoque: 35,
    faixaEtaria: '7+ anos',
    categoriaId: 'jogos-tabuleiro',
    categoriaNome: 'Jogos de Tabuleiro',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=400&q=80',
  },
  {
    id: 21,
    nome: 'Guitarra Infantil com Luz e Som',
    descricao: 'Guitarra de brinquedo com 6 cordas, 5 modos de música, microfone embutido e luzes coloridas no ritmo. Desperta o interesse musical.',
    precoEmCentavos: 9990,
    precoAntigoEmCentavos: 12990,
    desconto: 23,
    unidadesEmEstoque: 18,
    faixaEtaria: '3-8 anos',
    categoriaId: 'jogos',
    categoriaNome: 'Jogos',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80',
  },
  {
    id: 22,
    nome: 'Piscina Inflável Infantil 1000L',
    descricao: 'Piscina inflável redonda com capacidade de 1000 litros, fundo acolchoado antiderrapante e bordas reforçadas. Inclui boia e bomba manual.',
    precoEmCentavos: 15990,
    precoAntigoEmCentavos: null,
    desconto: null,
    unidadesEmEstoque: 10,
    faixaEtaria: '2-10 anos',
    categoriaId: 'ar-livre',
    categoriaNome: 'Ar Livre',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80',
  },
  {
    id: 23,
    nome: 'Kit Médico Infantil 12 Peças',
    descricao: 'Kit completo de médico com estetoscópio, seringa, otoscópio, termômetro, martelo reflexo e mais. Estimula o jogo simbólico e a imaginação.',
    precoEmCentavos: 4490,
    precoAntigoEmCentavos: 6490,
    desconto: 31,
    unidadesEmEstoque: 28,
    faixaEtaria: '3-7 anos',
    categoriaId: 'jogos',
    categoriaNome: 'Jogos',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
  },
  {
    id: 24,
    nome: 'Robô Interativo Dançarino',
    descricao: 'Robô com sensor de toque, 50 reações diferentes, dança, canta, conta piadas e faz sons engraçados. Recarregável via USB.',
    precoEmCentavos: 21990,
    precoAntigoEmCentavos: 27990,
    desconto: 21,
    unidadesEmEstoque: 7,
    faixaEtaria: '4-10 anos',
    categoriaId: 'jogos',
    categoriaNome: 'Jogos',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80',
  },
  {
    id: 25,
    nome: 'Tapete Educativo Alfabeto e Números',
    descricao: 'Tapete emborrachado EVA com 36 peças de encaixe em formato de letras e números. Colorido, antiderrapante e lavável.',
    precoEmCentavos: 5990,
    precoAntigoEmCentavos: 7990,
    desconto: 25,
    unidadesEmEstoque: 40,
    faixaEtaria: '1-6 anos',
    categoriaId: 'montessori',
    categoriaNome: 'Montessori',
    imagemPrincipalId: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80',
  },
];

// ===== Categorias =====
const categories = [
  { id: 'peluclas', nome: 'Pelúcias' },
  { id: 'montessori', nome: 'Montessori' },
  { id: 'jogos-tabuleiro', nome: 'Jogos de Tabuleiro' },
  { id: 'lego', nome: 'Lego' },
  { id: 'bonecas', nome: 'Bonecas' },
  { id: 'carrinhos', nome: 'Carrinhos' },
  { id: 'jogos', nome: 'Jogos' },
  { id: 'ar-livre', nome: 'Ar Livre' },
];

// ===== Helpers =====
function toApiProduct(product) {
  return {
    id: product.id,
    name: product.nome,
    nome: product.nome,
    description: product.descricao,
    descricao: product.descricao,
    priceInCents: product.precoEmCentavos,
    precoEmCentavos: product.precoEmCentavos,
    oldPriceInCents: product.precoAntigoEmCentavos,
    precoAntigoEmCentavos: product.precoAntigoEmCentavos,
    discount: product.desconto,
    desconto: product.desconto,
    ageRange: product.faixaEtaria,
    faixaEtaria: product.faixaEtaria,
    categoryId: product.categoriaId,
    categoriaId: product.categoriaId,
    categoryName: product.categoriaNome,
    categoriaNome: product.categoriaNome,
    unitsInStock: product.unidadesEmEstoque,
    unidadesEmEstoque: product.unidadesEmEstoque,
    mainImageId: product.imagemPrincipalId,
    imagemPrincipalId: product.imagemPrincipalId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function buildCartResponse(userItems) {
  const itens = (userItems || []).map((item) => {
    const product = toysCatalog.find((p) => p.id === item.produtoId);
    const precoEmCentavos = product?.precoEmCentavos ?? item.precoEmCentavos ?? 0;
    const unidadesEmEstoque = product?.unidadesEmEstoque ?? 0;
    const imagemPrincipalId = product?.imagemPrincipalId ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80';
    const nomeProduto = product?.nome ?? `Produto ${item.produtoId}`;
    const subtotalEmCentavos = precoEmCentavos * item.quantidade;

    return {
      produtoId: item.produtoId,
      productId: item.produtoId,
      nomeProduto,
      name: nomeProduto,
      precoEmCentavos,
      priceInCents: precoEmCentavos,
      quantidade: item.quantidade,
      quantity: item.quantidade,
      unidadesEmEstoque,
      unitsInStock: unidadesEmEstoque,
      imagemPrincipalId,
      mainImageId: imagemPrincipalId,
      subtotalEmCentavos,
      subtotalInCents: subtotalEmCentavos,
    };
  });

  const valorTotalEmCentavos = itens.reduce((total, item) => total + item.subtotalEmCentavos, 0);

  return {
    itens,
    items: itens,
    valorTotalEmCentavos,
    totalInCents: valorTotalEmCentavos,
  };
}

// ===== Health Check =====
app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      app: 'Mare de Brincadeiras API',
      timestamp: new Date().toISOString(),
    },
  });
});

// ===== Auth Endpoints =====
app.post('/api/auth/signup', (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({
      success: false,
      error: { message: 'Email, password e fullName são obrigatórios' },
    });
  }

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: Math.floor(Math.random() * 1000),
        email,
        fullName,
      },
      token: `token_${Date.now()}`,
    },
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: { message: 'Email e password são obrigatórios' },
    });
  }

  // Admin hardcoded (compatível com AppContext do Mare)
  if (email === 'admin@mare.com' && password === 'admin123') {
    return res.json({
      success: true,
      data: {
        user: {
          id: 'admin',
          email,
          fullName: 'Administrador Mare',
          isAdmin: true,
        },
        token: `token_admin_${Date.now()}`,
      },
    });
  }

  res.json({
    success: true,
    data: {
      user: {
        id: Math.floor(Math.random() * 1000),
        email,
        fullName: email.split('@')[0],
        isAdmin: false,
      },
      token: `token_${Date.now()}`,
    },
  });
});

// ===== Categories Endpoint =====
app.get('/api/categories', (req, res) => {
  res.json({
    success: true,
    data: { categories },
  });
});

// ===== Products Endpoints =====
app.get('/api/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const categoryId = req.query.categoryId || req.query.categoriaId;
  const search = req.query.search || req.query.busca;

  let filtered = toysCatalog;

  if (categoryId) {
    filtered = filtered.filter((p) => p.categoriaId === categoryId);
  }

  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.nome.toLowerCase().includes(term) ||
        p.descricao.toLowerCase().includes(term) ||
        p.faixaEtaria.toLowerCase().includes(term)
    );
  }

  const products = filtered.map(toApiProduct);

  res.json({
    success: true,
    data: {
      products: products.slice((page - 1) * limit, page * limit),
      pagination: {
        page,
        limit,
        total: products.length,
        totalPages: Math.ceil(products.length / limit),
      },
    },
  });
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = toysCatalog.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      error: { message: 'Produto não encontrado' },
    });
  }

  res.json({
    success: true,
    data: toApiProduct(product),
  });
});

// ===== Cart Endpoints =====
const carts = {};

app.get('/api/cart', (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';

  res.json({
    success: true,
    data: buildCartResponse(carts[userId] || []),
  });
});

app.post('/api/cart/items', (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';
  const produtoId = Number(req.body.produtoId ?? req.body.productId);
  const quantidade = Number(req.body.quantidade ?? req.body.quantity ?? 1);

  if (!produtoId || quantidade <= 0) {
    return res.status(400).json({
      success: false,
      error: { message: 'produtoId e quantidade são obrigatórios' },
    });
  }

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const existingItem = carts[userId].find((item) => item.produtoId === produtoId);

  if (existingItem) {
    existingItem.quantidade += quantidade;
  } else {
    carts[userId].push({ produtoId, quantidade });
  }

  res.json({
    success: true,
    data: buildCartResponse(carts[userId]),
  });
});

app.put('/api/cart/items/:productId', (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';
  const productId = parseInt(req.params.productId);
  const quantity = Number(req.body.quantidade ?? req.body.quantity);

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const item = carts[userId].find((i) => i.produtoId === productId);

  if (item) {
    item.quantidade = quantity;
  }

  res.json({
    success: true,
    data: buildCartResponse(carts[userId]),
  });
});

app.delete('/api/cart/items/:productId', (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';
  const { productId } = req.params;

  if (carts[userId]) {
    carts[userId] = carts[userId].filter((item) => item.produtoId !== parseInt(productId));
  }

  res.json({
    success: true,
    data: buildCartResponse(carts[userId] || []),
  });
});

app.delete('/api/cart', (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';
  carts[userId] = [];

  res.json({
    success: true,
    data: buildCartResponse([]),
  });
});

// ===== Payment Endpoints =====
app.post('/api/payments/mercadopago', async (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';
  const cart = buildCartResponse(carts[userId] || []);

  if (!cart.itens.length) {
    return res.status(400).json({
      success: false,
      error: { message: 'Carrinho vazio. Adicione brinquedos antes de finalizar a compra.' },
    });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN;

  if (accessToken) {
    console.info('Mercado Pago -> modo live (token configurado)');
    try {
      const mercadoPagoClient = new MercadoPagoConfig({ accessToken });
      const preferenceClient = new Preference(mercadoPagoClient);

      const preferenceBody = {
        items: cart.itens.map((item) => ({
          id: String(item.produtoId),
          title: item.nomeProduto,
          quantity: item.quantidade,
          currency_id: 'BRL',
          unit_price: Number((item.precoEmCentavos / 100).toFixed(2)),
        })),
        external_reference: `mare_order_${userId}_${Date.now()}`,
        metadata: {
          userId: String(userId),
          totalInCents: cart.valorTotalEmCentavos,
          itemsCount: cart.itens.length,
          store: 'Mare de Brincadeiras',
        },
      };

      const preferenceResponse = await preferenceClient.create({ body: preferenceBody });
      const initPoint = preferenceResponse?.init_point || preferenceResponse?.sandbox_init_point;

      if (!initPoint) {
        return res.status(502).json({
          success: false,
          error: { message: 'Mercado Pago não retornou URL de pagamento.' },
        });
      }

      return res.json({
        success: true,
        init_point: initPoint,
        url: initPoint,
        data: {
          provider: 'mercadopago',
          mode: 'live',
          preferenceId: preferenceResponse?.id,
          totalInCents: cart.valorTotalEmCentavos,
          itemsCount: cart.itens.length,
        },
      });
    } catch (error) {
      console.error('Mercado Pago -> erro ao criar preferência', error);
      return res.status(502).json({
        success: false,
        error: {
          message: error?.message || 'Falha ao criar preferência no Mercado Pago.',
        },
      });
    }
  }

  console.info('Mercado Pago -> modo mock (token não configurado)');

  const mockPaymentUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=mare_demo_${Date.now()}_${userId}`;

  return res.json({
    success: true,
    init_point: mockPaymentUrl,
    url: mockPaymentUrl,
    data: {
      provider: 'mercadopago',
      mode: 'mock',
      totalInCents: cart.valorTotalEmCentavos,
      itemsCount: cart.itens.length,
    },
  });
});

app.post('/api/cart/checkout', (req, res) => {
  const userId = req.headers['x-user-id'] || 'guest';

  res.json({
    success: true,
    data: {
      orderId: `MARE-${Math.floor(Math.random() * 100000)}`,
      status: 'pending',
      total: 0,
    },
  });
});

module.exports = app;
