// import * as PIXI from "pixi.js";
import Grid from "./Grid.js";
import Sand from "./Elements/MovableSolids/Sand.js";
import Water from "./Elements/Liquids/Water.js";
import Stone from "./Elements/Solids/Stone.js";
import Air from "./Elements/Gas/Air.js";
import Ember from "./Elements/MovableSolids/Embers.js";
import Dust from "./Elements/MovableSolids/Dust.js";
import Gravel from "./Elements/MovableSolids/Gravel.js";
import Fire from "./Elements/Gas/Fire.js";
import Wood from "./Elements/Solids/Wood.js";
import Soil from "./Elements/MovableSolids/Soil.js";
import { Color, WebGLRenderer } from "pixi.js";

const app = new PIXI.Application();

app
  .init({
    width: 800,
    height: 500,
    backgroundColor: 0xffc0cb,
  })
  .then(() => {
    //init canvas
    app.renderer.background.color = 0x23395d;
    document.body.appendChild(app.canvas);

    //init grid values
    let SPACER = 5; //pixel size set to 2
    let COLS = Math.floor(app.renderer.height / SPACER); //minus gives space at end of screen
    let ROWS = Math.floor(app.renderer.width / SPACER); //divided by spacer to convert it to grid base

    //background
    let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = app.screen.width;
    bg.height = app.screen.height;
    bg.tint = 0x000000;
    bg.interactive = true;

    //setup grid
    let grid = new Grid(ROWS, COLS, SPACER);
    grid.setupGrid();

    //mouse input handler
    let mouseDown = false;
    bg.on("mousedown", function (e) {
      mouseDown = !mouseDown;
    });

    bg.on("mouseup", function (e) {
      mouseDown = !mouseDown;
    });

    window.addEventListener("keydown", keysDown);

    //keyboard input handler to switch elements
    let keyCode;
    function keysDown(e) {
      keyCode = e.keyCode;
      console.log(keyCode);
    }

    //element creation
    bg.on("mousemove", function (e) {
      //Get mouse cords and align them with the spacer (Spacer is like resolution / how big the grid is)
      let mouseX = Math.floor(e.global.x / SPACER);
      let mouseY = Math.floor(e.global.y / SPACER);

      //check mouse is in bounds and create element when mouse is down
      if (mouseX < ROWS - 1 && mouseY < COLS && mouseX > 0) {
        let matrix = 2;
        let extent = Math.floor(matrix / 2);
        if (mouseDown) {
          for (let i = -extent; i <= extent; i++) {
            for (let j = -extent; j <= extent; j++) {
              let col = mouseY + i;
              let row = mouseX + j;
              let element = new Water();
              if (Math.random(1) < 0.75) {
                //  let s = new Sand();
                if (keyCode == 87) {
                  element = new Water();
                  grid.addPixel(row, col, element);
                } else if (keyCode == 83) {
                  element = new Sand();
                  grid.addPixel(row, col, element);
                } else if (keyCode == 70) {
                  element = new Dust();
                  grid.addPixel(row, col, element);
                } else if (keyCode == 65) {
                  element = new Air();
                  grid.addPixel(row, col, element);
                } else if (keyCode == 69) {
                  element = new Ember();
                  grid.addPixel(row, col, element);
                } else if (keyCode == 82) {
                  element = new Fire();
                  grid.addPixel(row, col, element);
                } else if (keyCode == 86) {
                  element = new Soil();
                  grid.addPixel(row, col, element);
                }
              }
              //for solids no randomness
              if (keyCode == 68) {
                element = new Stone();
                grid.addPixel(row, col, element);
              } else if (keyCode == 81) {
                element = new Wood();
                grid.addPixel(row, col, element);
              }
            }
          }
        }
      }
    });

    // Create Graphics
    const graphics = new PIXI.Graphics();

    //add background and graphics to stage
    app.stage.addChild(bg); //background needed for mouse events
    app.stage.addChild(graphics);

    function animate() {
      graphics.clear();
      grid.updateGrid(graphics);
    }

    app.ticker.add(animate);
  });
