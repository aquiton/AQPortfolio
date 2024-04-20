import Liquid from "../Liquid.js";
import Steam from "../Gas/Steam.js";
class Water extends Liquid {
  constructor() {
    super();

    //random color generator
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
    this.reactPoint = 100; //reactPoint for doing something 
    this.temperature = -10; //base temp
  }

  step(grid, row, col, ROWS) {

    //if temp reaches react point it will die and be replaced by steam
    if (this.temperature >= this.reactPoint) {
      grid[row][col] = new Steam();
    }

    //inherit water step
    super.step(grid, row, col, ROWS);
  }
}

export default Water;
