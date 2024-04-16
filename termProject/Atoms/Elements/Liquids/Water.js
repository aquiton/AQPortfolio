import Liquid from "../Liquid";
import Steam from "../Gas/Steam";
class Water extends Liquid {
  constructor() {
    super();
    let randomNumber = Math.random();
    if (randomNumber < 0.25) {
      this.color = "rgb(35, 137, 218)";
    } else if (randomNumber < 0.5) {
      this.color = "rgb(25, 127, 208)";
    } else if (randomNumber < 0.75) {
      this.color = "rgb(45, 147, 228)";
    } else {
      this.color = "rgb(15, 117, 198)";
    }
    this.reactPoint = 100;
    this.temperature = -10;
  }

  step(grid, row, col, ROWS) {
    if (this.temperature >= this.reactPoint) {
      grid[row][col] = new Steam();
    }
    super.step(grid, row, col, ROWS);
  }
}

export default Water;
