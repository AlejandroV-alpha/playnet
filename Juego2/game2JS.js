$(document).ready(function () {
    const board = $('#board');
    const turnInfo = $('#turnInfo');
    const backButton = $('#btn-back');
    let currentPlayer = 'X';
    let gameActive = true;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Obtener los nombres de los jugadores desde localStorage
    const idjugador1 = localStorage.getItem('jugador1Id');
    const idjugador2 = localStorage.getItem('jugador2Id');
    let jugador1, jugador2;

    for (let i = 0; i < usuarios.length; i++) {
        if (idjugador1 == usuarios[i].id) {
            jugador1 = usuarios[i];
        }
        if (idjugador2 == usuarios[i].id) {
            jugador2 = usuarios[i];
        }
    }

    // Establecer texto inicial del turno
    turnInfo.text(`Turno de: ${jugador1.nombre} (X)`);

    // Generar el tablero
    for (let i = 0; i < 9; i++) {
        board.append(`<div class="cell" data-index="${i}"></div>`);
    }

    // Combinaciones ganadoras
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    // Manejar clics en las celdas
    board.on('click', '.cell', function () {
        if (!gameActive || $(this).hasClass('taken')) return;

        $(this).text(currentPlayer).addClass('taken');
        const boardState = $('.cell').map((_, cell) => $(cell).text()).get();

        if (checkWin(boardState)) {
            const ganador = currentPlayer === 'X' ? jugador1 : jugador2;

            // Actualizar puntaje
            ganador.puntuacion = (ganador.puntuacion || 0) + 1;

            // Actualizar usuarios en la lista
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].id === ganador.id) {
                    usuarios[i] = ganador; // Actualiza la información del ganador
                }
            }

            // Guardar los cambios en localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // Mostrar mensaje de victoria
            turnInfo.removeClass('alert-info').addClass('alert-success')
                .text(`¡${ganador.nombre} (${currentPlayer}) ha ganado!`);
            gameActive = false;
            showBackButton();
            return;
        }

        if (boardState.every(cell => cell !== '')) {
            turnInfo.removeClass('alert-info').addClass('alert-warning').text('¡Empate!');
            gameActive = false;
            showBackButton();
            return;
        }

        // Cambiar turno
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnInfo.text(`Turno de: ${currentPlayer === 'X' ? jugador1.nombre : jugador2.nombre} (${currentPlayer})`);
    });

    // Verificar si hay ganador
    function checkWin(boardState) {
        return winningCombinations.some(combination =>
            combination.every(index => boardState[index] === currentPlayer)
        );
    }

    // Mostrar botón "Volver al inicio"
    function showBackButton() {
        backButton.show(); // Mostrar el botón
    }

    // Redirigir al inicio
    backButton.click(function () {
        window.location.href = '../index.html'; // Ruta del archivo principal
    });
});

.