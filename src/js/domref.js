class DOMRef {
  constructor() {
    this.storage = {
      board: document.querySelector(".board"),
      playButton: document.querySelector(".play-btn"),
      score: document.querySelector(".score__text"),
      food: document.querySelector(".food")
    };
  }
}

const domref = new DOMRef();

export default domref;
