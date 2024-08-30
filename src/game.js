const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const eatSound = document.getElementById('eat-sound');
const gameOverSound = document.getElementById('game-over-sound');
const loadingAnimation = document.getElementById('loading-animation');

const GRID_SIZE = 20;
const GAME_SPEED = 100; // milliseconds

let snake, food, direction, gameLoop;

function initGame() {
    canvas.width = 400;
    canvas.height = 400;
    snake = new Snake();
    food = new Food();
    direction = 'right';
    updateScore(0);
    document.addEventListener('keydown', changeDirection);
    startButton.style.display = 'none';
    loadingAnimation.style.display = 'none';
    canvas.style.display = 'block';
    gameLoop = setInterval(update, GAME_SPEED);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.move(direction);
    if (snake.checkCollision()) {
        gameOver();
        return;
    }
    if (snake.eat(food)) {
        eatSound.play();
        food.generate();
        updateScore(snake.body.length - 1);
    }
    snake.draw();
    food.draw();
}

function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (key === 'ArrowRight' && direction !== 'left') direction = 'right';
}

function gameOver() {
    clearInterval(gameLoop);
    gameOverSound.play();
    setTimeout(() => {
        alert('Game Over! Your score: ' + (snake.body.length - 1));
        startButton.style.display = 'inline-block';
    }, 100);
}

startButton.addEventListener('click', initGame);

// Show loading animation and hide game board initially
loadingAnimation.style.display = 'block';
canvas.style.display = 'none';