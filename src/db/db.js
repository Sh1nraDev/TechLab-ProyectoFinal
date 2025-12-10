import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'db.json');

// Función para leer la base de datos de usuarios
export function leerDB(){
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        //console.log('Base de datos leída: ', data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo la base de datos: ', error);
        return {};
    }
}

// Función para guardar la base de datos de usuarios
export function guardarDB(data){
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(dbPath, jsonData, 'utf8');
        //console.log('Base de datos guardada.');
    } catch (error) {
        console.error('Error guardando la base de datos: ', error);
    }
}