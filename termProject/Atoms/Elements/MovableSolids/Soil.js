import MoveAbleSolid from "../MovableSolid.js";
import Element from "../Element.js";
import Wood from "../Solids/Wood.js";

class Soil extends MoveAbleSolid {
  constructor() {
    super();
    let randomNumber = Math.random();
    if (randomNumber < 0.25) {
      this.color = "rgb(114,81,58)";
    } else if (randomNumber < 0.5) {
      this.color = "rgb(104,71,48)";
    } else if (randomNumber < 0.75) {
      this.color = "rgb(124,91,68)";
    } else if (randomNumber < 0.8) {
      this.color = "rgb(102,102,102)";
    } else {
      this.color = "rgb(94,61,38)";
    }
    this.canGrowTree = true;
  }
  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }

  step(grid, row, col, ROWS) {
    // if (
    //   grid[row][col - 1] == 0 &&
    //   grid[row][col + 1] != 0 &&
    //   this.canGrowTree
    // ) {
    //   if (Math.random(1) < 0.00005) {
    //     grid[row][col - 1] = new Wood();
    //     //check other soils around and make sure they can't grow tree
    //   }
    // }

    super.step(grid, row, col, ROWS);
  }
}

export default Soil;
