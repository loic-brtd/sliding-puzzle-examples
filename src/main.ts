import { makePuzzleList, onImageLoad } from "./utils";
import { HTMLRenderer, Block, Board } from "../lib/sliding-puzzle-esm";
import { CustomSound } from "./sounds";

async function main() {
  const audioPath = "src/audio/";
  const assets = {
    sounds: {
      // ambiant: new CustomSound(audioPath + puzzle_theme.mp3"),
      move: new CustomSound(audioPath + "move1.wav"),
      // suspens: new CustomSound(audioPath + "suspens.wav"),
      success: new CustomSound(audioPath + "success.wav"),
      inPlace: new CustomSound(audioPath + "in_place.wav"),
      reset: new CustomSound(audioPath + "reset.wav"),
    },
  };

  const puzzles = {
    get_the_ball_out_1: await import("./puzzles/get_the_ball_out_1/puzzle"),
    get_the_ball_out_4: await import("./puzzles/get_the_ball_out_4/puzzle"),
    royal_escape: await import("./puzzles/royal_escape/puzzle"),
  };

  // const puzzles = ["getTheBallOut1", "getTheBallOut4", "royalEscape"];

  const params = new URLSearchParams(window.location.search);
  const puzzleName = params.get("puzzle");
  // if (puzzles.includes(puzzleName)) {
  if (puzzleName in puzzles) {
    // const puzzlePath = `./puzzles/${puzzleName}/puzzle`;
    // const puzzleFactory = await import(puzzlePath);
    const puzzleFactory = puzzles[puzzleName];
    const puzzle = puzzleFactory.makePuzzle();
    if (puzzle && puzzle.background) {
      onImageLoad(puzzle.background, () => {
        const renderer = setupRenderer(puzzle);
        setupGameLogic({
          sounds: assets.sounds,
          board: puzzle.board,
          winningPlace: puzzle.winningPlace,
          renderer: renderer,
        });
      });
    }
  } else {
    document.querySelector("#container").innerHTML = makePuzzleList(puzzles);
  }

  function setupRenderer(puzzle) {
    document.querySelector(".loader").remove();

    const renderer = new HTMLRenderer({
      container: document.querySelector("#container"),
      board: puzzle.board,
      proportions: puzzle.proportions,
      backgroundImage: puzzle.background,
    });

    renderer.onMousePressed((x: number, y: number) =>
      puzzle.board.mousePressed(x, y)
    );
    renderer.onMouseDragged((x: number, y: number) =>
      puzzle.board.mouseDragged(x, y)
    );
    renderer.onMouseReleased(() => puzzle.board.mouseReleased());
    puzzle.board.on("animation", (block: Block) => renderer.render(block));

    return renderer;
  }

  function setupGameLogic({
    sounds,
    board,
    winningPlace,
    renderer,
  }: {
    sounds: any;
    board: Board;
    winningPlace: (b: Block) => boolean;
    renderer: any;
  }) {
    let wonTheGame = false;
    let moves = 0;
    let userInteracted = false;

    const movesElement = document.querySelector("#moves");
    movesElement.innerHTML = moves.toString();

    const resetButton = document.querySelector("#reset");
    const reset = () => {
      board.restorePositions();
      moves = 0;
      wonTheGame = false;
      renderer.render();
      movesElement.innerHTML = moves.toString();
      sounds.reset.play();
    };
    resetButton.addEventListener("click", reset);
    resetButton.addEventListener("touchstart", reset);

    board.savePositions();
    board.on("fullMoveEnd", () => {
      moves++;
      movesElement.innerHTML = moves.toString();
    });
    board.on("moveStart", (block: Block) => {
      sounds.move.play();

      // if (!userInteracted) {
      //   sounds.ambiant.loop();
      //   userInteracted = true;
      // }
    });
    board.on("moveEnd", (block: Block) => {
      if (winningPlace(block)) {
        sounds.inPlace.play();

        if (!wonTheGame) {
          // sounds.ambiant.fade(0);
          setTimeout(() => {
            // CustomSound.chain([sounds.suspens, sounds.success])
            //   .onended(() => sounds.ambiant.fade(1));
            // sounds.success.onended(() => sounds.ambiant.fade(1));

            sounds.success.play();
          }, 1000);
          wonTheGame = true;
        }
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", main);
