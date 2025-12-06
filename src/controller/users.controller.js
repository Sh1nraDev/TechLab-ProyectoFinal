// Creo usuarios  ficticios:
const users = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      rol: 'Frontend Developer',
      ubicacion: 'Buenos Aires, Argentina',
      experiencia: '5 Años de experiencia en React y Tailwind CSS'
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      rol: 'Backend Developer',
      ubicacion: 'Rosario, Argentina',
      experiencia: '3 Años de experiencia en Node.js y Express'
    },
    {
      id: 3,
      name: 'Charlie',
      email: 'charlie@example.com',
      rol: 'Full Stack Developer',
      ubicacion: 'Córdoba, Argentina',
      experiencia: '2 Años de experiencia en React y Node.js'
    },
    {
      id: 4,
      name: 'David',
      email: 'david@example.com',
      rol: 'DevOps Engineer',
      ubicacion: 'Mendoza, Argentina',
      experiencia: '2 Años de experiencia en AWS y Docker'
    },
];

// Controlador para obtener todos los usuarios
export const getUsers = async(req, res) => {
    res.status(200).json(users);
}

// Controlador para obtener un usuario por ID
export const getUserById = async(req, res) => {
    const {id} = req.params;
    const user = users.find(u => u.id == id);
    if(user){
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
}
