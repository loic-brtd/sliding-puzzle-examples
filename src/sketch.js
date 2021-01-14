let assets;
let puzzle;
let renderer;
let canvas;

let ready = false;

function preload() {

  assets = {
    sounds: {
      // ambiant: new CustomSound("src/audio/puzzle_theme.mp3"),
      move: new CustomSound("src/audio/move1.wav"),
      // suspens: new CustomSound("src/audio/suspens.wav"),
      success: new CustomSound("src/audio/success.wav"),
      inPlace: new CustomSound("src/audio/in_place.wav"),
      reset: new CustomSound("src/audio/reset.wav"),
    },
  }

  const params = new URLSearchParams(window.location.search)
  if (params.get('puzzle') in puzzles) {
    puzzle = puzzles[params.get('puzzle')]({ assets });
  } else {
    document.querySelector('#container').innerHTML = '';
    createDiv(listPuzzles()).parent('#container')
  }
}

function setup() {
  noCanvas();
  if (!puzzle) return;

  if (puzzle.background) {
    onImageLoad(puzzle.background, init);
  }
}

function init() {
  ready = true;

  document.querySelector('.loader').remove();

  const container = document.querySelector("#container");

  renderer = new SlidingPuzzle.HTMLRenderer({
    container: container,
    board: puzzle.board,
    proportions: puzzle.proportions,
    backgroundImage: puzzle.background,
  });

  renderer.onMousePressed((x, y) => puzzle.board.mousePressed(x, y));
  renderer.onMouseDragged((x, y) => puzzle.board.mouseDragged(x, y));
  renderer.onMouseReleased(() => puzzle.board.mouseReleased());
  puzzle.board.on('animation', block => renderer.render(block));
  puzzle.setup();
}
