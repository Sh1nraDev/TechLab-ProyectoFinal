export class UserModel {
    constructor(id, name, email, password, rol, ubicacion, experiencia) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.rol = rol || 'User';
        this.ubicacion = ubicacion || 'Desconocida';
        this.experiencia = experiencia || 'No especificada';
    }
}