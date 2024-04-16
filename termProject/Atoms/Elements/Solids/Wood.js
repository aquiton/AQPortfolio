import Solid from "../Solid";
import Element from "../Element";
import Embers from "../MovableSolids/Embers";
import Fire from "../Gas/Fire";

class Wood extends Solid {
  constructor() {
    super();
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
  }

  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }

  step(grid, row, col, ROWS) {
    if (this.temperature >= this.reactPoint) {
      this.hasEffect = true;
      this.temperature += 10;
      this.life_time -= 1;
      if (this.life_time <= 0) {
        if (Math.random(1) < 0.25) {
          grid[row][col] = new Embers();
        } else {
          grid[row][col] = new Fire();
        }
      }
    } else {
      this.hasEffect = false;
    }
    super.step(grid, row, col, ROWS);
  }
}

export default Wood;
