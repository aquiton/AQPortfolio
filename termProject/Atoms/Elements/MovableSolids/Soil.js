import MoveAbleSolid from "../MovableSolid";
import Element from "../Element";

class Soil extends MoveAbleSolid {
  constructor() {
    super();
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
  }
  actOnOther(touchingCells) {
    touchingCells.forEach((cell) => {
      if (cell instanceof Element) {
        this.applyHeat(cell);
      }
    });
  }
}

export default Soil;
