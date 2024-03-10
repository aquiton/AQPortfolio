import Liquid from "./Liquid";
import Solid from "./Solid";

class MoveAbleSolid extends Solid {
  //
  constructor() {
    super();
    if (this.constructor == Solid) {
      throw new error("Abstract classes can't be instantiated");
    }
    this.velocity = 1;
  }

  step(grid, row, col, gridCol, gridRow, nextGenerationGrid) {
    //new cell position
    let position = [];

    //direct under target cell
    let targetCell = grid[row][col + 1];
    let nextTargetCell = nextGenerationGrid[row][col + 1];

    //random directin
    let dir = 1;
    if (Math.random(1) < 0.5) {
      dir *= -1;
    }

    //left and right diagonal check
    let targetLeft;
    let targetRight;
    let NextTargetL;
    let NextTargetR;

    if (row > 0 && row < gridRow - 1) {
      targetLeft = grid[row - 1][col + 1];
      targetRight = grid[row + 1][col + 1];
      NextTargetL = nextGenerationGrid[row - 1][col + 1];
      NextTargetR = nextGenerationGrid[row + 1][col + 1];
    } else if (row == 0) {
      targetRight = grid[row + 1][col + 1];
      NextTargetR = nextGenerationGrid[row + 1][col + 1];
    } else if (row == gridRow - 1) {
      targetLeft = grid[row - 1][col + 1];
      NextTargetL = nextGenerationGrid[row - 1][col + 1];
    }

    //gravity

    for (let i = 1; i < this.gravity; i++) {
      if (grid[row][col + i] == 0) {
        this.velocity = i;
      } else {
        if (i == 1) {
          this.velocity = 1;
        } else {
          this.velocity = i - 1;
        }
        break;
      }
    }

    targetCell = grid[row][col + this.velocity];
    nextTargetCell = nextGenerationGrid[row][col + this.velocity];

    //if the target cell is empty move to target cell

    if (targetCell == 0 && nextTargetCell == 0) {
      position.push(row);
      position.push(col + this.velocity);
    } else if (targetCell instanceof Liquid) {
      let tempElementX = this.x;
      let tempElementY = this.y;
      position.push(targetCell.getX());
      position.push(targetCell.getY());
      targetCell.swapPositions(tempElementX, tempElementY);
    } else if (targetCell instanceof Solid) {
      if (NextTargetL == 0 && dir < 0) {
        position.push(row - 1);
        position.push(col + 1);
      } else if (targetRight == 0 && dir > 0) {
        position.push(row + 1);
        position.push(col + 1);
      } else {
        position.push(row);
        position.push(col);
      }
    } else {
      position.push(row);
      position.push(col);
    }

    return position;
  }
}

export default MoveAbleSolid;
