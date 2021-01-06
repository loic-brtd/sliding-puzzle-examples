var puzzles = puzzles || {};

puzzles.royalEscape = (context) => {
  const images = {
    blue: makeImage("puzzles/royalEscape/blue.png"),
    green: makeImage("puzzles/royalEscape/green.png"),
    red: makeImage("puzzles/royalEscape/red.png"),
    purple: makeImage("puzzles/royalEscape/purple.png"),
    board: makeImage("puzzles/royalEscape/board2.png"),
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
          setTimeout(() => {
            sounds.inPlace.play();
            sounds.ambiant.fade(0);
            setTimeout(() => {
              CustomSound.chain([sounds.suspens, sounds.success])
                .onended(() => sounds.ambiant.fade(1));
            }, 1000);
          }, 300);
        }
      });
    },
    onDraw: (renderer) => {
      renderer.render();
      drawCount(renderer, moves);
    },
  });
};
