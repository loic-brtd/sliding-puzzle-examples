var puzzles = puzzles || {};

puzzles.royalEscape = (context) => {
  const dir = "src/puzzles/royalEscape/";
  const images = {
    blue: makeImage(dir + "blue.png"),
    green: makeImage(dir + "green.png"),
    red: makeImage(dir + "red.png"),
    purple: makeImage(dir + "purple.png"),
    board: makeImage(dir + "board2.png"),
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
    x: 5,
    y: 1,
    shape: [[1], [1]],
    selectable: false,
  });

  const redBlock = new SlidingPuzzle.Block({
    x: 0,
    y: 1,
    shape: [
      [1, 1],
      [1, 1],
    ],
    image: images.red,
    possibleOverlaps: [finishBlock],
    tag: "red",
  });

  const blocks = [
    makeBlock(0, 0, blueSettings),
    makeBlock(2, 0, blueSettings),
    makeBlock(0, 3, blueSettings),
    makeBlock(2, 3, blueSettings),

    makeBlock(4, 0, greenSettings),
    makeBlock(3, 1, greenSettings),
    makeBlock(3, 2, greenSettings),
    makeBlock(4, 3, greenSettings),

    new SlidingPuzzle.Block({
      x: 2,
      y: 1,
      shape: [[1], [1]],
      image: images.purple,
    }),
  ];

  const boundaries = new SlidingPuzzle.Block({
    x: -1,
    y: -1,
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
    cols: 8,
    rows: 4,
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
    background: images.board,
    proportions: {
      x: 1 / 9,
      y: 1 / 6,
      width: 8 / 9,
      height: 4 / 6,
    },
    board,
    onSetup: () => {
      board.savePositions();
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
    }
  });
};
