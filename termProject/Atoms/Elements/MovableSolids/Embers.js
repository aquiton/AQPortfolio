import MoveAbleSolid from "../MovableSolid";

class Ember extends MoveAbleSolid {
  constructor() {
    super();
    this.life_time = 10;
    this.color = 0xff5a00;
    this.hasInteract = true;
  }

  
  actOnOther(cell){
    
  }


}

export default Ember;
