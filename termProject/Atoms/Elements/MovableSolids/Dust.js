import MoveAbleSolid from "../MovableSolid";
import Element from "../Element";
import Fire from "../Gas/Fire";

class Dust extends MoveAbleSolid {
  constructor() {
    super();
    let randomNumber = Math.random();
    if (randomNumber < 0.25) {
      this.color = "rgb(194, 178, 128)";
    } else if (randomNumber < 0.5) {
      this.color = "rgb(184, 168, 118)";
    } else if (randomNumber < 0.75) {
      this.color = "rgb(204, 188, 128)";
    } else {
      this.color = "rgb(174, 158, 108)";
    }
    this.temperature = 0;

    this.reactPoint = 250;
  }

  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }

  step(grid, row, col, ROWS) {
    super.step(grid, row, col, ROWS);
    if (this.temperature >= this.reactPoint) {
      grid[row][col] = new Fire();
    }
  }
}

export default Dust;
