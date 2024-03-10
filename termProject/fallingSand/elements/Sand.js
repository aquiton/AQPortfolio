import MoveAbleSolid from "./MovableSolid";

class Sand extends MoveAbleSolid {
  //
  constructor() {
    super();
    this.color = 0xc2b280;
    this.name = "sand";
  }
}

export default Sand;
