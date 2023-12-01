import snake from "../components/common/snake/snake.js"

const pressKey = (e) => {
  switch (e.keyCode) {
    case 38:
      if (snake.direction !== "down") {
        snake.direction = "up";
      }
      break;
    case 40:
      if (snake.direction !== "up") {
        snake.direction = "down";
      }
      break;
    case 37:
      if (snake.direction !== "right") {
        snake.direction = "left";
      }
      break;
    case 39:
      if (snake.direction !== "left") {
        snake.direction = "right";
      }
      break;
    default:
      break;
  }
}

export default pressKey;