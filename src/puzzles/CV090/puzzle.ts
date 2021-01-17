import { Block, Board } from "../../../lib/sliding-puzzle-esm";
import { makeImage, Puzzle, rootPath } from "../../utils";

// [CV090] Get the Ball Out! 2
export const makePuzzle = (): Puzzle => {
  const gtbo2 = rootPath + "src/puzzles/CV090/images/";
  const gtbo4 = rootPath + "src/puzzles/CV094/images/";
  const images = {
    blue: makeImage(gtbo4 + "blue.jpg"),
    green: makeImage(gtbo4 + "green.jpg"),
    ball: makeImage(gtbo4 + "ball.png"),
    yellow: makeImage(gtbo4 + "yellow.jpg"),
    purple: makeImage(gtbo4 + "purple.jpg"),
    board: makeImage(gtbo2 + "board.jpg"),
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
    shape: [
      [1, 1],
      [1, 1],
    ],
    image: images.yellow,
  };

  function makeBlock(x, y, settings) {
    return new Block({
      x: x,
      y: y,
      shape: settings.shape,
      image: settings.image,
    });
  }

  const ball = new Block({
    x: 2,
    y: 0,
    shape: [[1]],
    image: images.ball,
    name: "ball",
  });

  const blocks = [
    makeBlock(1, 1, blueSettings),
    makeBlock(3, 4, blueSettings),

    makeBlock(1, 3, greenSettings),
    makeBlock(4, 1, greenSettings),

    makeBlock(2, 2, yellowSettings),

    makeBlock(3, 1, purpleSettings),
    makeBlock(1, 2, purpleSettings),
    makeBlock(2, 4, purpleSettings),
    makeBlock(4, 3, purpleSettings),
  ];

  const boundaries = new Block({
    x: -1,
    y: -1,
    shape: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    selectable: false,
  });

  const board = new Board({
    cols: 6,
    rows: 6,
  });

  board.addBlock(boundaries);
  board.addBlock(ball);
  blocks.forEach((b) => board.addBlock(b));

  return {
    title: "Get the Ball Out! 2",
    background: images.board,
    proportions: {
      x: 32 / 256,
      y: 32 / 192,
      width: 144 / 256,
      height: 144 / 192,
    },
    board,
    winningPlace: (block: Block) =>
      block.name === "ball" && block.x === 3 && block.y === 5,
  };
};
