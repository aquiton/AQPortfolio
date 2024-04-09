import Liquid from "./Liquid";
import Solid from "./Solid";

class MoveAbleSolid extends Solid {
  constructor() {
    super();
    this.id = 1;
    this.life_time = 100;
    this.velocity = 5;
    this.has_been_updated = false;
  }

  step(grid, row, col, ROWS) {
    //cell directly under
    let gravity = this.calculateGravity(grid, row, col);
    let targetCell = grid[row][col + gravity];
    let bottomLeftCell = grid[row - 1][col + 1];
    let bottomRightCell;

    if (row < ROWS - 1) {
      bottomRightCell = grid[row + 1][col + 1];
    }

    //random direction
    let dir = 1;
    if (Math.random(1) < 0.5) {
      dir *= -1;
    }

    //console.log(this.actOnOther());

    if (targetCell == 0) {
      grid[row][col] = 0;
      grid[row][col + gravity] = this;
    } else if (targetCell instanceof Liquid) {
      //swap cells

      grid[row][col] = targetCell;
      grid[row][col + gravity] = this;
    } else if (targetCell instanceof Solid) {
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
