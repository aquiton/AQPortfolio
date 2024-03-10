import Element from "./Element";

class Liquid extends Element {
  constructor() {
    super();
    if (this.constructor == Liquid) {
      throw new error("Abstract Classes can't be instantiated");
    }
    this.swap = false;

    this.velocity = 2;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  swapPositions(x, y) {
    this.swap = true;
    this.x = x;
    this.y = y;
  }

  step(grid, row, col, gridRow, nextGenerationGrid) {
    //new cell position
    //target cell
    let targetCell = grid[row][col + 1];
    let nextTargetCell = nextGenerationGrid[row][col + 1];
    let targetCellL;
    let targetCellR;
    let nextCellL;
    let nextCellR;
    let targetCellBottomL, targetCellBottomR;
    let nextTargetBottomL, nextTargetBottomR;
    let spreadL = 1; //tied in velocity
    let spreadR = 1;
    let fall; // tied in gravity
    let dir = 1;
    if (Math.random() < 0.5) {
      dir *= -1;
    }

    if (row > this.velocity && row < gridRow - 1 - this.velocity) {
    }

    if (row > 0 && row < gridRow - 1) {
      targetCellL = grid[row - 1][col];
      targetCellR = grid[row + 1][col];
      nextCellL = nextGenerationGrid[row - 1][col];
      nextCellR = nextGenerationGrid[row + 1][col];
      targetCellBottomL = grid[row - 1][col + 1];
      targetCellBottomR = grid[row + 1][col + 1];
      nextTargetBottomL = nextGenerationGrid[row - 1][col + 1];
      nextTargetBottomR = nextGenerationGrid[row + 1][col + 1];
    } else if (row == 0) {
      targetCellBottomR = grid[row + 1][col + 1];
      nextTargetBottomR = nextGenerationGrid[row + 1][col + 1];
      targetCellR = grid[row + 1][col];
      nextCellR = nextGenerationGrid[row + 1][col];
    } else if (row == gridRow - 1) {
      targetCellBottomL = grid[row - 1][col + 1];
      nextTargetBottomL = nextGenerationGrid[row - 1][col + 1];
      targetCellL = grid[row - 1][col];
      nextCellL = nextGenerationGrid[row - 1][col];
    }

    //new cell position;
    let position = [];

    //if the target cell is empty move to target cell
    if (this.swap) {
      position.push(this.x);
      position.push(this.y);
      this.swap = false;
    } else if (targetCell == 0 && nextTargetCell == 0) {
      position.push(row);
      position.push(col + 1);
    } else if (nextTargetBottomL == 0 && dir < 0) {
      position.push(row - 1);
      position.push(col + 1);
    } else if (targetCellBottomR == 0 && dir > 0) {
      position.push(row + 1);
      position.push(col + 1);
    } else if (nextCellL == 0 && dir < 0) {
      position.push(row - 1);
      position.push(col);
    } else if (targetCellR == 0 && nextCellR == 0 && dir > 0) {
      position.push(row + 1);
      position.push(col);
    } else {
      position.push(row);
      position.push(col);
    }

    return position;
  }
}

export default Liquid;
