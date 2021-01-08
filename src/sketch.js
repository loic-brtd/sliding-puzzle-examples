let assets;
let puzzle;
let renderer;
let canvas;

let ready = false;

function preload() {
  assets = {
    sounds: {
      ambiant: new CustomSound("src/audio/puzzle_theme.mp3"),
      move: new CustomSound("src/audio/move1.wav"),
      suspens: new CustomSound("src/audio/suspens.wav"),
      success: new CustomSound("src/audio/success.wav"),
      inPlace: new CustomSound("src/audio/in_place.wav"),
    },
    fonts: {
      mono: loadFont("src/fonts/goodbyeDespair.ttf"),
      // mono: loadFont("fonts/prof-layton.ttf"),
    },
  };

  const params = new URLSearchParams(window.location.search)
  if (params.get('puzzle') in puzzles) {
    puzzle = puzzles[params.get('puzzle')]({ assets });
  } else {
    createDiv(listPuzzles())
  }

  // puzzle = puzzles.royalEscape({ assets });
  // puzzle = puzzles.getTheBallOut4({ assets });
}

function setup() {
  if (!puzzle) return;

  if (puzzle.background) {
    onImageLoad(puzzle.background, () => {
      ready = true;

      const container = document.querySelector("#canvas-container");
      container.style.width = '100%';
      container.style.height = '100%';

      renderer = new HTMLRenderer({
        board: puzzle.board,
        parentElement: container,
        proportions: puzzle.proportions,
        backgroundImage: puzzle.background,
      });

      renderer.onMousePressed((x, y) => {
        puzzle.board.mousePressed(x, y)
      });
      renderer.onMouseDragged((x, y) => {
        puzzle.board.mouseDragged(x, y)
      });
      renderer.onMouseReleased((x, y) => {
        puzzle.board.mouseReleased()
      });
      puzzle.board.on('animation', block => {
        renderer.render(block);
      })

      puzzle.setup(renderer);
    });
  }
}
