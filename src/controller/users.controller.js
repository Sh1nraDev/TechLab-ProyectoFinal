import { findAllUsers, findUserById, createUser, verifyCredentials } from '../services/user.service.js'; // Importa el servicio para obtener usuarios 

// Controlador para obtener todos los usuarios
export const getAllUsers = (req, res) => {
    try {
        const users = findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
}

// Controlador para obtener un usuario por ID
export const getUserById = (req, res) => {
  try {
      const userId = findUserById(req.params.id);

      if (!userId) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(userId);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener el usuario' });
  }
}

// Controlador para crear un nuevo usuario
export const createUserController = async(req, res) => {
  try {
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

// Controlador para verificar credenciales de usuario
export const loginUserController = async(req, res) => {
  try {
      const { email, password } = req.body;
      const user = await verifyCredentials(email, password);
      res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
      res.status(401).json({ error: error.message });
  }
}


