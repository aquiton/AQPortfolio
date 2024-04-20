class Element {
  constructor() {
    if (this.constructor == Element) {
      throw new error("Abstract classes can't be instantiated");
    }
    this.life_time = 100;
    this.temperature = 0;
    this.velocity;
    this.color;
    this.hasBeenUpdated;
    this.reactPoint;
    this.hasEffect = false;
    this.allowColorChange = true;
  }

  draw(Graphics, row, col, spacer) {
    let temperature = this.temperature;

    // Extract the red, green, and blue component from this.color
    let rgb = this.color.substring(4, this.color.length - 1).split(","); // Extracting the RGB components
    let red = parseInt(rgb[0].trim()); // Red component
    let green = parseInt(rgb[1].trim());
    let blue = parseInt(rgb[2].trim());

    // Calculate the adjusted red component based on the temperature
    let adjustedRed = red;
    let adjustedGreen = green;
    let adjustedBlue = blue;

    if (this.temperature > 0 && this.allowColorChange) {
      adjustedRed =
        temperature > 0
          ? Math.min(255, Math.max(50, Math.round(red + temperature * 2.55)))
          : red;

      adjustedBlue =
        temperature > 0
          ? Math.min(255, Math.max(50, Math.round(blue - temperature * 2.55)))
          : blue;

      if (temperature > 500) {
        adjustedGreen =
          temperature > 500
            ? Math.min(50, Math.max(0, Math.round(green + temperature * 2.55)))
            : green;
      }
      if (temperature > 1000) {
        adjustedGreen =
          temperature > 1000
            ? Math.min(255, Math.max(0, Math.round(green + temperature * 2.55)))
            : green;
      }
    }

    //combine the adjusted colors to one rgb value
    let adjustedColor = `rgb(${adjustedRed}, ${adjustedGreen}, ${adjustedBlue})`;

    // Draw the rectangle with the adjusted color
    Graphics.rect(row * spacer, col * spacer, spacer, spacer).fill(
      adjustedColor
    );
  }

  //primarly used for fire effects => draws rectangles with color to the grid even though they aren't an element
  drawEffect(Graphics, row, col, spacer, grid, gridRow) {
    let randomNumber = Math.random();
    if (randomNumber < 0.5) {
      let matrix;
      let color;
      randomNumber = Math.random();
      if (randomNumber < 0.5) {
        matrix = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        color = "rgb(255,165,0)";
      } else {
        matrix = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
        color = "rgb(133,1,1)";
      }

      let extent = Math.floor(matrix / 2);
      for (let i = -matrix; i <= matrix; i++) {
        for (let j = -extent; j <= extent; j++) {
          let newCol = col + i;
          let newRow = row + j;
          if (newRow < gridRow - 1 && newRow > 0) {
            if (grid[newRow][newCol] == 0) {
              if (Math.random(1) < 0.25) {
                Graphics.rect(
                  newRow * spacer,
                  newCol * spacer,
                  spacer,
                  spacer
                ).fill(color);
              }
            }
          }
        }
      }
    }
  }

  //takes in the velocity and checks this.velocity amount of space from where the element is at on the 2d grid
  //directly below the element
  calculateGravity(grid, row, col) {
    let i = 1;
    for (i = 1; i < this.velocity; i++) {
      if (grid[row][col + i] != 0) {
        if (i == 1) {
          return 1;
        } else {
          return i - 1;
        }
      }
    }
    return i;
  }

  

  //heat transfers between the elements
  applyHeat(targetCell) {
    if (targetCell.temperature < this.temperature) {
      targetCell.temperature = Math.floor(this.temperature / 2);
    }
  }

  //base methods if the element doesn't import these
  tempReact() {
    return false;
  }

  actOnOther() {
    return false;
  }

  updateHealth() {
    return false;
  }
}

export default Element;
