import MoveAbleSolid from "./MovableSolid";

class Sand extends MoveAbleSolid {
  constructor() {
    super();
    this.color = 0xc2b280;
    this.life_time = 50;
  }
}

export default Sand;
