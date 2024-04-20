import Element from "./Element.js";

class Solid extends Element {
  constructor() {
    super();
  }

  step(grid, row, col) {
    //stays in place doesn't need to move any where
    let targetCell = grid[row][col + 1];
    let rightCell = grid[row + 1][col];
    let leftCell = grid[row - 1][col];
    let aboveCell = grid[row][col - 1];
    let touchingCells = [targetCell, aboveCell];

    //checks for neighborcells to make sure they are in bounds of the 2d grid
    if (grid[row + 1][col] != 0 && grid[row - 1][col] != 0) {
      rightCell = grid[row + 1][col];
      leftCell = grid[row - 1][col];
      touchingCells.push(rightCell);
      touchingCells.push(leftCell);
    }

    //calls actonother function and passes neighbor cells
    this.actOnOther(touchingCells);

    //cools element down to base temperature
    if (this.temperature < 0) {
      this.temperature = 0;
    } else {
      this.temperature -= 1;
    }
  }
}

export default Solid;
