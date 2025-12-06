// Creo la ruta
import { Router } from 'express'; // Importo el Router de express
import { getUsers, getUserById } from '../controller/users.controller.js'; // Importo el controlador para obtener usuarios

const router = Router();

// Todos los metodos (GET, POST, PUT, DELETE) se definen aca ⬇️:

// Defino una ruta GET para obtener todos los usuarios
// router.get('/') ⬅️ es la ruta base: /users o /usuarios 

// Ruta GET para obtener todos los usuarios
router.get('/', getUsers);
/*
  // Utilizo tailwindcss para dar estilos a las tarjetas:
  const tarjetaHTML = users.map(user => `
  <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 m-4 w-72 border border-gray-700 hover:shadow-purple-500/50 hover:shadow-2xl transition-all duration-300 hover:scale-105">
    <!-- Avatar con degradado -->
    <div class="flex flex-col items-center">
      <div class="bg-gradient-to-br from-purple-600 via-blue-500 to-green-400 rounded-full h-20 w-20 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
        <span class="text-white text-3xl font-bold">${user.name.charAt(0)}</span>
      </div>
      
      <!-- Nombre -->
      <h3 class="text-2xl font-bold mb-1 text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
        ${user.name}
      </h3>
      
      <!-- Rol -->
      <p class="text-gray-400 text-sm mb-4">${user.rol}</p>
      
      <!-- Información con iconos -->
      <div class="w-full space-y-3 text-gray-300">
        <!-- Email -->
        <div class="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2 border border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span class="text-sm truncate">${user.email}</span>
        </div>
        
        <!-- Ubicación -->
        <div class="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2 border border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-sm">${user.ubicacion}</span>
        </div>
        
        <!-- Experiencia -->
        <div class="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2 border border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span class="text-sm">${user.experiencia}</span>
        </div>
      </div>
      
      <!-- Badge ID -->
      <div class="mt-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full px-4 py-1">
        <span class="text-xs text-purple-300 font-semibold">ID: ${user.id}</span>
      </div>
    </div>
  </div>
`).join('');
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lista de Usuarios</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-950 p-8 min-h-screen">
      <!-- Título -->
      <h2 class="text-5xl text-center font-bold mb-10 bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
        Nuestro Equipo
      </h2>

      <!-- Tarjetas de usuarios -->
      <div class="flex items-center justify-center flex-wrap max-w-7xl mx-auto">
        ${tarjetaHTML}
      </div>

      <!-- Botón volver al inicio (centrado debajo de las tarjetas) -->
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
*/

router.get('/:id', getUserById);

// Defino una ruta POST para crear un nuevo usuario
router.post('/', (req, res) => {
  res.send('<h2>Crear un nuevo usuario</h2>');
});

router.put('/:id', (req, res) => {
  res.send(`<h2>Actualizar el usuario con ID ${req.params.id}</h2>`);
});

router.delete('/:id', (req, res) => {
  res.send(`<h2>Eliminar el usuario con ID ${req.params.id}</h2>`);
});

export default router;