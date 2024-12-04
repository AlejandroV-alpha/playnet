$(document).ready(function () {
    const animals = [
        "🐶", "🐶", "🐱", "🐱", "🐰", "🐰", "🦁", "🦁", "🐯", "🐯",
        "🐸", "🐸", "🐴", "🐴", "🐷", "🐷"
    ];

    let shuffledAnimals = shuffle(animals);
    let flippedCards = [];
    let matchedCards = [];
    let currentPlayer = 1;
    let player1Score = 0;
    let player2Score = 0;
    let isProcessing = false; // Variable para bloquear el procesamiento

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

    let html = '<div><strong>' + jugador1.nombre + ':</strong> <span id="score1">0</span></div><div><strong>' + jugador2.nombre + ':</strong> <span id="score2">0</span></div>';
    $('.scoreboard').html(html);

    // Establecer el nombre de los jugadores y el turno inicial
    $("#playerTurn").text(`Es el turno de ${jugador1.nombre}`);
    $("#score1").text(player1Score);
    $("#score2").text(player2Score);

    // Crear el tablero de juego
    for (let i = 0; i < shuffledAnimals.length; i++) {
        const card = $("<div class='card' data-index='" + i + "'></div>");
        const cardText = $("<div class='card-text'></div>").text(shuffledAnimals[i]);

        card.append(cardText);
        $("#gameBoard").append(card);
    }

    // Lógica para hacer clic en las cartas
    $(".card").on("click", function () {
        if (isProcessing || $(this).hasClass("flipped") || $(this).hasClass("matched")) return;

        $(this).addClass("flipped");

        const cardIndex = $(this).data("index");
        flippedCards.push({ card: $(this), animal: shuffledAnimals[cardIndex] });

        // Verifica si dos cartas han sido volteadas
        if (flippedCards.length === 2) {
            isProcessing = true; // Bloquea la interacción con las cartas
            setTimeout(() => {
                if (flippedCards[0].animal === flippedCards[1].animal) {
                    flippedCards[0].card.addClass("matched");
                    flippedCards[1].card.addClass("matched");

                    // Actualizar el puntaje
                    if (currentPlayer === 1) {
                        player1Score++;
                        $("#score1").text(player1Score);
                    } else {
                        player2Score++;
                        $("#score2").text(player2Score);
                    }

                    // Verifica si alguien ganó
                    if (player1Score + player2Score === shuffledAnimals.length / 2) {
                        showResult();
                    }
                } else {
                    flippedCards[0].card.removeClass("flipped");
                    flippedCards[1].card.removeClass("flipped");
                }

                flippedCards = [];
                switchPlayer();
                isProcessing = false; // Habilita nuevamente el clic en las cartas
            }, 1000);
        }
    });

    // Cambiar de jugador
    function switchPlayer() {
        if (currentPlayer === 1) {
            currentPlayer = 2;
            $("#playerTurn").text(`Es el turno de ${jugador2.nombre}`);
        } else {
            currentPlayer = 1;
            $("#playerTurn").text(`Es el turno de ${jugador1.nombre}`);
        }
    }

    // Mezcla las cartas
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Intercambia elementos
        }
        return array;
    }

    // Mostrar el mensaje de resultado
    // Mostrar el mensaje de resultado
    function showResult() {
        let winnerMessage;

        if (player1Score > player2Score) {
            winnerMessage = `¡El ${jugador1.nombre} ha ganado!`;
            // Aumenta la puntuación del jugador 1
            jugador1.puntuacion = (jugador1.puntuacion || 0) + 1;
        } else if (player2Score > player1Score) {
            winnerMessage = `¡El ${jugador2.nombre} ha ganado!`;
            // Aumenta la puntuación del jugador 2
            jugador2.puntuacion = (jugador2.puntuacion || 0) + 1;
        } else {
            winnerMessage = "¡Es un empate!";  // Mensaje de empate
        }

        $("#resultMessage").text(winnerMessage).show();
        $("#restartBtn").show();

        // Guardar los cambios en el localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id === jugador1.id) {
                usuarios[i].puntuacion = jugador1.puntuacion; // Actualiza la puntuación del jugador 1
            }
            if (usuarios[i].id === jugador2.id) {
                usuarios[i].puntuacion = jugador2.puntuacion; // Actualiza la puntuación del jugador 2
            }
        }

        // Guardar los cambios actualizados en el localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }



    // Reiniciar el juego
    $("#restartBtn").on("click", function () {
        window.location.href = "../index.html"; // Redirige a la página principal
    });
});

.
