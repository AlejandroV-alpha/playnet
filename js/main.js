console.log("Archivo main.js cargado"); // Esto debería aparecer en la consola

// Recuperar la lista de usuarios desde LocalStorage (si existe)
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Recuperar el contadorId desde localStorage o establecerlo en 1 si no existe
let contadorId = localStorage.getItem('contadorId') ? parseInt(localStorage.getItem('contadorId')) : 1;

// Clase Usuario
class Usuario {
    constructor(nombre, email, contrasenia) {
        this.id = contadorId++;
        this.nombre = nombre;
        this.email = email;
        this.contrasenia = contrasenia;
        this.puntuacion = 0;
    }

    setPuntuacion(nuevaPuntuacion) {
        this.puntuacion = this.puntuacion + nuevaPuntuacion;
    }
}

$(document).ready(function () {
    console.log("Document ready");
    
    // Función para registrar un nuevo usuario
    $('#btnRegistrar').click(function () {
        let nombre = $('#nombre').val();
        let email = $('#email').val();
        let contrasenia = $('#contrasenia').val();

        // Verificar que los campos no estén vacíos
        if (nombre && email && contrasenia) {
            // Crear un nuevo usuario
            let nuevoUsuario = new Usuario(nombre, email, contrasenia);

            // Agregar el nuevo usuario a la lista de usuarios
            usuarios.push(nuevoUsuario);

            // Guardar la lista de usuarios y el contadorId nuevamente en LocalStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            localStorage.setItem('contadorId', contadorId); // Actualizar el contadorId en localStorage

            // Mostrar la lista de usuarios en la consola
            console.log('Usuarios registrados:', usuarios);

            // Limpiar los campos del formulario
            $('#nombre').val('');
            $('#email').val('');
            $('#contrasenia').val('');

        } else {
            alert('Por favor, complete todos los campos');
        }
    });

    // Mostrar la lista de usuarios en la consola al cargar la página
    console.log('Lista de usuarios al cargar la página:', usuarios);
    console.log('Último ID utilizado:', contadorId); // Depuración: Ver el último ID utilizado
});




