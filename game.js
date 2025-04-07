// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const mirrorCanvas = document.getElementById('mirrorCanvas');
const mirrorCtx = mirrorCanvas.getContext('2d');

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = getRandomFood();
let score = 0;
let dir = "RIGHT";
let gameStarted = false;
let isDead = false;
let boundaries = false;
let speed = 150;
let game;

let powerFood = getRandomFood();
let powerFoodTimer = 0;

function getRandomFood() {
  return {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}

document.addEventListener("keydown", direction);

function direction(event) {
  if (!gameStarted && !isDead) {
    gameStarted = true;
    game = setInterval(draw, speed);
  }
  if (event.keyCode === 37 && dir !== "RIGHT") dir = "LEFT";
  if (event.keyCode === 38 && dir !== "DOWN") dir = "UP";
  if (event.keyCode === 39 && dir !== "LEFT") dir = "RIGHT";
  if (event.keyCode === 40 && dir !== "UP") dir = "DOWN";
}

function toggleBoundaries() {
  boundaries = !boundaries;
}

function restartGame() {
  clearInterval(game);
  snake = [{ x: 9 * box, y: 10 * box }];
  food = getRandomFood();
  powerFood = getRandomFood();
  dir = "RIGHT";
  score = 0;
  speed = 150;
  gameStarted = false;
  isDead = false;
  document.getElementById("deathScreen").style.display = "none";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
}

function collision(x, y, array) {
  for (let i = 1; i < array.length; i++) {
    if (x === array[i].x && y === array[i].y) {
      return true;
    }
  }
  return false;
}

function drawBackgroundSnake(snakeArr, f, pf) {
  mirrorCtx.clearRect(0, 0, mirrorCanvas.width, mirrorCanvas.height);
  mirrorCtx.save();
  mirrorCtx.scale(mirrorCanvas.width / canvas.width, mirrorCanvas.height / canvas.height);

  mirrorCtx.fillStyle = "green";
  snakeArr.forEach(part => mirrorCtx.fillRect(part.x, part.y, box, box));

  mirrorCtx.fillStyle = "red";
  mirrorCtx.fillRect(f.x, f.y, box, box);

  mirrorCtx.fillStyle = "yellow";
  mirrorCtx.fillRect(pf.x, pf.y, box, box);

  mirrorCtx.restore();
}

function draw() {
  if (!gameStarted) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Press an arrow key to start!", canvas.width / 2, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move snake
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (dir === "LEFT") snakeX -= box;
  if (dir === "UP") snakeY -= box;
  if (dir === "RIGHT") snakeX += box;
  if (dir === "DOWN") snakeY += box;

  if (!boundaries) {
    if (snakeX >= canvas.width) snakeX = 0;
    if (snakeX < 0) snakeX = canvas.width - box;
    if (snakeY >= canvas.height) snakeY = 0;
    if (snakeY < 0) snakeY = canvas.height - box;
  } else {
    if (
      snakeX < 0 ||
      snakeY < 0 ||
      snakeX >= canvas.width ||
      snakeY >= canvas.height
    ) {
      return gameOver();
    }
  }

  const newHead = { x: snakeX, y: snakeY };

  if (collision(snakeX, snakeY, snake)) return gameOver();

  snake.unshift(newHead);

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = getRandomFood();
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box, 0, 2 * Math.PI);
    ctx.strokeStyle = "yellow";
    ctx.stroke();
  } else if (snakeX === powerFood.x && snakeY === powerFood.y) {
    score += 2;
    powerFood = getRandomFood();
    clearInterval(game);
    speed = Math.max(30, speed - 10);
    game = setInterval(draw, speed);
  } else {
    snake.pop();
  }

  ctx.fillStyle = "green";
  snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  ctx.fillStyle = "yellow";
  ctx.fillRect(powerFood.x, powerFood.y, box, box);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";
  ctx.fillText("Score: " + score, 10, 20);

  drawBackgroundSnake(snake, food, powerFood);
}

function gameOver() {
  clearInterval(game);
  isDead = true;
  document.getElementById("finalScore").innerText = "Score: " + score;
  document.getElementById("deathScreen").style.display = "block";
}
