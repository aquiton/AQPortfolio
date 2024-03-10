class Element {
  //init
  constructor(x, y) {
    if (this.constructor == Element) {
      throw new error("Abstract classes can't be instantiated");
    }
    this.x = x;
    this.y = y;
    this.gravity = 5;
    this.isFalling = false;
  }

  //methods
  step() {
    throw new Error("Method 'step()' must be implemented.");
  }
  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
  setNewPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default Element;
