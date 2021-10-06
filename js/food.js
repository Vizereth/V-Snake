import { game } from "./script.js";
import { boardElement, scoreElement } from "./domref.js";
import { snake } from "./snake.js";

class Food {
  constructor() {
    this.x = null;
    this.y = null;
    this.food = null;
  }

  getNewCoords() {
    let newX = 0;
    let newY = 0;

    do {
      newX = getRandomNumber(3, 35);
      newY = getRandomNumber(3, 15);
    } while (this.checkFoodCoords(this.x, this.y));

    this.x = newX;
    this.y = newY;

    // When food is created for the first time after pressing the Play button.
    if (this.food === null) {
      this.createFood();
      return;
    }

    this.food.style.visibility = "hidden";
    setTimeout(() => this.changeCoords(), 1000);
  }

  createFood() {
    const foodElement = document.createElement("div");

    for(let i = 0; i <= 3; i++) {
      const foodLine = document.createElement("div");
      foodLine.className = "food-line";
      foodElement.appendChild(foodLine);
    }

    const foodInner = document.createElement("div");
    foodInner.className = "food-inner";
    foodElement.appendChild(foodInner);

    foodElement.className = "food";
    foodElement.style.gridRowStart = this.y;
    foodElement.style.gridColumnStart = this.x;
    boardElement.appendChild(foodElement);

    this.food = foodElement;
  }

  changeCoords() {
    this.food.style.gridRowStart = this.y;
    this.food.style.gridColumnStart = this.x;
    this.food.style.visibility = "visible";
  }

  checkFoodCoords(x, y) {
    snake.coords.forEach((item) => {
      if (x === item.x && y === item.y) {
        return true;
      }
    });
  }

  checkCollisionWithSnake() {
    const snakeHeadX = snake.coords[0].x;
    const snakeHeadY = snake.coords[0].y;

    if (
      (Math.abs(this.x - snakeHeadX) < 1 && Math.abs(this.y - snakeHeadY) === 0) ||
      (Math.abs(this.y - snakeHeadY) < 1 && Math.abs(this.x - snakeHeadX) === 0)
    ) {

      game.score += 10;
      scoreElement.textContent = "Score: " + game.score;

      this.getNewCoords();
      snake.createNewSnake();
    }
  }

  removeFood() {
    const foodElement = document.getElementsByClassName("food")[0];
    boardElement.removeChild(foodElement);
    this.food = null;
  }
}

const food = new Food();

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export { food };
