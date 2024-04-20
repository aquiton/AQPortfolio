import Gas from "../Gas.js";
import Water from "../Liquids/Water.js";

class Steam extends Gas {
  constructor() {
    super();
    this.color = "rgb(199, 213, 224)";
    this.reactPoint = 0;
    this.temperature = Math.floor(Math.random() * (1000 - 500) + 500); //random temperature
    this.allowColorChange = false; //makes sure the gas doesn't change color based on temperature
  }

  step(grid, row, col, ROWS) {
    //if this gas cools down to reactPoint it will die and be replaced by water
    if (this.temperature <= this.reactPoint) {
      grid[row][col] = new Water();
    }

    //inherits gas step
    super.step(grid, row, col, ROWS);
  }
}

export default Steam;
