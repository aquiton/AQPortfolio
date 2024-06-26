import Solid from "../Solid.js";
import Element from "../Element.js";
import Embers from "../MovableSolids/Embers.js";
import Fire from "../Gas/Fire.js";
import Soil from "../MovableSolids/Soil.js";

class Wood extends Solid {
  constructor() {
    super();

    //random color generator
    let randomNumber = Math.random();
    if (randomNumber < 0.25) {
      this.color = "rgb(161, 102, 47)";
    } else if (randomNumber < 0.5) {
      this.color = "rgb(151, 92, 37)";
    } else if (randomNumber < 0.75) {
      this.color = "rgb(171, 112, 57)";
    } else {
      this.color = "rgb(141, 82, 27)";
    }
    this.reactPoint = 300;
    this.temperature = 0;
    this.isRooted = false; //going to be used for tree growth
    this.canGrow = true; ////going to be used for tree growth
  }

  //pass temperature to neighbor cells
  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }

  //if the temperature is greater than the react point then decrease life time and increase temperature and have fire effect
  step(grid, row, col, ROWS) {
    if (this.temperature >= this.reactPoint) {
      this.hasEffect = true;
      this.temperature += 10;
      this.life_time -= 1;
      if (this.life_time <= 0) {
        //upon death either spawn Embers or Fire
        if (Math.random(1) < 0.25) {
          grid[row][col] = new Embers();
        } else {
          grid[row][col] = new Fire();
        }
      }
    } else {
      this.hasEffect = false;
    }

    //inherit solid step
    super.step(grid, row, col, ROWS);
  }
}

export default Wood;
