let assets;
let puzzle;
let renderer;
let canvas;

let ready = false;

function preload() {
  assets = {
    sounds: {
      ambiant: new CustomSound("audio/puzzle_theme.mp3"),
      move: new CustomSound("audio/move1.wav"),
      suspens: new CustomSound("audio/suspens.wav"),
      success: new CustomSound("audio/success.wav"),
      inPlace: new CustomSound("audio/in_place.wav"),
    },
    fonts: {
      mono: loadFont("fonts/prof-layton.ttf"),
    },
  };

  // puzzle = puzzles.royalEscape({ assets });
  puzzle = puzzles.getTheBallOut4({ assets });
}

function setup() {
  // let canvas;

  if (puzzle.background) {
    waitFor(() => puzzle.background.complete).toExecute(() => {
      ready = true;

      const container = document.querySelector("#canvas-container");

      const dim = fitInBounds(puzzle.background, {
        width: windowWidth,
        height: windowHeight,
      });
      container.style.width = dim.width + "px";
      container.style.height = dim.height + "px";
      container.style.backgroundImage = `url("${puzzle.background.src}")`;
      container.style.backgroundSize = "contain";
      container.style.backgroundPosition = "center";

      const p = puzzle.canvasProportions;
      const w = dim.width * p.width;
      const h = dim.height * p.height;
      const x = dim.width * p.x;
      const y = dim.height * p.y;

      canvas = createCanvas(w, h);
      canvas.elt.width = w;
      canvas.elt.height = h;
      canvas.parent("canvas-container");
      canvas.position(x, y);

      renderer = new SlidingPuzzle.CanvasRenderer({
        board: puzzle.board,
        canvas,
      });

      puzzle.setup(renderer);
    });
  } else {
    ready = true;

    const bounds = {
      width: windowWidth,
      height: windowHeight,
    };
    const { width: w, height: h } = SlidingPuzzle.Utils.fitInBounds(
      puzzle.board,
      bounds
    );

    canvas = createCanvas(w, h).parent("canvas-container");

    renderer = new SlidingPuzzle.CanvasRenderer({
      board: puzzle.board,
      canvas,
    });
    puzzle.setup(renderer);
  }
}

function draw() {

  if (!ready) {
    return;
  }

  puzzle.draw(renderer);
}

// function keyPressed() {
//   board.restorePositions();
//   moves = 0;
//   redraw();
// }

function mousePressed() {
  puzzle.board.mousePressed(mouseX / renderer.unit, mouseY / renderer.unit);
}

function mouseDragged() {
  puzzle.board.mouseDragged(mouseX / renderer.unit, mouseY / renderer.unit);
}

function mouseReleased() {
  puzzle.board.mouseReleased();
}
