import express from 'express'; //express server
import "dotenv/config"; //importo dotenv para variables de entorno
import userRouter from './routes/users.routes.js'; // Importo todas las rutas de users
import productsRouter from './routes/products.routes.js'; // Importo todas las rutas de products
import cors from 'cors';

const app = express();// Creo la aplicacion de express
const PORT = process.env.PORT || 3001; // Defino el puerto
/*
app.use(express.static("public")); // Middleware para servir archivos estáticos
*/
app.use(express.json()); // Middleware para recibir peticiones con formato JSON
app.use(cors({ // Middleware para CORS para permitir POST desde el frontend 
  origin: 'http://localhost:5500',
  methods: ['GET', 'POST']
}));

// Uso las rutas importadas
app.use([ '/users', '/usuarios' ], userRouter); // Ruta para users
app.use([ '/products', '/productos' ], productsRouter); // Ruta para products
app.use('login', userRouter); // Ruta para login
// Middleware para manejar rutas inexistentes
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Inicio el servidor:   
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// exporto la app para usar en tests
export default app;