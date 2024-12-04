let player1Choice = null;
let player2Choice = null;
let currentPlayer = 1;

$(document).ready(function () {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const idjugador1 = localStorage.getItem('jugador1Id');
    const idjugador2 = localStorage.getItem('jugador2Id');
    let jugador1, jugador2;

    // Obtener los jugadores desde localStorage
    for (let i = 0; i < usuarios.length; i++) {
        if (idjugador1 == usuarios[i].id) {
            jugador1 = usuarios[i];
        }
        if (idjugador2 == usuarios[i].id) {
            jugador2 = usuarios[i];
        }
    }

    // Establecer el nombre de los jugadores y el turno inicial
    $("#currentPlayer").text(`Turno de: ${jugador1.nombre}`);
    $("#instructions p").text(`${jugador1.nombre}, selecciona tu elección.`);

    // Manejo de la elección de los jugadores
    $(".choice-btn").on("click", function () {
        const choice = $(this).data("choice");

        if (currentPlayer === 1) {
            player1Choice = choice;
            $("#currentPlayer").text(`Turno de: ${jugador2.nombre}`);
            $("#instructions p").text(`${jugador2.nombre}, selecciona tu elección.`);
            currentPlayer = 2;

            // Ocultar temporalmente las elecciones para el siguiente jugador
            $(".choices").hide();
            setTimeout(() => $(".choices").fadeIn(), 500);
        } else if (currentPlayer === 2) {
            player2Choice = choice;
            determineWinner(jugador1, jugador2);
        }
    });

    // Determina el ganador después de que ambos jugadores elijan
    function determineWinner(jugador1, jugador2) {
        let resultText = "";

        if (player1Choice === player2Choice) {
            resultText = "¡Es un empate!";
        } else if (
            (player1Choice === "piedra" && player2Choice === "tijera") ||
            (player1Choice === "papel" && player2Choice === "piedra") ||
            (player1Choice === "tijera" && player2Choice === "papel")
        ) {
            resultText = `¡${jugador1.nombre} gana!`;
            // Actualizar puntaje del jugador 1
            jugador1.puntuacion = (jugador1.puntuacion || 0) + 1;
        } else {
            resultText = `¡${jugador2.nombre} gana!`;
            // Actualizar puntaje del jugador 2
            jugador2.puntuacion = (jugador2.puntuacion || 0) + 1;
        }

        // Actualizar los datos en la lista de usuarios
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id === jugador1.id) {
                usuarios[i] = jugador1; // Actualiza la información del jugador 1
            }
            if (usuarios[i].id === jugador2.id) {
                usuarios[i] = jugador2; // Actualiza la información del jugador 2
            }
        }

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Mostrar resultado y ocultar elecciones
        $("#result").text(resultText);
        $(".choices").hide();
        $("#restart").fadeIn(); // Muestra el nuevo botón "Volver al inicio"
    }

    // Volver al inicio (index.html)
    $("#restart").on("click", function () {
        window.location.href = "../index.html"; // Redirige a la página principal
    });
});


