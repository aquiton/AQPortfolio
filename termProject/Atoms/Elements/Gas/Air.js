import Gas from "../Gas";

class Air extends Gas {
  constructor() {
    super();
    this.color = "rgb(161, 159, 160)";
  }

  step(grid, row, col, ROWS) {
    super.step(grid, row, col, ROWS);
    this.temperature -= 5;
  }
}

export default Air;
