import playButton from "../../ui/play-button/play-btn.js";
import snake from "../snake/snake.js";
import score from "../score/score.js";
import food from "../food/food.js";

import music from "../../../js/sound.js";

class Game {
  constructor() {
    this.lastRenderTime = 0;
  }

  startGame() {
    music.play();

    playButton.disable();

    food.getNewCoords();

    playGame();
  }

  endGame() {
    music.pause();
    music.currentTime = 0;

    this.lastRenderTime = 0;

    playButton.enable();
    food.hideFood();
    snake.removeSnake();
    score.reset();
  }
}

function playGame(currentTime) {
  if (snake.checkCollisionWithSelf() || snake.checkCollisionWithWall()) {
    game.endGame();
    return;
  }

  window.requestAnimationFrame(playGame);

  const secondsSinceLastRender = (currentTime - game.lastRenderTime) / 1000;

  if (secondsSinceLastRender < 1 / snake.speed) {
    return;
  }

  game.lastRenderTime = currentTime;

  snake.updateSnakePosition();
  food.checkCollisionWithSnake();
}

const game = new Game();

export default game;
