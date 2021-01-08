var puzzles = puzzles || {};

puzzles.getTheBallOut1 = (context) => {
  const path = 'src/puzzles/getTheBallOut1/images/'
  const gtbo4 = 'src/puzzles/getTheBallOut4/images/'
  const images = {
    blue: makeImage(gtbo4 + 'blue.jpg'),
    green: makeImage(gtbo4 + 'green.jpg'),
    ball: makeImage(gtbo4 + 'ball.png'),
    yellow: makeImage(gtbo4 + 'yellow.jpg'),
    purple: makeImage(gtbo4 + 'purple.jpg'),
    board: makeImage(path + 'board.jpg'),
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

  const yellowSettings = {
    shape: [[1, 1], [1, 1]],
    image: images.yellow,
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
    x: 2,
    y: 0,
    shape: [[1]],
    image: images.ball,
    tag: "ball",
  });

  const blocks = [
    makeBlock(0, 1, greenSettings),

    makeBlock(1, 1, yellowSettings),
    makeBlock(2, 3, yellowSettings),

    makeBlock(3, 2, blueSettings),
    makeBlock(0, 3, blueSettings),

    makeBlock(4, 3, purpleSettings),
    makeBlock(4, 4, purpleSettings),
  ];

  const boundaries = new SlidingPuzzle.Block({
    x: -1,
    y: -1,
    shape: [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ],
    selectable: false,
  });

  const board = new SlidingPuzzle.Board({
    cols: 5,
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
    proportions: {
      x: 64 / 256,
      y: 32 / 192,
      width: 120 / 256,
      height: 144 / 192,
    },
    board,
    onSetup: () => {
      const winningPlace = (block) => block.tag === 'ball'
        && block.x === 2 && block.y === 5;
      sharedPuzzleSetup({ context, board, winningPlace });
    }
  });
};
