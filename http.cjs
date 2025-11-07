const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('¡Hola Mundo!(desde http.cjs)\n');
}).listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});