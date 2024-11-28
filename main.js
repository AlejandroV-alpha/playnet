const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Configuración de middleware para poder recibir datos en JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta para servir archivos estáticos (como HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

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
    res.sendFile(path.join(__dirname, 'public', 'registro.html'));  // Cambié la ruta a registro.html
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

// Ruta para obtener la lista de usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios); // Enviar lista de usuarios como JSON
});

// Ruta para manejar la selección de jugadores
app.post('/seleccionar', (req, res) => {
    const { jugador1, jugador2 } = req.body;

    // Validar selección
    if (!jugador1 || !jugador2) {
        return res.status(400).send('Debe seleccionar ambos jugadores.');
    }

    if (jugador1 === jugador2) {
        return res.status(400).send('Los jugadores deben ser diferentes.');
    }

    const jugador1Data = usuarios.find(usuario => usuario.id === parseInt(jugador1));
    const jugador2Data = usuarios.find(usuario => usuario.id === parseInt(jugador2));

    if (!jugador1Data || !jugador2Data) {
        return res.status(404).send('Jugador no encontrado.');
    }

    // Aquí puedes procesar o guardar la selección de jugadores
    console.log('Jugador 1:', jugador1Data);
    console.log('Jugador 2:', jugador2Data);

    res.send(`¡Juego iniciado con ${jugador1Data.nombre} y ${jugador2Data.nombre}!`);
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});





