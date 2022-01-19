let inputDir = { x: 0, y: 0 };

const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 19;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
  {
    x: 13,
    y: 15,
  },
];
food = { x: 6, y: 7 };

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 2000 < 1 / speed) {
    return;
  }

  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  for (let index = 1; index < snakeArr.length; index++) {
    if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
      return true;
    }
  }

  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  if (isCollide(snakeArr)) {
    musicSound.pause();
    musicSound.currentTime = 0;
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over, Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    scoreBox.innerHTML = "score: " + 0;
  }

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiScoreVal) {
      hiScoreVal = score;
      localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
      hiscoreBox.innerHTML = "HiScore: " + hiScoreVal;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  musicSound.play();
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }

    board.appendChild(snakeElement);
  });

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

let hiScore = localStorage.getItem("hiScore");
if (hiScore === null) {
  hiScoreVal = 0;
  localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
} else {
  hiScoreVal = JSON.parse(hiScore);
  hiscoreBox.innerHTML = "HiScore: " + hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
