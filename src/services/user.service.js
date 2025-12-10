import bcrypt from 'bcryptjs'; // Importa bcrypt para encriptar contraseñas
import { leerDB, guardarDB } from '../db/db.js'; // Importa funciones para leer y guardar en la DB
import { collection } from 'firebase/firestore';
import { db } from '../firebase/config.js';


// Defino la ruta en la DB 
const ruta = 'users'; 

// Servicio para obtener todos los usuarios sin las contraseñas
export const findAllUsers = async () => {
  /*
  const db = leerDB();
  const users = db[ruta] || [];
  // Elimino la contraseña de cada usuario antes de devolverlos
  return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  */
  const snapshot = await getDocs(collection(db, ruta));
  return snapshot.docs.map(doc => {
    const { password, ...userWithoutPassword } = doc.data();
    return new UserModel({id: doc.id, ...userWithoutPassword});
  });

}

// Servicio para obtener un usuario por ID sin la contraseña
export const findUserById = (id) => { 
  const db = leerDB();
  const users = db[ruta] || [];
  const user = users.find(u => u.id === Number(id));
  if (!user) return null;

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Servicio para crear un nuevo usuario
export const createUser = async(userData) => {
  const db = leerDB();
  const users = db[ruta] || [];
  
  // Verifico que los datos obligatorios estén presentes
  if (!userData.name || !userData.email || !userData.password) {
      throw new Error('Faltan datos obligatorios: name, email o password');
  }
  // Verifico que el email no esté registrado
  if(users.some(u => u.email === userData.email)) {
    throw new Error('El email ya está registrado');
  }
  // Encripto la contraseña
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    rol: userData.rol,
    ubicacion: userData.ubicacion,
    experiencia: userData.experiencia
  }
  users.push(newUser);
  db[ruta] = users;
  guardarDB(db);

  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

// Servicio para actualizar usuarios
export const updateUser = async(id, userData) => {
  const db = leerDB();
  const users = db[ruta] || [];
  
  const userIndex = users.findIndex(u => u.id === Number(id));
  if (userIndex === -1) return null;
  
  let newPassword = users[userIndex].password;
  if (userData.password) {
      newPassword = await bcrypt.hash(userData.password, 10);
  }
  const updatedUser = {
      ...users[userIndex],
      ...userData,
      password: newPassword
  };

  users[userIndex] = updatedUser;
  db[ruta] = users;
  guardarDB(db);

  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
}

// Servicio para verificar credenciales de usuario
export const verifyCredentials = async(email, password) => {
  const db = leerDB();
  const users = db[ruta] || [];
  
  const user = users.find(u => u.email === email);
  if (!user) {
      throw new Error('email no registrado');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
  }

  const { password: pwd, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Servicio para eliminar usuarios
export const deleteUser = (id) => {
  const db = leerDB();
  const users = db[ruta] || [];
  const userIndex = users.findIndex(u => u.id === Number(id));
  if (userIndex === -1) return false;
  
  users.splice(userIndex, 1);
  guardarDB(db);
  return true;
}