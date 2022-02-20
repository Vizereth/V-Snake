import domref from "../../../js/domref.js";

class Board {
  constructor() {
    this.el = domref.storage.board;
    this.inner = this.el.querySelector(".board__inner");
  }
}

const board = new Board();

export default board;
