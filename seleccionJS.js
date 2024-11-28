// Crear una lista de usuarios registrados
const listaUsuarios = [
    new Usuario("Juan Pérez", "juan@example.com", "1234"),
    new Usuario("Ana López", "ana@example.com", "abcd"),
    new Usuario("Carlos Gómez", "carlos@example.com", "5678"),
    new Usuario("María Torres", "maria@example.com", "efgh")
];

// Función para llenar los combobox dinámicamente
function cargarUsuariosEnSelect(selectId) {
    const selectElement = document.getElementById(selectId);
    listaUsuarios.forEach(usuario => {
        const option = document.createElement("option");
        option.value = usuario.nombre;
        option.textContent = usuario.nombre;
        selectElement.appendChild(option);
    });
}

// Llenar ambos combobox al cargar la página
window.onload = function() {
    cargarUsuariosEnSelect("player1");
    cargarUsuariosEnSelect("player2");
};

// Manejar la confirmación de jugadores
// Manejar la confirmación de jugadores
document.getElementById("confirm-button").addEventListener("click", () => {
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;

    if (player1Name === player2Name) {
        alert("¡Los jugadores no pueden ser el mismo usuario! Por favor selecciona jugadores diferentes.");
        return;
    }

    // Buscar los usuarios seleccionados en la lista
    const player1 = listaUsuarios.find(usuario => usuario.nombre === player1Name);
    const player2 = listaUsuarios.find(usuario => usuario.nombre === player2Name);

    // Guardar los usuarios seleccionados en localStorage
    localStorage.setItem("player1", JSON.stringify(player1));
    localStorage.setItem("player2", JSON.stringify(player2));

    // Mostrar en la página
    const outputDiv = document.getElementById("output");
    const outputMessage = document.getElementById("output-message");
    outputMessage.textContent = `Jugador 1: ${player1.nombre}, Jugador 2: ${player2.nombre}`;
    outputDiv.classList.remove("d-none");

    // Redirigir al juego
    window.location.href = "JuegoPreguntas/game1.html";
});

