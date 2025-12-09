import bcrypt from 'bcryptjs'; // Importa bcrypt para encriptar contraseñas

// Base de datos simulada
const users = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      password: bcrypt.hashSync('password123', 10), // Contraseña encriptada
      rol: 'Frontend Developer',
      ubicacion: 'Buenos Aires, Argentina',
      experiencia: '5 Años de experiencia en React y Tailwind CSS'
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      password: bcrypt.hashSync('password123', 10), // Contraseña encriptada
      rol: 'Backend Developer',
      ubicacion: 'Rosario, Argentina',
      experiencia: '3 Años de experiencia en Node.js y Express'
    },
    {
      id: 3,
      name: 'Charlie',
      email: 'charlie@example.com',
      password: bcrypt.hashSync('password123', 10), // Contraseña encriptada
      rol: 'Full Stack Developer',
      ubicacion: 'Córdoba, Argentina',
      experiencia: '2 Años de experiencia en React y Node.js'
    },
    {
      id: 4,
      name: 'David',
      email: 'david@example.com',
      password: bcrypt.hashSync('password123', 10), // Contraseña encriptada
      rol: 'DevOps Engineer',
      ubicacion: 'Mendoza, Argentina',
      experiencia: '2 Años de experiencia en AWS y Docker'
    },
];

// Servicio para obtener todos los usuarios sin las contraseñas
export const findAllUsers = () => {
    return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
}

// Servicio para obtener un usuario por ID sin la contraseña
export const findUserById = (id) => {
    const user = users.find(u => u.id === Number(id));
    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

// Servicio para crear un nuevo usuario
export const createUser = async(userData) => {
    // Destructuring
    const { name, email, password, rol, ubicacion, experiencia } = userData;
    
    // Validar los campos específicos (ahora sí existen)
    if (!name || !email || !password) {
        throw new Error('Name, email, y password son requeridos');
    }

    // Verificar si el email ya existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        throw new Error('El email ya está registrado');
    }

    // Encriptar la contraseña
    const hashPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashPassword,
        rol: rol || 'Usuario',
        ubicacion: ubicacion || 'No especificada',
        experiencia: experiencia || 'No especificada'
    };

    users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

// Servicio para verificar credenciales de usuario
export const verifyCredentials = async(email, password) => {
    const user = users.find(u => u.email === email);
    if (!user) throw new Error('Usuario no encontrado'); // return null;


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Contraseña incorrecta'); // return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
}