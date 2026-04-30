# 🧸 Mare de Brincadeiras — Backend API

API HTTP em Node.js + Express para o aplicativo **Mare de Brincadeiras**.

---

## Estrutura de Pastas

```
mare-brincadeiras-backend/
├── src/
│   ├── app.js        ← Aplicação Express (rotas, middlewares, catálogo)
│   └── server.js     ← Inicialização do servidor HTTP
├── data/
│   └── purchases/    ← Histórico de compras (gerado em runtime)
├── .env.example      ← Variáveis de ambiente de referência
├── package.json
└── README.md
```

---

## Instalação e Execução

```bash
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente
cp .env.example .env

# 3. Rodar em desenvolvimento (com hot-reload)
npm run dev

# 4. Rodar em produção
npm start
```

API disponível em: `http://localhost:3000`

---

## Endpoints

### Health
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/health` | Status da API |

### Autenticação
| Método | Rota | Body |
|--------|------|------|
| POST | `/api/auth/signup` | `{ email, password, fullName }` |
| POST | `/api/auth/login` | `{ email, password }` |

**Admin padrão:** `admin@mare.com` / `admin123`

### Produtos
| Método | Rota | Query Params |
|--------|------|--------------|
| GET | `/api/products` | `page`, `limit`, `categoryId`, `search` |
| GET | `/api/products/:id` | — |

### Categorias
| Método | Rota |
|--------|------|
| GET | `/api/categories` |

### Carrinho
> Requer header `x-user-id` para isolamento por usuário.

| Método | Rota | Body |
|--------|------|------|
| GET | `/api/cart` | — |
| POST | `/api/cart/items` | `{ produtoId, quantidade }` |
| PUT | `/api/cart/items/:productId` | `{ quantidade }` |
| DELETE | `/api/cart/items/:productId` | — |
| DELETE | `/api/cart` | — |

### Pagamento
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/payments/mercadopago` | Gera URL de pagamento (live ou mock) |
| POST | `/api/cart/checkout` | Checkout simplificado |

---

## Variáveis de Ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | `3000` | Porta do servidor |
| `NODE_ENV` | `development` | Ambiente |
| `JWT_SECRET` | — | Segredo JWT (para evolução futura) |
| `MERCADOPAGO_ACCESS_TOKEN` | — | Token do Mercado Pago (opcional) |

> Se `MERCADOPAGO_ACCESS_TOKEN` não estiver configurado, a API roda em **modo mock** e retorna uma URL de pagamento simulada.

---

## Catálogo de Produtos

O backend inclui **25 brinquedos** nas categorias:
- Pelúcias
- Montessori
- Jogos de Tabuleiro
- Lego
- Bonecas
- Carrinhos
- Jogos
- Ar Livre

---

## Configuração no Frontend (Expo)

No arquivo `.env.local` do projeto Expo:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```

> Em dispositivo físico, substitua `localhost` pelo IP da sua máquina na rede local.

---

## Formato de Resposta

```json
// Sucesso
{ "success": true, "data": { ... } }

// Erro
{ "success": false, "error": { "message": "..." } }
```
