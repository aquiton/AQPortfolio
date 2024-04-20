import Soil from "./Elements/MovableSolids/Soil.js";
import Water from "./Elements/Liquids/Water.js";

class Grid {
  constructor(rows, cols, spacer) {
    this.gridRows = rows;
    this.gridCols = cols;
    this.grid;
    this.spacer = spacer;
  }

  //set the 2d grid values to 0
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

  //set row and col to element called from main
  addPixel(row, col, value) {
    this.grid[row][col] = value;
  }

  //debug to see for duplications or deletions
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

  //main functionality of game 
  //iterates through each position in the 2d grid
  //checks if it is empty and if not then calls the step, draw, and effects methods
  updateGrid(Graphics) {
    const numRows = this.gridRows;
    const numCols = this.gridCols;
    for (let i = numRows - 1; i > 0; i--) {
      for (let j = numCols - 1; j > 0; j--) {
        const state = this.grid[i][j];
        if (state !== 0) {
          state.step(this.grid, i, j, numRows);
          state.draw(Graphics, i, j, this.spacer);
          if (state.hasEffect) {
            state.drawEffect(
              Graphics,
              i,
              j,
              this.spacer,
              this.grid,
              numRows,
              numCols
            );
          }
        }
      }
    }
  }
}

export default Grid;
