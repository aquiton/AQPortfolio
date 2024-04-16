import Gas from "../Gas.js";
import Water from "../Liquids/Water.js";

class Steam extends Gas {
  constructor() {
    super();
    this.color = "rgb(199, 213, 224)";
    this.reactPoint = 0;
    this.temperature = Math.floor(Math.random() * (1000 - 500) + 500);
    this.allowColorChange = false;
  }

  step(grid, row, col, ROWS) {
    if (this.temperature <= this.reactPoint) {
      grid[row][col] = new Water();
    }

    super.step(grid, row, col, ROWS);
  }
}

export default Steam;
