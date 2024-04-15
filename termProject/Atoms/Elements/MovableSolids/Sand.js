import MoveAbleSolid from "../MovableSolid";
import Element from "../Element";

class Sand extends MoveAbleSolid {
  constructor() {
    super();
    let randomNumber = Math.random();
    if (randomNumber < 0.25) {
      this.color = "rgb(168, 143, 100)";
    } else if (randomNumber < 0.5) {
      this.color = "rgb(158, 133, 90)";
    } else if (randomNumber < 0.75) {
      this.color = "rgb(178, 153, 110)";
    } else {
      this.color = "rgb(148, 123, 80)";
    }
  }
  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }
}

export default Sand;
