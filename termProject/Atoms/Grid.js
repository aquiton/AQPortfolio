import * as PIXI from "pixi.js";
import MovableSolid from "./Elements/MovableSolid";
import Sand from "./Elements/Sand";
import Water from "./Elements/Water";
class Grid {
  constructor(rows, cols, spacer) {
    this.gridRows = rows;
    this.gridCols = cols;
    this.grid;
    this.spacer = spacer;
  }

  setupGrid() {
    let grid = [];

    for (let i = 0; i < this.gridRows; i++) {
      grid[i] = [];
      for (let j = 0; j < this.gridCols; j++) {
        grid[i][j] = 0;
      }
    }
    this.grid = grid;
  }

  addPixel(row, col, value) {
    this.grid[row][col] = value;
  }

  getElementCount(Element) {
    let elementCounter = 0;
    for (let i = this.gridRows - 1; i > 0; i--) {
      for (let j = this.gridCols - 1; j > 0; j--) {
        let state = this.grid[i][j];
        if (state != 0) {
          if (state instanceof Element) {
            elementCounter += 1;
          }
        }
      }
    }
    return elementCounter;
  }

  updateGrid(Graphics) {
    Graphics.clear();
    //debug
    let sandCounter = 0;
    let waterCounter = 0;

    for (let i = this.gridRows - 1; i > 0; i--) {
      for (let j = this.gridCols - 1; j > 0; j--) {
        let state = this.grid[i][j];
        if (state != 0) {
          state.step(this.grid, i, j, this.gridRows);
          state.draw(Graphics, i, j, this.spacer);
          // Graphics.rect(
          //   i * this.spacer,
          //   j * this.spacer,
          //   this.spacer,
          //   this.spacer
          // ).fill(state.color);
        }
      }
    }
  }
}

export default Grid;
