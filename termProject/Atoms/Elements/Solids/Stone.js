import Solid from "../Solid";
import Element from "../Element";
import MoltenRock from "../Liquids/MoltenRock";

class Stone extends Solid {
  constructor() {
    super();
    let randomNumber = Math.random();
    if (randomNumber < 0.25) {
      this.color = "rgb(144, 152, 163)";
    } else if (randomNumber < 0.5) {
      this.color = "rgb(135, 140, 150)";
    } else if (randomNumber < 0.75) {
      this.color = "rgb(157, 162, 173)";
    } else {
      this.color = "rgb(110, 120, 130)";
    }
    this.reactPoint = 500;
    this.temperature = 0;
  }

  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }

  step(grid, row, col, ROWS) {
    if (this.temperature >= this.reactPoint) {
      grid[row][col] = new MoltenRock();
    }
    super.step(grid, row, col, ROWS);
  }
}

export default Stone;
