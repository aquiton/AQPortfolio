import * as PIXI from "pixi.js";
import Grid from "./Grid.js";
import Sand from "./Elements/Sand.js";
import Water from "./Elements/Water.js";
import Stone from "./Elements/Stone.js";
import Air from "./Elements/Air.js";

const app = new PIXI.Application();
app
  .init({
    width: 500,
    height: 500,
    resizeTo: window,
    backgroundColor: 0xffc0cb,
  })
  .then(() => {
    app.renderer.background.color = 0x23395d;
    app.renderer.canvas.style.position = "absolute"; // removes scrolling
    document.body.appendChild(app.canvas);
    let SPACER = 5; //pixel size set to 2
    let COLS = Math.floor(app.renderer.height / SPACER); //minus gives space at end of screen
    let ROWS = Math.floor(app.renderer.width / SPACER); //divided by spacer to convert it to grid base

    // console.log(
    //   "Acutal Height: " + app.renderer.height + " New Height: " + COLS
    // );
    // console.log("Actual Width: " + app.renderer.width + " New Width: " + ROWS);

    //background
    let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = app.screen.width;
    bg.height = app.screen.height;
    bg.tint = 0x000000;
    bg.interactive = true;

    //setup grid
    let grid = new Grid(ROWS, COLS, SPACER);
    grid.setupGrid();

    //mouse input
    let mouseDown = false;
    bg.on("mousedown", function (e) {
      mouseDown = !mouseDown;
    });

    bg.on("mouseup", function (e) {
      mouseDown = !mouseDown;
    });

    window.addEventListener("keydown", keysDown);

    let keyCode = 87;

    function keysDown(e) {
      keyCode = e.keyCode;
      console.log(keyCode);
    }

    bg.on("mousemove", function (e) {
      let mouseX = Math.floor(e.global.x / SPACER);
      let mouseY = Math.floor(e.global.y / SPACER);
      //to check if mouse x (row) is less than col -1
      let matrix = 5;
      let extent = Math.floor(matrix / 2);
      if (mouseDown) {
        for (let i = -extent; i <= extent; i++) {
          for (let j = -extent; j <= extent; j++) {
            if (Math.random(1) < 0.75) {
              let col = mouseY + i;
              let row = mouseX + j;
              //  let s = new Sand();
              let element = new Water();
              if (keyCode == 87) {
                element = new Water();
                grid.addPixel(row, col, element);
              } else if (keyCode == 83) {
                element = new Sand();
                grid.addPixel(row, col, element);
              } else if (keyCode == 68) {
                element = new Stone();
                grid.addPixel(row, col, element);
              } else if (keyCode == 65) {
                element = new Air();
                grid.addPixel(row, col, element);
              } else {
                //FIRE
              }
            }
          }
        }
      }
    });

    // Add it to the stage to render
    const graphics = new PIXI.Graphics();

    app.stage.addChild(bg);

    app.stage.addChild(graphics);

    app.ticker.add((delta) => {
      grid.updateGrid(graphics);
      console.log("Water Count : " + grid.getElementCount(Water));
      // console.log("Sand Count : " + grid.getElementCount(Sand));
      //console.log("Air Count : " + grid.getElementCount(Air));
    });
  });
