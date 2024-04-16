import Element from "./Element.js";

class Solid extends Element {
  constructor() {
    super();
  }

  step(grid, row, col) {
    let targetCell = grid[row][col + 1];
    let rightCell = grid[row + 1][col];
    let leftCell = grid[row - 1][col];
    let aboveCell = grid[row][col - 1];
    let touchingCells = [targetCell, aboveCell];
    if (grid[row + 1][col] != 0 && grid[row - 1][col] != 0) {
      rightCell = grid[row + 1][col];
      leftCell = grid[row - 1][col];
      touchingCells.push(rightCell);
      touchingCells.push(leftCell);
    }

    this.actOnOther(touchingCells);
    if (this.temperature < 0) {
      this.temperature = 0;
    } else {
      this.temperature -= 1;
    }
  }
}

export default Solid;
