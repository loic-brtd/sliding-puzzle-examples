import { Block, Board } from "../../../lib/sliding-puzzle-esm";
import { makeImage } from "../../utils";

export const makePuzzle = () => {
  const gtbo1 =
    window.location.origin + "/src/puzzles/get_the_ball_out_1/images/";
  const gtbo4 =
    window.location.origin + "/src/puzzles/get_the_ball_out_4/images/";
  const images = {
    blue: makeImage(gtbo4 + "blue.jpg"),
    green: makeImage(gtbo4 + "green.jpg"),
    ball: makeImage(gtbo4 + "ball.png"),
    yellow: makeImage(gtbo4 + "yellow.jpg"),
    purple: makeImage(gtbo4 + "purple.jpg"),
    board: makeImage(gtbo1 + "board.jpg"),
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
    makeBlock(0, 1, greenSettings),

    makeBlock(1, 1, yellowSettings),
    makeBlock(2, 3, yellowSettings),

    makeBlock(3, 2, blueSettings),
    makeBlock(0, 3, blueSettings),

    makeBlock(4, 3, purpleSettings),
    makeBlock(4, 4, purpleSettings),
  ];

  const boundaries = new Block({
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

  const board = new Board({
    cols: 5,
    rows: 6,
  });

  board.addBlock(boundaries);
  board.addBlock(ball);
  blocks.forEach((b) => board.addBlock(b));

  return {
    title: "Get the Ball Out! 1",
    background: images.board,
    proportions: {
      x: 64 / 256,
      y: 32 / 192,
      width: 120 / 256,
      height: 144 / 192,
    },
    board,
    winningPlace: (block: Block) =>
      block.name === "ball" && block.x === 2 && block.y === 5,
  };
};
