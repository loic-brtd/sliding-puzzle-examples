var puzzles = puzzles || {};

puzzles.royalEscape = (context) => {
  const dir = "src/puzzles/royalEscape/images/";
  const images = {
    blue: makeImage(dir + "blue.jpg"),
    green: makeImage(dir + "green.jpg"),
    red: makeImage(dir + "red.jpg"),
    purple: makeImage(dir + "purple.jpg"),
    board: makeImage(dir + "board2.jpg"),
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
      const winningPlace = (block) => block.tag === 'red' && block.x === 6;
      sharedPuzzleSetup({ context, board, winningPlace });
    }
  });
};
