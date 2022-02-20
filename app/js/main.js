import game from "../components/common/game/game.js";
import playButton from "../components/ui/play-button/play-btn.js";
import pressKey from "./controller.js";

const initPlayButton = () => {
  playButton.el.addEventListener("click", () => game.startGame());
};

const init = () => {
  initPlayButton();
  window.addEventListener("keydown", pressKey);
};

window.addEventListener("DOMContentLoaded", init);