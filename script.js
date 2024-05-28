const colorButtons = {
    red: document.getElementById('red'),
    blue: document.getElementById('blue'),
    green: document.getElementById('green'),
    yellow: document.getElementById('yellow')
};

let colorSequence = [];
let playerSequence = [];
let score = 0;

const startButton = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    colorSequence = [];
    playerSequence = [];
    scoreDisplay.textContent = score;
    messageDisplay.textContent = 'Watch the sequence';
    nextRound();
}

function nextRound() {
    playerSequence = [];
    const nextColor = getRandomColor();
    colorSequence.push(nextColor);
    playSequence();
}

function playSequence() {
    colorSequence.forEach((color, index) => {
        setTimeout(() => {
            animateButton(color);
        }, index * 600);
    });
    setTimeout(() => {
        messageDisplay.textContent = 'Remember the sequence';
        enablePlayerInput();
    }, colorSequence.length * 600 + 500);
}

function getRandomColor() {
    const colors = ['red', 'blue', 'green', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function animateButton(color) {
    const button = colorButtons[color];
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 300);
}

function enablePlayerInput() {
    messageDisplay.textContent = 'Repeat the sequence';
    Object.keys(colorButtons).forEach(color => {
        colorButtons[color].addEventListener('click', handlePlayerInput);
    });
}

function disablePlayerInput() {
    Object.keys(colorButtons).forEach(color => {
        colorButtons[color].removeEventListener('click', handlePlayerInput);
    });
}

function handlePlayerInput(event) {
    const color = event.target.id;
    playerSequence.push(color);
    animateButton(color);

    const currentMove = playerSequence.length - 1;
    if (playerSequence[currentMove] !== colorSequence[currentMove]) {
        alert('Game Over! Final Score: ' + score);
        startGame();
        return;
    }

    if (playerSequence.length === colorSequence.length) {
        disablePlayerInput();
        score++;
        scoreDisplay.textContent = score;
        setTimeout(() => {
            messageDisplay.textContent = 'Watch the sequence';
            nextRound();
        }, 1000);
    }
}
