import domref from "../../../js/domref.js";

import score from "../score/score.js";
import snake from "../snake/snake.js";
import board from "../board/board.js";

import getRandomNumber from "../../../js/helpers.js";

class Food {
  constructor() {
    this.x = null;
    this.y = null;
    this.el = domref.storage.food;
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
    if (this.el === null) {
      this.createFood();
      return;
    }

    this.hideFood();
    setTimeout(() => this.changeCoords(), 1000);
  }

  changeCoords() {
    this.el.style.gridRowStart = this.y;
    this.el.style.gridColumnStart = this.x;
    this.showFood();
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
      (Math.abs(this.x - snakeHeadX) < 1 &&
        Math.abs(this.y - snakeHeadY) === 0) ||
      (Math.abs(this.y - snakeHeadY) < 1 && Math.abs(this.x - snakeHeadX) === 0)
    ) {
      score.inc();
      score.update();

      this.getNewCoords();
      snake.createNewSnake();
    }
  }

  showFood() {
    this.el.style.visibility = "visible";
  }

  hideFood() {
    this.el.style.visibility = "hidden";
  }
}

const food = new Food();

export default food;
