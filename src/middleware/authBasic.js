import { leerDB } from "../db/db.js";
import bcrypt from "bcryptjs";

export async function basicAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ error: 'Faltan credenciales de autenticación' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    const db = leerDB();
    const users = db["users"] || [];

    const foundUser = users.find(u => u.email === email);
    if (!foundUser) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (passwordMatch) {
        req.user = foundUser;
        next();
    } else {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
}

export function checkAdmin(req, res, next) {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado: solo administradores' });
    }
    next();
}