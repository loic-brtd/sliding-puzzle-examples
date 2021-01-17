import {
  makePuzzleList,
  onImageLoad,
  Puzzle,
  PuzzleDictionary,
  rootPath,
} from "./utils";
import { HTMLRenderer, Block, Board } from "../lib/sliding-puzzle-esm";
import { CustomSound } from "./sounds";

async function main() {
  const audioPath = rootPath + "src/audio/";
  const assets = {
    sounds: {
      // ambiant: new CustomSound(audioPath + puzzle_theme.mp3"),
      // suspens: new CustomSound(audioPath + "suspens.wav"),
      move: new CustomSound(audioPath + "move1.wav"),
      success: new CustomSound(audioPath + "success.wav"),
      inPlace: new CustomSound(audioPath + "in_place.wav"),
      reset: new CustomSound(audioPath + "reset.wav"),
    },
  };

  const puzzles: PuzzleDictionary = {
    CV058: await import("./puzzles/CV058/puzzle"),
    CV094: await import("./puzzles/CV094/puzzle"),
    CV097: await import("./puzzles/CV097/puzzle"),
    CV135: await import("./puzzles/CV135/puzzle"),
  };

  loadAppropriatePage(puzzles, assets);
}

document.addEventListener("DOMContentLoaded", async () => {
  const audioPath = rootPath + "src/audio/";
  const assets = {
    sounds: {
      // ambiant: new CustomSound(audioPath + puzzle_theme.mp3"),
      // suspens: new CustomSound(audioPath + "suspens.wav"),
      move: new CustomSound(audioPath + "move1.wav"),
      success: new CustomSound(audioPath + "success.wav"),
      inPlace: new CustomSound(audioPath + "in_place.wav"),
      reset: new CustomSound(audioPath + "reset.wav"),
    },
  };

  const puzzles: PuzzleDictionary = {
    CV058: await import("./puzzles/CV058/puzzle"),
    CV094: await import("./puzzles/CV094/puzzle"),
    CV097: await import("./puzzles/CV097/puzzle"),
    CV135: await import("./puzzles/CV135/puzzle"),
  };

  loadAppropriatePage(puzzles, assets);
});

function loadAppropriatePage(
  puzzles: PuzzleDictionary,
  assets: {
    sounds: {
      // ambiant: new CustomSound(audioPath + puzzle_theme.mp3"),
      // suspens: new CustomSound(audioPath + "suspens.wav"),
      move: CustomSound;
      success: CustomSound;
      inPlace: CustomSound;
      reset: CustomSound;
    };
  }
) {
  const params = new URLSearchParams(window.location.search);
  const puzzleName = params.get("puzzle");

  if (puzzleName in puzzles) {
    // Valid puzzle reference
    const puzzleFactory = puzzles[puzzleName];
    const puzzle = puzzleFactory.makePuzzle();
    if (puzzle && puzzle.background) {
      onImageLoad(puzzle.background, () => {
        setupGameLogic({
          sounds: assets.sounds,
          board: puzzle.board,
          winningPlace: puzzle.winningPlace,
          renderer: createRenderer(puzzle),
        });
      });
    }
  } else {
    // Invalid puzzle reference => go to menu
    document.querySelector("#container").innerHTML = makePuzzleList(puzzles);
  }

  function createRenderer(puzzle: Puzzle) {
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

    const quitButton = document.querySelector("#quit");
    const quit = () => (window.location.href = rootPath + "?puzzle=home");
    quitButton.addEventListener("click", quit);
    quitButton.addEventListener("touchstart", quit);

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
