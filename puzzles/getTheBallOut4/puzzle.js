var puzzles = puzzles || {};

puzzles.getTheBallOut4 = (context) => {
  const images = {
    blue: "puzzles/getTheBallOut4/blue.png",
    green: "puzzles/getTheBallOut4/green.png",
    ball: "puzzles/getTheBallOut4/ball.png",
    yellow: "puzzles/getTheBallOut4/yellow.png",
    purple: "puzzles/getTheBallOut4/purple.png",
    board: makeImage("puzzles/getTheBallOut4/board.jpg"),
  };

  const blueSettings = {
    shape: [[1, 1]],
    image: images.blue,
  };

  const greenSettings = {
    shape: [[1], [1]],
    image: images.green,
  };

  const purpleSettings = {
    shape: [[1]],
    image: images.purple,
  };

  function makeBlock(x, y, settings) {
    return new SlidingPuzzle.Block({
      x: x,
      y: y,
      shape: settings.shape,
      image: settings.image,
    });
  }

  const ball = new SlidingPuzzle.Block({
    x: 0,
    y: 0,
    shape: [[1]],
    image: images.ball,
    tag: "ball",
  });

  const blocks = [
    makeBlock(0, 1, blueSettings),
    makeBlock(2, 4, blueSettings),

    makeBlock(0, 2, greenSettings),
    makeBlock(3, 2, greenSettings),

    makeBlock(2, 1, purpleSettings),
    makeBlock(3, 1, purpleSettings),
    makeBlock(0, 4, purpleSettings),
    makeBlock(1, 4, purpleSettings),

    new SlidingPuzzle.Block({
      x: 1,
      y: 2,
      shape: [
        [1, 1],
        [1, 1],
      ],
      image: images.yellow,
    }),
  ];

  const boundaries = new SlidingPuzzle.Block({
    x: -1,
    y: -1,
    shape: [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ],
    selectable: false,
  });

  const board = new SlidingPuzzle.Board({
    cols: 4,
    rows: 6,
  });

  board.addBlock(boundaries);
  board.addBlock(ball);
  blocks.forEach((b) => board.addBlock(b));

  let movedOnce = false;
  let wonTheGame = false;
  let moves = 0;

  const sounds = context.assets.sounds;

  return new Puzzle({
    background: images.board,
    canvasProportions: {
      x: 320 / 1024,
      y: 127 / 768,
      width: 384 / 1024,
      height: 576 / 768,
    },
    renderer,
    board,
    onSetup: (renderer) => {
      board.savePositions();

      textFont(context.assets.fonts.mono);
      textAlign(RIGHT, CENTER);
      textSize(renderer.unit * 0.35);

      board.on("continuousMove", (block) => moves++);
      board.on("move", (block) => {
        sounds.move.play();

        // First move
        if (movedOnce === false) {
          sounds.ambiant.loop();
          movedOnce = true;
        }

        // Player wins
        if (
          !wonTheGame &&
          block.tag === "ball" &&
          block.x === 3 &&
          block.y === 5
        ) {
          wonTheGame = true;

          setTimeout(() => {
            sounds.inPlace.play();
            sounds.ambiant.fadeOut();
            setTimeout(() => sounds.suspens.play(), 1000);
            sounds.suspens.onended(() => sounds.success.play());
            sounds.success.onended(() => sounds.ambiant.fadeIn());
          }, 300);
        }
      });
    },
    onDraw: (renderer) => {
      renderer.render();

      const unit = renderer.unit;

      fill("#1B1A1B");
      stroke("#6E4826");
      rect(width / 2 - unit / 2, unit / 3, unit, unit / 3);

      fill("#ED050D");
      noStroke();
      text(moves, width / 2 + unit * 0.45, unit * 0.48);
    },
  });
};
