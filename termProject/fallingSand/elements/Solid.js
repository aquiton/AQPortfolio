import Element from "./Element";

class Solid extends Element {
  //
  constructor() {
    super();
    if (this.constructor == Solid) {
      throw new error("Abstract classes can't be instantiated");
    }
  }

  
}

export default Solid;
