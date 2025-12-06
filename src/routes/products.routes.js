// Creo la ruta para products
import { Router } from 'express';
const router = Router();

// Array de productos ficticio:
/*
const products = [
    { id: 1, name: 'Laptop', price: 999, cantidad: 10 },
    { id: 2, name: 'Smartphone', price: 699, cantidad: 15 },
    { id: 3, name: 'Tablet', price: 499, cantidad: 20 },
];
*/
// Productos ficticios:
const products = [
    {
      id: 1,
      name: 'Laptop Gaming',
      price: 1500,
      cantidad: 15
    },
    {
      id: 2,
      name: 'Mouse Inalámbrico',
      price: 45,
      cantidad: 50
    },
    {
      id: 3,
      name: 'Teclado Mecánico',
      price: 120,
      cantidad: 30
    },
    {
      id: 4,
      name: 'Monitor 27"',
      price: 350,
      cantidad: 8
    },
    {
      id: 5,
      name: 'Auriculares RGB',
      price: 80,
      cantidad: 0
    },
    {
      id: 6,
      name: 'Webcam HD',
      price: 65,
      cantidad: 25
    }
];

// Ruta GET para obtener todos los productos:
router.get('/', (req, res) => {

  const tarjetaHTML = products.map(product => `
  <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 m-4 w-72 border border-gray-700 hover:shadow-purple-500/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
    <!-- Icono del producto con degradado -->
    <div class="flex flex-col items-center">
      <div class="bg-gradient-to-br from-purple-600 via-blue-500 to-green-400 rounded-2xl h-24 w-24 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      
      <!-- Nombre del producto -->
      <h3 class="text-2xl font-bold mb-4 text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] text-center">
        ${product.name}
      </h3>
      
      <!-- Información del producto -->
      <div class="w-full space-y-3 text-gray-300">
        <!-- Precio -->
        <div class="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm font-medium">Precio:</span>
          </div>
          <span class="text-lg font-bold text-green-400">${product.price}</span>
        </div>
        
        <!-- Cantidad -->
        <div class="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${product.cantidad > 0 ? 'text-blue-400' : 'text-red-400'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span class="text-sm font-medium">Cantidad:</span>
          </div>
          <span class="text-lg font-bold ${product.cantidad > 0 ? 'text-blue-400' : 'text-red-400'}">
            ${product.cantidad > 0 ? product.cantidad : 'Agotado'}
          </span>
        </div>
      </div>
      
      <!-- Badge ID y Estado -->
      <div class="mt-4 flex gap-2 w-full justify-center">
        <div class="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full px-4 py-1">
          <span class="text-xs text-purple-300 font-semibold">ID: ${product.id}</span>
        </div>
        ${product.cantidad > 0 
          ? '<div class="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-full px-4 py-1"><span class="text-xs text-green-300 font-semibold">Disponible</span></div>'
          : '<div class="bg-gradient-to-r from-red-600/20 to-rose-600/20 border border-red-500/30 rounded-full px-4 py-1"><span class="text-xs text-red-300 font-semibold">Sin Stock</span></div>'
        }
      </div>
      
      <!-- Botón de acción -->
      <button class="mt-4 w-full ${product.cantidad > 0 
        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 cursor-pointer' 
        : 'bg-gray-700 cursor-not-allowed opacity-50'} text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${product.cantidad > 0 ? 'hover:scale-105' : ''}" ${product.cantidad === 0 ? 'disabled' : ''}>
        ${product.cantidad > 0 ? 'Agregar al Carrito' : 'No Disponible'}
      </button>
    </div>
  </div>
`).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Catálogo de Productos</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-950 p-8 min-h-screen">
      <!-- Título -->
      <h2 class="text-5xl text-center font-bold mb-10 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
        Productos Disponibles
      </h2>

      <!-- Tarjetas de productos -->
      <div class="flex items-center justify-center flex-wrap max-w-7xl mx-auto">
        ${tarjetaHTML}
      </div>

      <!-- Botón volver al inicio -->
      <div class="flex justify-center mt-10">
        <a href="/" class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </a>
      </div>
    </body>
    </html>
  `);
});

// Ruta para obtener un producto por ID:
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    // Validar que el ID es un número válido
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: `Producto ID:${productId} no encontrado` }); // Manejo de error si no se encuentra el producto
    }
});

// Ruta para agregar un nuevo producto (POST):
router.post('/', (req, res) => {
    const { name, price, cantidad } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        price,
        cantidad
    };
    // Validar que los campos requeridos estén presentes
    if (!name || !price || !cantidad) {
        return res.status(400).json({
            error: 'Faltan campos requeridos: name, price, cantidad'
        });
    }
    products.push(newProduct);
    res.status(201).json({ message: 'Producto agregado', product: newProduct });
});



export default router;