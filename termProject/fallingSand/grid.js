import * as PIXI from "pixi.js";
import Sand from "./elements/Sand";
import Water from "./elements/Water";
import Stone from "./elements/Stone";
class Grid {
  constructor(rows, cols, spacer) {
    this.rows = rows;
    this.cols = cols;
    this.grid;
    this.spacer = spacer;
  }

  setupGrid() {
    let grid = [];
    for (let i = 0; i < this.rows; i++) {
      grid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        grid[i][j] = 0;
      }
    }
    this.grid = grid;
  }

  updateGrid(graphics) {
    graphics.clear();
    let nextGenerationGrid = [];
    for (let i = 0; i < this.rows; i++) {
      nextGenerationGrid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        nextGenerationGrid[i][j] = 0;
      }
    }

    let sandCounter = 0;
    let waterCounter = 0;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j] instanceof Sand) {
          //if the space in grid == sand
          let state = this.grid[i][j];
          let stepPosition = this.grid[i][j].step(
            this.grid,
            i,
            j,
            this.cols,
            this.rows,
            nextGenerationGrid
          );
          let s = new Sand();
          s.x = stepPosition[0];
          s.y = stepPosition[1];
          nextGenerationGrid[stepPosition[0]][stepPosition[1]] = s;

          // pixel redraw
          graphics.beginFill(state.color, 1);
          graphics.drawRect(
            i * this.spacer,
            j * this.spacer,
            this.spacer,
            this.spacer
          );
          graphics.endFill();
          sandCounter += 1;
        }
        if (this.grid[i][j] instanceof Water) {
          //if the space in grid == sand
          let state = this.grid[i][j];
          let stepPosition = this.grid[i][j].step(
            this.grid,
            i,
            j,
            this.rows,
            nextGenerationGrid
          );
          let w = new Water();
          w.x = stepPosition[0];
          w.y = stepPosition[1];
          nextGenerationGrid[stepPosition[0]][stepPosition[1]] = w;
          // pixel redraw
          graphics.beginFill(state.color, 1);
          graphics.drawRect(
            i * this.spacer,
            j * this.spacer,
            this.spacer,
            this.spacer
          );
          graphics.endFill();
          waterCounter += 1;
        }
        if (this.grid[i][j] instanceof Stone) {
          let state = this.grid[i][j];
          let st = new Stone();
          nextGenerationGrid[i][j] = st;
          graphics.beginFill(state.color, 1);
          graphics.drawRect(
            i * this.spacer,
            j * this.spacer,
            this.spacer,
            this.spacer
          );
          graphics.endFill();
        }
      }
    }
    this.finishGrid(nextGenerationGrid);
    //console.log(waterCounter);
    //console.log(sandCounter);
  }

  finishGrid(nextGenerationGrid) {
    this.grid = nextGenerationGrid;
  }

  addPixel(element, row, col) {
    element.x = row;
    element.y = col;
    this.grid[row][col] = element;
  }
}

export default Grid;
