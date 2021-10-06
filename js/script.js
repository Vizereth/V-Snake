import { switchPlayButton, scoreElement } from "./domref.js";
import { food } from "./food.js";
import { snake } from "./snake.js";
import { music } from "./sound.js";

class Game {
  constructor() {
    this.score = 0;
    this.lastRenderTime = 0;
  }

  startGame() {
    music.play(); 

    switchPlayButton(0);

    food.getNewCoords();

    playGame();
  }

  endGame() {
    music.pause();
    music.currentTime = 0;

    this.setFinalScore();

    this.lastRenderTime = 0;
  
    switchPlayButton(1);

    food.removeFood();

    snake.removeSnake();
  }

  setFinalScore() {
    this.score = 0;
    scoreElement.textContent = "Score: " + this.score;
  }
}

function playGame(currentTime) {
  if (snake.checkCollisionWithSelf() || snake.checkCollisionWithWall()) {
    game.endGame();
    return;
  }

  window.requestAnimationFrame(playGame)

  const secondsSinceLastRender = (currentTime - game.lastRenderTime) / 1000;

  if (secondsSinceLastRender < 1 / snake.speed) {
    return;
  }

  game.lastRenderTime = currentTime;

  snake.updateSnakePosition();
  food.checkCollisionWithSnake();

}

const game = new Game();

export { game };