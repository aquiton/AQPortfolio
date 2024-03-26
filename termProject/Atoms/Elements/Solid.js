import Element from "./Element";

class Solid extends Element {
  constructor() {
    super();
  }

  step(grid, row, col, ROWS) {
    grid[row][col] = this;
  }
}

export default Solid;
