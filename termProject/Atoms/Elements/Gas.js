import Element from "./Element.js";
import Liquid from "./Liquid.js";
import MoveAbleSolid from "./MovableSolid.js";
import Solid from "./Solid.js";

class Gas extends Element {
  constructor() {
    super();
    this.spread = 2;
    this.has_been_updated = false;
  }

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

  step(grid, row, col, ROWS) {
    //cell directly under
    let gravity = 1;
    let targetCell;
    let bottomLeftCell;
    let bottomRightCell;
    let leftSpread, rightSpread;
    let leftCell;
    let rightCell;
    let neighborLeft = grid[row - 1][col];
    let neighborRight;
    let bottomCell = grid[row][col + 1];
    let aboveCell = grid[row][col - 1];

    if (row < ROWS - 1 && col > 1) {
      bottomRightCell = grid[row + 1][col - 1];
      bottomLeftCell = grid[row - 1][col - 1];
      targetCell = grid[row][col - gravity];
      neighborRight = grid[row + 1][col];
    }

    let righBound = ROWS - this.spread;

    if (row < righBound && row > this.spread) {
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

    //random direction
    let dir = 1;

    if (Math.random(1) < 0.5) {
      dir *= -1;
    }
    if (Math.random(1) < 0.5) {
      targetCell = 1;
    }

    let touchingCells = [aboveCell, bottomCell, neighborLeft, neighborRight];
    this.actOnOther(touchingCells);

    if (this.temperature < 0) {
      this.temperature = 0;
    } else {
      this.temperature -= 1;
    }

    if (this.has_been_updated == false) {
      if (targetCell == 0) {
        grid[row][col] = 0;
        grid[row][col - gravity] = this;
      } else if (
        targetCell instanceof Liquid ||
        targetCell instanceof MoveAbleSolid
      ) {
        //swap cell
        grid[row][col] = targetCell;
        grid[row][col - gravity] = this;
      } else if (targetCell != 0) {
        if (bottomLeftCell == 0 && dir < 0) {
          grid[row][col] = 0;
          grid[row - 1][col - 1] = this;
        } else if (bottomRightCell == 0 && dir > 0) {
          grid[row][col] = 0;
          grid[row + 1][col - 1] = this;
        } else if (leftCell == 0 && dir < 0) {
          grid[row][col] = 0;
          grid[row - leftSpread][col] = this;
        } else if (rightCell == 0 && dir > 0) {
          grid[row][col] = 0;
          grid[row + rightSpread][col] = this;
        }
      } else {
        grid[row][col] = this;
      }
      this.has_been_updated = true;
    } else {
      this.has_been_updated = false;
    }
  }
}

export default Gas;
