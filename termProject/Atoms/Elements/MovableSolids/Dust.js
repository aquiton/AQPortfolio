import MoveAbleSolid from "../MovableSolid.js";
import Element from "../Element.js";
import Fire from "../Gas/Fire.js";

class Dust extends MoveAbleSolid {
  constructor() {
    super();

    //random color generator
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
    this.temperature = 0; //base temp

    this.reactPoint = 250;
  }

  //spread temperature
  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }

  //if temperature is greater than react point die and be replaced by fire
  step(grid, row, col, ROWS) {
    super.step(grid, row, col, ROWS);
    if (this.temperature >= this.reactPoint) {
      grid[row][col] = new Fire();
    }
  }
}

export default Dust;
