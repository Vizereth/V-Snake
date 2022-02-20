import domref from "../../../js/domref.js";

class PlayButton {
  constructor() {
    this.el = domref.storage.playButton;
  }

  enable() {
    this.el.disabled = false;
    this.el.style.visibility = "visible";
  }

  disable() {
    this.el.disabled = true;
    this.el.style.visibility = "hidden";
  }
}

const playButton = new PlayButton();

export default playButton;
