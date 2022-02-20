import { boardElement } from "./domref.js";

class Snake {
  constructor() {
    this.speed = 5;
    this.direction = null;
    this.coords = [{ x: 20, y: 10 }];
  }

  createNewSnake() {
    const lastPieceCoords = this.coords[this.coords.length - 1];
    let newPieceCoords;

    switch (this.direction) {
      case "up":
        newPieceCoords = { x: lastPieceCoords.x, y: lastPieceCoords.y + 1 };
        break;
      case "down":
        newPieceCoords = { x: lastPieceCoords.x, y: lastPieceCoords.y - 1 };
        break;
      case "left":
        newPieceCoords = { x: lastPieceCoords.x + 1, y: lastPieceCoords.y };
        break;
      case "right":
        newPieceCoords = { x: lastPieceCoords.x - 1, y: lastPieceCoords.y };
        break;
      default:
        break;
    }

    this.coords.push(newPieceCoords);

    const snakePiece = document.createElement("div");

    const snakeInner = document.createElement("div");
    snakeInner.className = "snake-inner";
    snakePiece.appendChild(snakeInner);

    snakePiece.className = "snake";
    snakePiece.style.gridRowStart = newPieceCoords.y;
    snakePiece.style.gridColumnStart = newPieceCoords.x;
    boardElement.appendChild(snakePiece);
  }

  updateSnakePosition() {
    const snakeBody = document.getElementsByClassName("snake");
    const snakeHead = snakeBody[0];

    for (let i = this.coords.length - 1; i >= 1; i--) {
      if (this.coords.length === 1) {
        break;
      } else {
        this.coords[i] = { ...this.coords[i - 1]};
        snakeBody[i].style.gridRowStart = this.coords[i].y;
        snakeBody[i].style.gridColumnStart = this.coords[i].x;
      }
    }

    switch (this.direction) {
      case "up":
        this.coords[0].y = this.coords[0].y - 1;
        break;
      case "down":
        this.coords[0].y = this.coords[0].y + 1;
        break;
      case "left":
        this.coords[0].x = this.coords[0].x - 1;
        break;
      case "right":
        this.coords[0].x = this.coords[0].x + 1;
        break;
      default:
        break;
    }

    snakeHead.style.gridRowStart = this.coords[0].y;
    snakeHead.style.gridColumnStart = this.coords[0].x;
  }

  checkCollisionWithSelf() {
    if (this.coords.length === 1) {
      return;
    }

    for (let i = 1; i < this.coords.length; i++) {
      if (
        (Math.abs(this.coords[i].x - this.coords[0].x) < 1 && (this.coords[i].y - this.coords[0].y) === 0) ||
        (Math.abs(this.coords[i].y - this.coords[0].y) < 1 && (this.coords[i].x - this.coords[0].x) === 0)
      ) {
        return true;
      }
    }
  }

  checkCollisionWithWall() {
    const snakeHeadX = this.coords[0].x;
    const snakeHeadY = this.coords[0].y;
    if (
      (snakeHeadX >= 40 || snakeHeadX <= 0) || 
      (snakeHeadY >= 20 || snakeHeadY <= 0)) {
      return true;
    }
  }

  removeSnake() {
    const intervalMultiplier = 250; // milliseconds
    const snake = Array.from(document.getElementsByClassName("snake"));

    const arrayEnd = snake.length - 1;

    snake.forEach((item, index) => {
      if (index === 0) {
        return;
      }
      setTimeout(() => boardElement.removeChild(item), (arrayEnd - index) * intervalMultiplier);
    })

    this.direction = null;
    this.coords = [{x: 20, y: 10}]
  }
}

const snake = new Snake();

export { snake };