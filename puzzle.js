class Puzzle {
  constructor({
    board,
    background,
    canvasProportions,
    onSetup = (renderer) => {},
    onDraw = (renderer) => {},
  }) {
    this.renderer = renderer;
    this.background = background;
    this.canvasProportions = canvasProportions;
    this.board = board;
    this.setup = onSetup;
    this.draw = onDraw;
  }
}
