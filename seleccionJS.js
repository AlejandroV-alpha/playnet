// Función para cargar los jugadores desde el archivo JSON
function cargarJugadores() {
    fetch('usuarios.json')  // Asegúrate de que el archivo usuarios.json esté en el mismo directorio que este archivo
        .then(response => response.json())  // Convierte la respuesta a JSON
        .then(usuarios => {
            const comboJugador1 = document.getElementById('jugador1');
            const comboJugador2 = document.getElementById('jugador2');

            // Iteramos sobre el array de usuarios y añadimos cada uno como opción en los select
            usuarios.forEach(usuario => {
                // Para Jugador 1
                const opcion1 = document.createElement('option');
                opcion1.value = JSON.stringify(usuario); // Guardamos el objeto completo
                opcion1.textContent = usuario.nombre;
                comboJugador1.appendChild(opcion1);

                // Para Jugador 2
                const opcion2 = document.createElement('option');
                opcion2.value = JSON.stringify(usuario); // Guardamos el objeto completo
                opcion2.textContent = usuario.nombre;
                comboJugador2.appendChild(opcion2);
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
        });
}

// Función para guardar los objetos completos en localStorage
function guardarSeleccion() {
    const jugador1 = document.getElementById('jugador1').value;
    const jugador2 = document.getElementById('jugador2').value;

    if (!jugador1 || !jugador2) {
        alert("Por favor, seleccione ambos jugadores.");
        return;
    }

    // Convertir las cadenas de objetos JSON de nuevo a objetos
    const jugador1Obj = JSON.parse(jugador1);
    const jugador2Obj = JSON.parse(jugador2);

    // Guardar los objetos completos en localStorage
    localStorage.setItem('jugador1', JSON.stringify(jugador1Obj));
    localStorage.setItem('jugador2', JSON.stringify(jugador2Obj));

    alert("Selección guardada en localStorage.");
}

// Evento cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    cargarJugadores();  // Cargar los jugadores desde JSON

    // Configurar el botón para guardar los jugadores seleccionados
    document.getElementById('confirmar').addEventListener('click', guardarSeleccion);
});

