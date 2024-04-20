import Element from "./Element.js";
import Solid from "./Solid.js";

class Liquid extends Element {
  constructor() {
    super();
    this.velocity = 5;
    this.spread = 5;
    this.color = 0x2389da;
    this.hasBeenUpdated = false;
  }
  //just like gravity finds the next avaliable spot looking in the horizontal directions
  calculateSpread(grid, row, col, dir) {
    let i;
    if (dir > 0) {
      for (i = 1; i < this.spread; i++) {
        if (grid[row + i][col] instanceof Solid) {
          if (i == 1) {
            return 1;
          } else {
            return i - 1;
          }
        }
      }
    } else {
      for (i = 1; i < this.spread; i++) {
        if (grid[row - i][col] instanceof Solid) {
          if (i == 1) {
            return 1;
          } else {
            return i - 1;
          }
        }
      }
    }

    return i;
  }

  //main movement of liquid elements
  //just like movable solids but checks left and right as well
  step(grid, row, col, ROWS) {
    let gravity = this.calculateGravity(grid, row, col);
    let targetCell = grid[row][col + gravity];
    let bottomLeftCell = grid[row - 1][col + 1];
    let bottomRightCell;
    let leftSpread, rightSpread;
    let leftCell, rightCell;
    let neighborLeft = grid[row - 1][col];
    let neighborRight;
    let bottomCell = grid[row][col + 1];
    let aboveCell = grid[row][col - 1];

    //random direction
    let dir = 1;
    if (Math.random(1) < 0.5) {
      dir *= -1;
    }

    //in bounds of screen check
    if (row < ROWS - 1) {
      bottomRightCell = grid[row + 1][col + 1];
      neighborRight = grid[row + 1][col];
    }

    let righBound = ROWS - this.spread;

    if (row < ROWS - this.spread && row > this.spread) {
      //  rightSpread
      rightSpread = this.calculateSpread(grid, row, col, 1);
      rightCell = grid[row + rightSpread][col];

      //leftSpread
      leftSpread = this.calculateSpread(grid, row, col, -1);
      leftCell = grid[row - leftSpread][col];
    } else if (row > righBound && row < ROWS - 1) {
      leftSpread = 5;
      leftCell = grid[row - leftSpread][col];
      rightSpread = 1;
      rightCell = grid[row + rightSpread][col];
    } else if (row > 0 && row < this.spread) {
      leftSpread = 1;
      leftCell = grid[row - leftSpread][col];
      rightSpread = 5;
      rightCell = grid[row + rightSpread][col];
    }

    //neighborCells needed for actOnother (ex. temperature distribution)
    let touchingCells = [aboveCell, bottomCell, neighborLeft, neighborRight];
    this.actOnOther(touchingCells);

    //cools element down to base temperature
    if (this.temperature < 0) {
      this.temperature = 0;
    } else {
      this.temperature -= 1;
    }

    //checks to see if this element has been updated for no teleportations and elements being updated multiple times in one tick
    if (this.hasBeenUpdated == false) {
      if (targetCell == 0) {
        grid[row][col] = 0;
        grid[row][col + gravity] = this;
      } else if (targetCell != 0) {
        if (bottomLeftCell == 0 && dir < 0) {
          grid[row][col] = 0;
          grid[row - 1][col + 1] = this;
        } else if (bottomRightCell == 0 && dir > 0) {
          grid[row][col] = 0;
          grid[row + 1][col + 1] = this;
        } else if (leftCell == 0 && dir < 0) {
          grid[row][col] = 0;
          grid[row - leftSpread][col] = this;
        } else if (rightCell == 0 && dir > 0) {
          grid[row][col] = 0;
          grid[row + rightSpread][col] = this;
        } else {
          grid[row][col] = this;
        }
      } else {
        grid[row][col] = this;
      }
      this.hasBeenUpdated = true;
    } else {
      this.hasBeenUpdated = false;
    }
  }
}

export default Liquid;
