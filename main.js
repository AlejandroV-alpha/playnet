const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// Configuración de middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Verificar si ya existe el archivo de usuarios, si no, inicializar la lista
let usuarios = [];
let contadorId = 1;
const archivoUsuarios = 'usuarios.json';

if (fs.existsSync(archivoUsuarios)) {
    const data = fs.readFileSync(archivoUsuarios, 'utf-8');
    usuarios = JSON.parse(data);
    if (usuarios.length > 0) {
        contadorId = usuarios[usuarios.length - 1].id + 1;
    }
}

// Clase Usuario
class Usuario {
    constructor(nombre, email, contraseña) {
        this.id = contadorId++;
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
        this.puntacion = 0;
    }
}

// Función para agregar usuario
function agregarUsuario(nombre, email, contraseña) {
    const nuevoUsuario = new Usuario(nombre, email, contraseña);
    usuarios.push(nuevoUsuario);
    fs.writeFileSync(archivoUsuarios, JSON.stringify(usuarios, null, 2));
    console.log('Usuario agregado con éxito:', nuevoUsuario);
}

// Ruta para mostrar el formulario de registro
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/registro.html');  // Cambié la ruta a registro.html
});

// Ruta para manejar el registro de usuarios
app.post('/registro', (req, res) => {
    const { nombre, email, contraseña } = req.body;
    if (!nombre || !email || !contraseña) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    agregarUsuario(nombre, email, contraseña);
    res.send('Usuario registrado exitosamente');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});





