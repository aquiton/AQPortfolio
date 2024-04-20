import Liquid from "./Liquid.js";
import Solid from "./Solid.js";

class MoveAbleSolid extends Solid {
  constructor() {
    super();
    this.velocity = 5;
    this.hasBeenUpdated = false;
  }

  //checks to see if directly below and left and right diagonals are open to move to that cell
  step(grid, row, col, ROWS) {
    //cell directly under
    let gravity = this.calculateGravity(grid, row, col);
    let targetCell = grid[row][col + gravity];
    let bottomLeftCell = grid[row - 1][col + 1];
    let bottomRightCell;
    let leftCell = grid[row - 1][col];
    let rightCell;
    let aboveCell = grid[row][col - 1];

    //in bounds of screen check
    if (row < ROWS - 1) {
      bottomRightCell = grid[row + 1][col + 1];
      rightCell = grid[row + 1][col];
    }

    //random direction
    let dir = 1;
    if (Math.random(1) < 0.5) {
      dir *= -1;
    }

    //neighborcells passed to actOnother function for interactions like temperature
    let touchingCells = [aboveCell, targetCell, leftCell, rightCell];
    this.actOnOther(touchingCells);

    //cools element down to base temperature
    if (this.temperature < 0) {
      this.temperature = 0;
    } else {
      this.temperature -= 1;
    }

    //checks directly under and moves if space is open 
    if (targetCell == 0) {
      grid[row][col] = 0;
      grid[row][col + gravity] = this;
    } else if (targetCell instanceof Liquid) { //checks to see if it can swap
      //swap cells
      grid[row][col] = targetCell;
      grid[row][col + gravity] = this;
    } else if (targetCell instanceof Solid) { //checks diagonals
      if (bottomLeftCell == 0 && dir < 0) {
        grid[row][col] = 0;
        grid[row - 1][col + 1] = this;
      } else if (bottomRightCell == 0 && dir < 0) {
        grid[row][col] = 0;
        grid[row + 1][col + 1] = this;
      }
    }
  }
}

export default MoveAbleSolid;
