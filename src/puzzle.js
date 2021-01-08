class Puzzle {
  constructor({
    board,
    background,
    proportions,
    onSetup = (renderer) => {},
    onDraw = (renderer) => {},
  }) {
    this.renderer = renderer;
    this.background = background;
    this.proportions = proportions;
    this.board = board;
    this.setup = onSetup;
    this.draw = onDraw;
  }
}
