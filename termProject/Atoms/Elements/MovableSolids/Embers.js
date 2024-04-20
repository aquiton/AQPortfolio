import MoveAbleSolid from "../MovableSolid.js";
import Element from "../Element.js";
import Smoke from "../Gas/Smoke.js";

class Ember extends MoveAbleSolid {
  constructor() {
    super();

    //random life time
    this.life_time = Math.floor(Math.random() * (300 - 100) + 100);

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
    this.hasEffect = true; //has fire effect
    this.temperature = 600; //base temp
  }

  //spread temperature to neighbor cells
  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element && !(cell instanceof Ember)) {
        this.applyHeat(cell);
      }
    });
  }

  //die slowly over time and inherit movablesolid step
  step(grid, row, col, ROWS) {
    this.life_time -= 1;
    if (this.life_time == 0) {
      grid[row][col] = 0;
    } else {
      super.step(grid, row, col, ROWS);
    }
    this.temperature += 2; //increases in temp over time

    //checks above cell and spawns smoke
    if (grid[row][col - 1] == 0) {
      if (Math.random(1) < 0.005) {
        //random smoke generator
        grid[row][col - 1] = new Smoke();
      }
    }
  }
}

export default Ember;
