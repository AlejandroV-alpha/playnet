$(document).ready(function () {
    const questions = [
        { question: "¿Cuál es el planeta más cercano al Sol?", answers: ["Venus", "Mercurio", "Marte", "Tierra"], correct: 1 },
        { question: "¿Qué gas es necesario para respirar?", answers: ["Hidrógeno", "Nitrógeno", "Oxígeno", "Helio"], correct: 2 },
        { question: "¿Cuál es el río más largo del mundo?", answers: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"], correct: 0 },
        { question: "¿Qué inventó Alexander Graham Bell?", answers: ["Radio", "Teléfono", "Bombilla", "Telégrafo"], correct: 1 },
        { question: "¿Qué idioma tiene más hablantes nativos?", answers: ["Español", "Inglés", "Mandarín", "Hindú"], correct: 2 },
        { question: "¿En qué año ocurrió la Segunda Guerra Mundial?", answers: ["1939", "1945", "1914", "1940"], correct: 0 },
        { question: "¿Cuál es la capital de Canadá?", answers: ["Toronto", "Vancouver", "Montreal", "Ottawa"], correct: 3 },
        { question: "¿Qué país es famoso por sus tulipanes?", answers: ["España", "Países Bajos", "Francia", "Italia"], correct: 1 },
        { question: "¿Cuál es el metal más ligero?", answers: ["Hierro", "Oro", "Litio", "Plata"], correct: 2 },
        { question: "¿Quién escribió *Don Quijote*?", answers: ["García Márquez", "Cervantes", "Shakespeare", "Lorca"], correct: 1 }
    ];

    const player1 = JSON.parse(localStorage.getItem("player1"));
    const player2 = JSON.parse(localStorage.getItem("player2"));

    if (!player1 || !player2) {
        alert("No se encontraron jugadores seleccionados. Por favor, vuelve a la página de selección.");
        window.location.href = "SeleccionarJugadores.html";
        return;
    }

    let currentRound = 0;
    let scores = { player1: 0, player2: 0 };
    let currentPlayer = 1;

    $("#finalize").hide();

    function loadQuestion() {
        if (currentRound < questions.length) {
            const q = questions[currentRound];
            $("#question-text").text(q.question);
            $("#answers").empty();
            q.answers.forEach((answer, index) => {
                $("#answers").append(
                    `<button class="btn answer-btn" data-index="${index}">${answer}</button>`
                );
            });
            $("#turn-indicator").text(`Turno de ${currentPlayer === 1 ? player1.nombre : player2.nombre}`);
        } else {
            showResults();
        }
    }

    function showResults() {
        $("#game-container").hide();
        $("#results").removeClass("hidden");

        let winner = null;
        if (scores.player1 > scores.player2) {
            winner = player1.nombre;
        } else if (scores.player1 < scores.player2) {
            winner = player2.nombre;
        }

        const winnerText = winner
            ? `¡${winner} gana! 🎉`
            : "¡Es un empate!";
        $("#winner").text(winnerText);

        // Guardar el nombre del ganador en localStorage
        localStorage.setItem("ganador", winner || "Empate");

        $("#finalize").show();
    }

    $(document).on("click", ".answer-btn", function () {
        const selectedAnswer = $(this).data("index");
        const correctAnswer = questions[currentRound].correct;

        if (selectedAnswer === correctAnswer) {
            if (currentPlayer === 1) scores.player1++;
            else scores.player2++;
        }

        currentRound++;
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        $("#score1").text(scores.player1);
        $("#score2").text(scores.player2);

        loadQuestion();
    });

    $("#finalize").click(function () {
        window.location.href = "resultadoGame1.html";
    });

    loadQuestion();
});




