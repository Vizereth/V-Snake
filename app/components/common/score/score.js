import domref from "../../../js/domref.js";

class Score {
  constructor() {
    this.el = domref.storage.score;
    this.scoreText = "Score:";
    this.scoreCount = 0;
  }

  inc() {
    this.scoreCount += 10;
  }

  update() {
    this.el.textContent = `${this.scoreText} ${this.scoreCount}`;
  }

  reset() {
    this.scoreCount = 0;
    this.update();
  }
}

const score = new Score();

export default score;
