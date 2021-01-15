import { Block, Board } from "../../../lib/sliding-puzzle-esm";
import { makeImage } from "../../utils";

export const makePuzzle = () => {
  const path =
    window.location.origin + "src/puzzles/get_the_ball_out_4/images/";
  const images = {
    blue: makeImage(path + "blue.jpg"),
    green: makeImage(path + "green.jpg"),
    ball: makeImage(path + "ball.png"),
    yellow: makeImage(path + "yellow.jpg"),
    purple: makeImage(path + "purple.jpg"),
    board: makeImage(path + "board.jpg"),
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
    return new Block({
      x: x,
      y: y,
      shape: settings.shape,
      image: settings.image,
    });
  }

  const ball = new Block({
    x: 0,
    y: 0,
    shape: [[1]],
    image: images.ball,
    name: "ball",
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

    new Block({
      x: 1,
      y: 2,
      shape: [
        [1, 1],
        [1, 1],
      ],
      image: images.yellow,
    }),
  ];

  const boundaries = new Block({
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

  const board = new Board({ cols: 4, rows: 6 });

  board.addBlock(boundaries);
  board.addBlock(ball);
  blocks.forEach((b) => board.addBlock(b));

  return {
    title: "Get the Ball Out! 4",
    background: images.board,
    proportions: {
      x: 320 / 1024,
      y: 127 / 768,
      width: 384 / 1024,
      height: 576 / 768,
    },
    board,
    winningPlace: (block: Block) =>
      block.name === "ball" && block.x === 3 && block.y === 5,
  };
};
