import Liquid from "../Liquid.js";
import Element from "../Element.js";
import Stone from "../Solids/Stone.js";
class MoltenRock extends Liquid {
  constructor() {
    super();
    
    //random color generator
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
    this.reactPoint = 300; //reactTemp in which will cause this element to do something
    this.temperature = 800; //base temp
  }

  //passes temperature to neighbor elements
  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }

  //if temperature goes below reactPoint it will go back to Stone
  step(grid, row, col, ROWS) {
    if (this.temperature <= this.reactPoint) {
      grid[row][col] = new Stone();
    }

    //inherit liquid step
    super.step(grid, row, col, ROWS);
  }
}

export default MoltenRock;
