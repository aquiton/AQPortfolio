import Solid from "../Solid.js";
import Element from "../Element.js";
import MoltenRock from "../Liquids/MoltenRock.js";

class Stone extends Solid {
  constructor() {
    super();

    //random color generator
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
    this.reactPoint = 500; //react temp
    this.temperature = 0; //bsae temp
  }

  //pass temperature to neighbor cells
  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }

  //if temperature is greater than react point then die and be replaced by moltenrock
  step(grid, row, col, ROWS) {
    if (this.temperature >= this.reactPoint) {
      grid[row][col] = new MoltenRock();
    }

    //inherit solid step
    super.step(grid, row, col, ROWS);
  }
}

export default Stone;
