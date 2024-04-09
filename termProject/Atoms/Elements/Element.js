import * as PIXI from "pixi.js";

class Element {
  constructor() {
    if (this.constructor == Element) {
      throw new error("Abstract classes can't be instantiated");
    }
    this.life_time = 100;
    this.temperature = 32;
    this.velocity;
    this.color;
    this.has_been_updated;
  }

  draw(Graphics, row, col, spacer) {
    //Graphics.filters = [new PIXI.BlurFilter({ strength: 1 })];
    Graphics.rect(row * spacer, col * spacer, spacer, spacer).fill(this.color);
  }

  calculateGravity(grid, row, col) {
    let i;
    for (i = 1; i < this.velocity; i++) {
      if (grid[row][col + i] != 0) {
        if (i == 1) {
          return 1;
        } else {
          return i - 1;
        }
      }
    }
    return i;
  }

  calculateNextPosition(grid, row, col, nextRow, nextCol, elementTocheck) {
    // for (i = 1; i < nextCol; i++) {
    //   for(j = 1; j < )
    // }
  }

  actOnOther() {
    return false;
  }
}

export default Element;
