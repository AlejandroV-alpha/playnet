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
    { question: "¿Quién escribió 'Don Quijote'?", answers: ["García Márquez", "Cervantes", "Shakespeare", "Lorca"], correct: 1 }
];

let currentQuestionIndex = 0;
let score1 = 0;
let score2 = 0;
let currentPlayer = 1; // Jugador 1 comienza

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



// Función para cargar la siguiente pregunta
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    $('#question').text(question.question);
    $('#answers').empty();


    question.answers.forEach((answer, index) => {
        $('#answers').append(`
            <button class="btn btn-outline-primary w-100" onclick="checkAnswer(${index})">${answer}</button>
        `);
    });
}

// Función para comprobar si la respuesta es correcta
function checkAnswer(answerIndex) {
    const question = questions[currentQuestionIndex];
    const button = $(`#answers button:eq(${answerIndex})`);

    // Resaltar visualmente si la respuesta es correcta o incorrecta
    if (answerIndex === question.correct) {
        button.css({ 'background-color': 'green', 'color': 'white' }); // Correcto
        if (currentPlayer === 1) {
            score1++; // Incrementa el puntaje del Jugador 1
            $('#score1').text(score1); // Actualiza la visualización
        } else {
            score2++; // Incrementa el puntaje del Jugador 2
            $('#score2').text(score2); // Actualiza la visualización
        }
    } else {
        button.css({ 'background-color': 'red', 'color': 'white' });   // Incorrecto
        // Resaltar la respuesta correcta
        $(`#answers button:eq(${question.correct})`).css({ 'background-color': 'green', 'color': 'white' });
    }

    // Deshabilitar todos los botones
    $('#answers button').prop('disabled', true);

    // Cambio de turno
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    $('#current-turn').text(`Es el turno de ${currentPlayer === 1 ? jugador1.nombre : jugador2.nombre}`);

    // Avanzar a la siguiente pregunta automáticamente
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            // Restaurar estado visual antes de cargar la siguiente pregunta
            $('#answers button').css({ 'background-color': '', 'color': '' }).prop('disabled', false);
            loadQuestion();
        }, 1500); // Espera 1.5 segundos antes de cargar la siguiente pregunta
    } else {
        setTimeout(() => {
            if (score1 > score2) {
                jugador1.puntuacion = (jugador1.puntuacion || 0) + 1; // Aumenta la puntuación del jugador 1
            }
            if (score2 > score1) {
                jugador2.puntuacion = (jugador2.puntuacion || 0) + 1; // Aumenta la puntuación del jugador 2
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
            
            // Mostrar un mensaje de confirmación
            alert('¡Puntuaciones actualizadas con éxito!');            

            alert(`Juego terminado!\n${jugador1.nombre}: ${score1} puntos\n${jugador2.nombre}: ${score2} puntos`);
            window.location.href = '../index.html';
        }, 1500);
    }
}



// Función para reiniciar el juego
function resetGame() {
    currentQuestionIndex = 0;
    score1 = 0;
    score2 = 0;
    currentPlayer = 1;
    $('#score1').text(score1);
    $('#score2').text(score2);
    $('#current-turn').text(`Es el turno de ${jugador1.nombre}`);
    loadQuestion();
}

$(document).ready(function () {
    // Establecer los nombres de los jugadores desde localStorage
    $('#player1-name').text(jugador1.nombre);
    $('#player2-name').text(jugador2.nombre);
    $('#current-turn').text(`Es el turno de ${jugador1.nombre}`);

    loadQuestion();
});

