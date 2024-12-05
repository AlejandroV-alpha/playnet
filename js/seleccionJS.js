$(document).ready(function () {
    // Recuperar la lista de usuarios desde LocalStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar si hay usuarios registrados
    if (usuarios.length > 0) {
        // Cargar los usuarios en ambos combobox
        usuarios.forEach(function (usuario) {
            $('#jugador1, #jugador2').append('<option value="' + usuario.id + '">' + usuario.nombre + '</option>');
        });
    } else {
        alert('No hay usuarios registrados.');
    }
});

function confirmarSeleccion() {
    var jugador1 = $('#jugador1').val();
    var jugador2 = $('#jugador2').val();

    if (jugador1 === jugador2) {
        alert("¡Los jugadores no pueden ser los mismos!");
    } else {
        // Guardar los IDs de los jugadores seleccionados en localStorage
        localStorage.setItem('jugador1Id', jugador1);
        localStorage.setItem('jugador2Id', jugador2);

        // Recuperar la URL directamente (sin necesidad de JSON.parse)
        let juego = localStorage.getItem('juegoSelecion') || '';

        // Verificar si la URL es válida
        if (juego === '') {
            alert('No se ha definido una URL para el juego.');
        } else {
            // Si la URL existe, se redirige al juego
            window.location.href = juego;
        }
    }
}