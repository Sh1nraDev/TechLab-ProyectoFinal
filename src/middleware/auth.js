import bcrypt from "bcryptjs";
import { leerDB } from "../db/db.js";

export async function authHeader(req, res, next) {
    const {email, password} = req.headers;
    if (!email || !password) {
        return res.status(401).json({ error: 'Faltan credenciales de autenticación' });
    }

    const db = leerDB();
    const user = db["users"] || [];

    const foundUser = user.find(u => u.email === email);
    if (!foundUser) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    req.user = foundUser;
    next();
}

export function soloAdmins(req, res, next) {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado: solo administradores' });
    }
    next();
}