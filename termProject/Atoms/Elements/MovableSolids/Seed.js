import MoveAbleSolid from "../MovableSolid.js";
import Element from "../Element.js";
import Soil from "./Soil.js";
import Wood from "../Solids/Wood.js";

class Seed extends MoveAbleSolid {
  constructor() {
    super();

    this.color = "rgb(164,180,107)";
  }

  step(grid, row, col, ROWS) {
    if (grid[row][col + 1] instanceof Soil) {
      grid[row][col] = new Wood();
    }

    super.step(grid, row, col, ROWS);
  }
}

export default Seed;
