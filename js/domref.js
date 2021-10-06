import { game } from "./script.js";

const boardElement = document.getElementsByClassName("board")[0];
const playButton = document.getElementsByClassName("play")[0];
const scoreElement = document.getElementsByClassName("score")[0];

playButton.addEventListener("click", () => game.startGame());

function switchPlayButton(x) {
  if (x === 0) {
    playButton.disabled = true;
    playButton.style.visibility = "hidden";
  } else if (x === 1) {
    playButton.disabled = false;
    playButton.style.visibility = "visible";
  }
}

export { boardElement, scoreElement, switchPlayButton };