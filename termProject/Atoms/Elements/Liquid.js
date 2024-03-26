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

  calculateGravity(grid, row, col) {
    let i;
    for (i = 1; i < this.velocity; i++) {
      if (grid[row][col + i] != 0) {
        if (i == 1) {
          return 1;
        } else {
          return i - 1;
        }
      }
    }
    return i;
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
    let gravity = this.calculateGravity(grid, row, col);
    let targetCell = grid[row][col + gravity];
    let bottomLeftCell = grid[row - 1][col + 1];
    let bottomRightCell;
    let leftSpread, rightSpread;
    let leftCell;
    let rightCell;

    if (row < ROWS - 1) {
      bottomRightCell = grid[row + 1][col + 1];
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

    if (targetCell == 0) {
      grid[row][col] = 0;
      grid[row][col + gravity] = this;
    } else if (targetCell != 0) {
      if (bottomLeftCell == 0 && dir < 0) {
        grid[row][col] = 0;
        grid[row - 1][col + 1] = this;
      } else if (bottomRightCell == 0 && dir < 0) {
        grid[row][col] = 0;
        grid[row + 1][col + 1] = this;
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
  }
}

export default Liquid;
