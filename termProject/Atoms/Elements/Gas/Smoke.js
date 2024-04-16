import Gas from "../Gas.js";

class Smoke extends Gas {
  constructor() {
    super();
    this.color = "rgb(52, 53, 52)";
    this.life_time = Math.floor(Math.random() * (500 - 50) + 50);
  }

  step(grid, row, col, ROWS) {
    this.life_time -= 1;
    if (this.life_time == 0) {
      grid[row][col] = 0;
    } else {
      super.step(grid, row, col, ROWS);
    }

    this.temperature -= 5;
  }
}

export default Smoke;
