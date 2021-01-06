var puzzles = puzzles || {};

puzzles.royalEscape = (context) => {
  const images = {
    blue: "/puzzles/royalEscape/blue.png",
    green: "/puzzles/royalEscape/green.png",
    red: "/puzzles/royalEscape/red.png",
    purple: "/puzzles/royalEscape/purple.png",
    board: "/puzzles/royalEscape/board2.png",
  };

  const blueSettings = {
    shape: [[1, 1]],
    image: images.blue,
  };

  const greenSettings = {
    shape: [[1]],
    image: images.green,
  };

  function makeBlock(x, y, settings) {
    return new SlidingPuzzle.Block({
      x: x,
      y: y,
      shape: settings.shape,
      image: settings.image,
    });
  }

  const finishBlock = new SlidingPuzzle.Block({
    x: 6,
    y: 2,
    shape: [[1], [1]],
    selectable: false,
  });

  const redBlock = new SlidingPuzzle.Block({
    x: 1,
    y: 2,
    shape: [
      [1, 1],
      [1, 1],
    ],
    image: images.red,
    possibleOverlaps: [finishBlock],
    tag: "red",
  });

  const blocks = [
    makeBlock(1, 1, blueSettings),
    makeBlock(3, 1, blueSettings),
    makeBlock(1, 4, blueSettings),
    makeBlock(3, 4, blueSettings),

    makeBlock(5, 1, greenSettings),
    makeBlock(4, 2, greenSettings),
    makeBlock(4, 3, greenSettings),
    makeBlock(5, 4, greenSettings),

    new SlidingPuzzle.Block({
      x: 3,
      y: 2,
      shape: [[1], [1]],
      image: images.purple,
    }),
  ];

  const boundaries = new SlidingPuzzle.Block({
    x: 0,
    y: 0,
    shape: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    selectable: false,
  });

  const board = new SlidingPuzzle.Board({
    cols: 9,
    rows: 6,
    image: images.board,
  });

  board.addBlock(boundaries);
  board.addBlock(finishBlock);
  board.addBlock(redBlock);
  blocks.forEach((b) => board.addBlock(b));

  let movedOnce = false;
  let wonTheGame = false;
  let moves = 0;

  const sounds = context.assets.sounds;

  return new Puzzle({
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
        if (!wonTheGame && block.tag === "red" && block.x > 6) {
          wonTheGame = true;
          sounds.suspens.onended(() => sounds.success.play());
          sounds.success.onended(() => sounds.ambiant.fadeIn());
          sounds.ambiant.fadeOut();
          setTimeout(() => sounds.suspens.play(), 1000);
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
