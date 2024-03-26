import MoveAbleSolid from "./MovableSolid";

class Ember extends MoveAbleSolid {
  constructor() {
    super();
    this.life_time = 10;
    this.color = 0xff5a00;
  }

  burn() {
    //take surrounding pixels darken color
    //take their temp and once temp reaches limit
    //ignite or release gas/steam
  }
}
