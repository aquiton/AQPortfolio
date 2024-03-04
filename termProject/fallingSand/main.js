import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  width: 500,
  heigth: 500,
  resizeTo: window,
});

app.renderer.background.color = 0x23395d;
app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);

//background cover
let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
bg.width = app.screen.width;
bg.height = app.screen.height;
bg.tint = 0x23395d;
bg.interactive = true;

//mouse event
bg.on("pointermove", function (e) {
  let mouseX = Math.floor(e.global.x / spacer);
  let mouseY = Math.floor(e.global.y / spacer);
  addPixel(mouseX, mouseY, 1);
});

//grid
const graphics = new PIXI.Graphics();
let grid;
let spacer = 2; //pixel size set to 2
let cols = Math.floor(app.renderer.height / spacer); //minus gives space at end of screen
let rows = Math.floor(app.renderer.width / spacer); //divided by spacer to convert it to grid base

//grid init
function make2dArray() {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
    for (let j = 0; j < cols; j++) {
      arr[i][j] = 0;
      // graphics.lineStyle(1, 0xffffff); //debug grid
    }
  }
  return arr;
}

//update each pixel with logic and movement
function updateGrid() {
  graphics.clear(); // clear drawing of previous grid
  let nextGenerationGrid = make2dArray();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] == 1) {
        let below = grid[i][j + 1];
        let belowleft, belowright;

        let dir = 1; //random ness in what direction the pixel will fall
        if (Math.random(1) < 0.5) {
          dir *= -1;
        }
        if (i > 0 && i < cols - 1) {
          belowleft = grid[i - dir][j + 1];
          belowright = grid[i + dir][j + 1];
        }

        // [horizontal][vertical]
        // pixel movement
        if (below == 0) {
          //go and stay straight down
          nextGenerationGrid[i][j + 1] = 1;
        } else if (belowright == 0) {
          //go down and check right until first case is met
          nextGenerationGrid[i + dir][j + 1] = 1;
        } else if (belowleft == 0) {
          //go down and check left until first case is met
          nextGenerationGrid[i - dir][j + 1] = 1;
        } else {
          //don't go anywhere
          nextGenerationGrid[i][j] = 1;
        }

        // pixel redraw
        graphics.beginFill(0xc2b280, 1);
        graphics.drawRect(i * spacer, j * spacer, spacer, spacer);
        graphics.endFill();
      }
    }
  }
  grid = nextGenerationGrid;
}

//update redrawing of grid
function updatePixels() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] == 1) {
        //  graphics.lineStyle(1, 0xffffff); //debug grid
        graphics.beginFill(0xc2b280, 1);
        graphics.drawRect(i * spacer, j * spacer, spacer, spacer);
        graphics.endFill();
      } else {
      }
    }
  }
}

//create pixel => set value of grid space
function addPixel(row, col, value) {
  // console.log(row);
  // console.log(col);
  grid[row][col] = value;
}

//start up
function setup() {
  //run one time setup
  grid = make2dArray(cols, rows, 10);
  addPixel(50, 0, 1);
  app.stage.addChild(bg);
  app.stage.addChild(graphics);
}

setup();

app.ticker.add((delta) => {
  updateGrid();
  // updatePixels();
});
