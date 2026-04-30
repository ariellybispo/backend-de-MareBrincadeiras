const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   🧸 Mare de Brincadeiras - API Server    ║
╚═══════════════════════════════════════════╝

  Server rodando na porta ${PORT}
  Ambiente: ${process.env.NODE_ENV || 'development'}

  Health check: http://localhost:${PORT}/health
  Produtos:     http://localhost:${PORT}/api/products
  Categorias:   http://localhost:${PORT}/api/categories

  Pressione CTRL+C para parar
  `);
});

// Encerramento gracioso
process.on('SIGTERM', () => {
  console.log('SIGTERM recebido: encerrando servidor HTTP');
  server.close(() => {
    console.log('Servidor HTTP encerrado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT recebido: encerrando servidor HTTP');
  server.close(() => {
    console.log('Servidor HTTP encerrado');
    process.exit(0);
  });
});

module.exports = server;
