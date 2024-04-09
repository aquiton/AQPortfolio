const app = new PIXI.Application();

app
  .init({
    width: 500,
    height: 500,
    resizeTo: window,
    backgroundColor: 0xfff000,
  })
  .then(() => {
    app.renderer.background.color = 0xfff000;
    app.renderer.canvas.style.position = "absolute";
    document.body.appendChild(app.canvas);

    // Start loading right away and create a promise
    const texturePromise = PIXI.Assets.load(
      "https://pixijs.com/assets/bunny.png"
    );

    // When the promise resolves, we have the texture!
    texturePromise.then((resolvedTexture) => {
      // create a new Sprite from the resolved loaded Texture
      const bunny = PIXI.Sprite.from(resolvedTexture);

      // center the sprite's anchor point
      bunny.anchor.set(0.5);

      // move the sprite to the center of the screen
      bunny.x = app.screen.width / 2;
      bunny.y = app.screen.height / 2;

      app.stage.addChild(bunny);

      window.addEventListener("keydown", keysDown);
      window.addEventListener("keyup", () => {
        keyDown = false;
        keyCode = 0;
      });

      let keyCode = 0;
      let keyDown = false;

      function keysDown(e) {
        keyCode = e.keyCode;
        keyDown = true;
        console.log(e.keyCode);
      }

      app.ticker.add((time) => {
        if (bunny.y < app.screen.height - 20) {
          bunny.y += 5 * time.deltaTime;
        }
        if (keyDown) {
          if (
            (keyCode == 68 || keyCode == 39) &&
            bunny.x < app.screen.width - 10
          ) {
            bunny.x += 5;
          }
          if ((keyCode == 65 || keyCode == 37) && bunny.x > 10) {
            bunny.x -= 5;
          }
        }
        if (bunny.y > app.screen.height - 20) {
          console.log(true);
          if (keyCode == 38) {
            bunny.y -= 50;
          }
        }
      });
    });
  });
