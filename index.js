// Creo un servidor con Express
import express from 'express';

// Configuro la aplicación
const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos desde la carpeta "public"
//app.use(express.static('public'));

// Middleware personalizado para registrar datos de cada petición
app.use((req, res, next) => {
  console.log(`Datos de la petición: ${req.method} ${req.url}`);
  next();
});

// Middleware para manejar rutas específicas ⬇️
app.get('/', (req, res) => {
  res.send('¡Hola Mundo! (desde index.js)');
});

app.get('/about', (req, res) => {
  res.send('Página de Acerca de');
});

// Op1: Ruta para sumar dos números pasados como query parameters
/* 
app.get('/sumar', (req, res) => {
  const num1 = Number(req.query.a); // Convertir a número
  const num2 = Number(req.query.b);

  if (isNaN(num1) || isNaN(num2)) { // Validar que sean números
    return res.status(400).send("Los parámetros deben ser números.");
  }

  const suma = num1 + num2;
  res.send({ suma });
});
*/

// Op2: Ruta para sumar dos números pasados como parámetros de ruta

/* 
app.get('/add/:a/:b', (req, res) => {
  const num1 = Number(req.params.a); // Convertir a número
  const num2 = Number(req.params.b);

  if (isNaN(num1) || isNaN(num2)) { // Validar que sean números
    return res.status(400).send("Los parámetros deben ser números.");
  }

  const suma = num1 + num2;
  res.send(`Resultado de la suma: ${suma}` );
});
*/
// ☝️ Ambas opciones para utilizar el metodo GET ↑ ↑

// Inicio el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});