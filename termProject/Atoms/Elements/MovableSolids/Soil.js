import MoveAbleSolid from "../MovableSolid.js";
import Element from "../Element.js";
import Wood from "../Solids/Wood.js";
import Grass from "../Solids/Grass.js";

class Soil extends MoveAbleSolid {
  constructor() {
    super();

    //random color generator
    let randomNumber = Math.random();
    if (randomNumber < 0.25) {
      this.color = "rgb(114,81,58)";
    } else if (randomNumber < 0.5) {
      this.color = "rgb(104,71,48)";
    } else if (randomNumber < 0.75) {
      this.color = "rgb(124,91,68)";
    } else if (randomNumber < 0.8) {
      this.color = "rgb(102,102,102)";
    } else {
      this.color = "rgb(94,61,38)";
    }
    this.canGrowTree = Math.random(1) < 0.5 ? true : false; //random boolean gen
    this.canGrowPlant = Math.random(1) < 0.5 ? true : false; //random boolean gen
  }

  //transfer heat to other cells
  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }


  //inherit movable solid step and calls grow plant function
  step(grid, row, col, ROWS) {
    this.growPlant(grid, row, col);

    super.step(grid, row, col, ROWS);
  }


  //checks if it can grow a plant and if its touching the bottom and there is nothing above it
  growPlant(grid, row, col) {
    if (
      grid[row][col - 1] == 0 &&
      grid[row][col + 1] != 0 &&
      this.canGrowPlant &&
      this.temperature == 0
    ) {
      if (Math.random(1) < 0.0005) { //random generator to spawn grass

        //once the if statement is true it will spawn grass
        grid[row][col - 1] = new Grass();

        //also allows other neighboring soil to spawn grass //increases odds of spawning grass
        if (grid[row - 1][col] instanceof Soil) {
          grid[row - 1][col].canGrowPlant = true;
        }
        if (grid[row + 1][col] instanceof Soil) {
          grid[row + 1][col].canGrowPlant = true;
        }
        if (grid[row - 1][col + 1] instanceof Soil) {
          grid[row - 1][col + 1].canGrowPlant = true;
        }
        if (grid[row + 1][col + 1] instanceof Soil) {
          grid[row + 1][col + 1].canGrowPlant = true;
        }
      }
    }
  }
}

export default Soil;
