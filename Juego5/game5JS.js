$(document).ready(function () {
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

    const gridSize = 5; // Cambiado a 5x5
    let player1Ships = [];
    let player2Ships = [];
    let player1Points = 0; // Puntos internos durante la partida
    let player2Points = 0; // Puntos internos durante la partida
    let currentPlayer = 1; // 1 for Player 1, 2 for Player 2

    function initializeGame() {
        player1Ships = placeShips();
        player2Ships = placeShips();
        player1Points = 0; // Reiniciar puntos al inicio de la partida
        player2Points = 0; // Reiniciar puntos al inicio de la partida
        $('#player1-points').text(player1Points);
        $('#player2-points').text(player2Points);
        $('#current-turn').text(`${jugador1.nombre} (Jugador 1)`);
        createGrid('#player1-grid', 'player1');
        createGrid('#player2-grid', 'player2');
    }

    function placeShips() {
        const ships = new Set();
        while (ships.size < 2) { // Mantiene 2 barcos
            ships.add(Math.floor(Math.random() * (gridSize * gridSize)));
        }
        return Array.from(ships);
    }

    function createGrid(selector, player) {
        $(selector).empty();
        for (let i = 0; i < gridSize * gridSize; i++) {
            $(selector).append(`<div class="cell" data-cell="${i}" data-player="${player}"></div>`);
        }
    }

    function handleCellClick(cell) {
        const $cell = $(cell);
        const cellIndex = parseInt($cell.data('cell'));
        const player = $cell.data('player');
        const isHit = (player === 'player1' && player2Ships.includes(cellIndex)) ||
            (player === 'player2' && player1Ships.includes(cellIndex));

        if ($cell.hasClass('hit') || $cell.hasClass('miss')) return;

        if (isHit) {
            $cell.addClass('hit').text('X');
            if (currentPlayer === 1) {
                player1Points++;
                $('#player1-points').text(player1Points);
            } else {
                player2Points++;
                $('#player2-points').text(player2Points);
            }
        } else {
            $cell.addClass('miss').text('O');
        }

        if (player1Points >= 2 || player2Points >= 2) {
            const winner = player1Points >= 2 ? `${jugador1.nombre} (Jugador 1)` : `${jugador2.nombre} (Jugador 2)`;
            showWinner(winner);
            return;
        }

        currentPlayer = currentPlayer === 1 ? 2 : 1;
        $('#current-turn').text(currentPlayer === 1 ? `${jugador1.nombre} (Jugador 1)` : `${jugador2.nombre} (Jugador 2)`);
    }

    function showWinner(winner) {
        $('#winner-message h2').text(`¡${winner} gana!`);
        $('#winner-message').show();
        $('.grid .cell').off('click'); // Desactiva clics en las celdas

        // Al finalizar el juego, solo se suman puntos internamente
        if (player1Points >= 2) {
            jugador1.puntuacion += 1; // Sumar un punto al jugador 1
        } else if (player2Points >= 2) {
            jugador2.puntuacion += 1; // Sumar un punto al jugador 2
        }

        // Opcionalmente, podrías guardar solo los puntos actuales de los jugadores en localStorage si quieres persistencia para futuras partidas.
        localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Actualiza usuarios con los puntos finales
    }

    $('#player1-grid, #player2-grid').on('click', '.cell', function () {
        const $grid = $(this).closest('.grid').attr('id');
        if (($grid === 'player1-grid' && currentPlayer === 1) ||
            ($grid === 'player2-grid' && currentPlayer === 2)) {
            handleCellClick(this);
        }
    });

    // Inicializar el juego al cargar
    initializeGame();
});

.

