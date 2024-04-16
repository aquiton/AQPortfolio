import Gas from "../Gas.js";
import Smoke from "./Smoke.js";
import Element from "../Element.js";

class Fire extends Gas {
  constructor() {
    super();
    let randomNumber = Math.random();
    if (randomNumber < 0.25) {
      this.color = "rgb(255, 90, 0)";
    } else if (randomNumber < 0.5) {
      this.color = "rgb(245, 80, 0)";
    } else if (randomNumber < 0.75) {
      this.color = "rgb(255, 100, 10)";
    } else {
      this.color = "rgb(235, 70, 0)";
    }
    this.hasEffect = true;
    this.temperature = 1000;
    this.life_time = Math.floor(Math.random() * (25 - 5) + 5);
  }

  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element && !(cell instanceof Fire)) {
        this.applyHeat(cell);
      }
    });
  }

  step(grid, row, col, ROWS) {
    this.life_time -= 1;
    if (this.life_time == 0) {
      grid[row][col] = 0;
    } else {
      super.step(grid, row, col, ROWS);
    }

    this.temperature += 2;

    if (grid[row][col - 1] == 0) {
      if (Math.random(1) < 0.005) {
        grid[row][col - 1] = new Smoke();
      }
    }
  }
}

export default Fire;
