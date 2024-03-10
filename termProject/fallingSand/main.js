import * as PIXI from "pixi.js";
import Sand from "./elements/Sand";
import Water from "./elements/Water";
import Stone from "./elements/Stone";
import Grid from "./grid";
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

const graphics = new PIXI.Graphics();
let spacer = 2; //pixel size set to 2
let COLS = Math.floor(app.renderer.height / spacer); //minus gives space at end of screen
let ROWS = Math.floor(app.renderer.width / spacer); //divided by spacer to convert it to grid base

let element = new Sand();

const water = new PIXI.Graphics()
  .beginFill(0xdef4fc)
  .drawRoundedRect(0, 0, 100, 50, 15);
const sand = new PIXI.Graphics()
  .beginFill(0xc2b280)
  .drawRoundedRect(100, 0, 100, 50, 15);
const stone = new PIXI.Graphics()
  .beginFill(0xffffff)
  .drawRoundedRect(200, 0, 100, 50, 15);

sand.eventMode = "static";
sand.cursor = "pointer";
sand.addListener("pointerdown", () => {
  console.log("HI");
  element = new Sand();
});

water.eventMode = "static";
water.cursor = "pointer";
water.addListener("pointerdown", () => {
  console.log("HI");
  element = new Water();
});
stone.eventMode = "static";
stone.cursor = "pointer";
stone.addListener("pointerdown", () => {
  console.log("HI");
  element = new Stone();
});

//mouse event
let mouseDown = false;
bg.on("mousedown", function (e) {
  mouseDown = !mouseDown;
});

bg.on("mouseup", function (e) {
  mouseDown = !mouseDown;
});

bg.on("mousemove", function (e) {
  let mouseX = Math.floor(e.global.x / spacer);
  let mouseY = Math.floor(e.global.y / spacer);
  //to check if mouse x (row) is less than col -1
  let matrix = 10;
  let extent = Math.floor(matrix / 2);
  if (mouseDown) {
    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        if (Math.random(1) < 0.75) {
          let col = mouseY + i;
          let row = mouseX + j;
          grid.addPixel(element, row, col);
        }
      }
    }
  }
});

let grid;
//start up
function setup() {
  //run one time setup
  grid = new Grid(ROWS, COLS, spacer);
  grid.setupGrid();
  app.stage.addChild(bg);
  app.stage.addChild(graphics);
  app.stage.addChild(sand);
  app.stage.addChild(water);
  app.stage.addChild(stone);
}

setup();

app.ticker.add((delta) => {
  grid.updateGrid(graphics);
});
