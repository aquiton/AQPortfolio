import Solid from "../Solid.js";
import Element from "../Element.js";
import Embers from "../MovableSolids/Embers.js";
import Fire from "../Gas/Fire.js";
import Soil from "../MovableSolids/Soil.js";

class Grass extends Solid {
  constructor() {
    super();

    //random color generator
    let randomNumber = Math.random();
    if (randomNumber < 0.5) {
      this.color = "rgb(56, 126, 38)";
    } else {
      this.color = "rgb(46, 102, 31)";
    }
    this.reactPoint = 1;
    this.temperature = 0; //base temp
    this.life_time = 10;
  }

  //apply heat to other elements
  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }

  //if base temp is greater than react point then set it on fire and decrease life time and increase temperature
  step(grid, row, col, ROWS) {
    if (this.temperature >= this.reactPoint) {
      this.hasEffect = true;
      this.temperature += 2;
      this.life_time -= 1;
      if (this.life_time <= 0) {
        //upon death spawn fire element
        grid[row][col] = new Fire();
      }
    } else {
      this.hasEffect = false;
    }

    //call grow and die methods
    this.grow(grid, row, col);
    this.die(grid, row, col);

    //inherits solid step
    super.step(grid, row, col, ROWS);
  }

  //basically allows the grass to only grow three pixels high
  grow(grid, row, col) {
    if (grid[row][col + 1] instanceof Soil) {
      if (Math.random(1) < 0.5) {
        if (grid[row][col - 1] == 0) {
          grid[row][col - 1] = new Grass();
        }
      }
    }
    if (
      grid[row][col + 2] instanceof Soil &&
      grid[row][col + 1] instanceof Grass
    ) {
      if (Math.random(1) < 0.25) {
        if (grid[row][col - 1] == 0) {
          grid[row][col - 1] = new Grass();
        }
      }
    }
    if (
      grid[row][col + 2] instanceof Soil &&
      grid[row][col + 1] instanceof Grass
    ) {
      if (Math.random(1) < 0.25) {
        if (grid[row][col - 1] == 0) {
          grid[row][col - 1] = new Grass();
        }
      }
    }
  }

  //if soil is moved beneth the grass then it will die
  die(grid, row, col) {
    if (grid[row][col + 1] == 0) {
      grid[row][col] = 0;
    }
  }
}

export default Grass;
