import * as PIXI from "pixi.js";

class Element {
  constructor() {
    if (this.constructor == Element) {
      throw new error("Abstract classes can't be instantiated");
    }
    this.id;
    this.life_time;
    this.velocity;
    this.color;
    this.has_been_updated;
  }

  draw(Graphics, row, col, spacer) {
    //Graphics.filters = [new PIXI.BlurFilter({ strength: 1 })];
    Graphics.rect(row * spacer, col * spacer, spacer, spacer).fill(this.color);
  }
}

export default Element;
