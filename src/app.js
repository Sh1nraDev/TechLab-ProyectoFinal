import express from 'express'; //express server
import userRouter from './routes/users.routes.js'; // Importo todas las rutas de users
import productsRouter from './routes/products.routes.js'; // Importo todas las rutas de products
import cors from 'cors';

const app = express();// Creo la aplicacion de express
const PORT = 3000; // Defino el puerto
/*
app.use(express.static("public"));// Middleware para servir archivos estáticos
*/
app.use(cors({// Middleware para CORS para permitir POST desde el frontend
  origin: 'http://localhost:5500',
  methods: ['GET', 'POST']
}));

// Uso las rutas importadas
app.use([ '/users', '/usuarios' ], userRouter); // Ruta para users
app.use([ '/products', '/productos' ], productsRouter); // Ruta para products

// Desafio Op1: Rutas básicas con Express
/*
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Desafío Rutas con Express</title>
      </head>
      <body>
        <h1>Bienvenido al Desafío de Rutas con Express</h1>
        <p>Prueba las siguientes rutas:</p>
        <ul>
          <li><a href="/users">Ruta /users</a></li>
          <li><a href="/usuarios">Ruta /usuarios</a></li>
        </ul>
      </body>
    </html>
    `);
});

app.get('/users', (req, res,) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
  res.json(users);
});

app.get('/usuarios', (req, res,) => {
  const usuarios = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
  res.json(usuarios);
});
*/

// Desafio Op2: Middleware con json
app.use(express.json()); // Middleware para recibir peticiones con formato JSON

// Ruta para buscar productos por nombre (query parameter):
/*
app.get('/products/search', (req, res) => {
  const nameQuery = req.query.name;
  
  // Validar que el parámetro existe
  if (!nameQuery) {
    return res.status(400).json({ 
      error: 'El parámetro "name" es requerido' 
    });
  }
  
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(nameQuery.toLowerCase())
  );
  
  res.json(filteredProducts);  
});
*/


/*
app.post('/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json({ message: 'Producto agregado', product: newProduct });
});
*/

// Middleware para manejar rutas inexistentes
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Inicio el servidor:   
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});