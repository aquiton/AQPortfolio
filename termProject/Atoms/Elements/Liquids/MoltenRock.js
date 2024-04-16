import Liquid from "../Liquid";
import Element from "../Element";
import Stone from "../Solids/Stone";
class MoltenRock extends Liquid {
  constructor() {
    super();
    let randomNumber = Math.random();
    if (randomNumber < 0.25) {
      this.color = "rgb(255, 90, 0)";
    } else if (randomNumber < 0.5) {
      this.color = "rgb(245, 80, 0)";
    } else if (randomNumber < 0.75) {
      this.color = "rgb(255, 100, 10)";
    } else {
      this.color = "rgb(235, 70, 0)";
    }
    this.reactPoint = 300;
    this.temperature = 800;
  }

  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }

  step(grid, row, col, ROWS) {
    if (this.temperature <= this.reactPoint) {
      grid[row][col] = new Stone();
    }
    super.step(grid, row, col, ROWS);
  }
}

export default MoltenRock;
