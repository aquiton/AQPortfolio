import Element from "./Element";
import Solid from "./Solid";

class Liquid extends Element {
  constructor() {
    super();
    this.id = 2;
    this.life_time = 100;
    this.velocity = 5;
    this.spread = 5;
    this.color = 0x2389da;
    this.has_been_updated = false;
  }

  calculateSpread(grid, row, col, dir) {
    const maxSpread = this.spread;
    let step = 1;
    while (step < maxSpread) {
      const nextRow = row + step * dir;
      if (
        nextRow < 0 ||
        nextRow >= grid.length ||
        grid[nextRow][col] instanceof Solid
      ) {
        break; // Stop spreading if element object encountered or out of bounds
      }
      step++;
    }
    return Math.max(1, step - 1); // Ensure at least one step, and subtract 1 as the index is zero-based
  }

  step(grid, row, col, ROWS) {
    //cell directly under

    let gravity = this.calculateGravity(grid, row, col);
    let targetCell = grid[row][col + gravity];
    let bottomLeftCell = grid[row - 1][col + 1];
    let bottomRightCell;
    let leftSpread, rightSpread;
    let leftCell, rightCell;

    //random direction
    let dir = 1;
    if (Math.random(1) < 0.5) {
      dir *= -1;
    }

    //checks
    if (row < ROWS - 1) {
      bottomRightCell = grid[row + 1][col + 1];
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
    }
  }
}

export default Liquid;
