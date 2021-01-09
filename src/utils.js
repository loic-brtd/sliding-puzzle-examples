function makeImage(url) {
  const image = new Image();
  image.src = url;
  return image;
}

function fitInBounds(object, bounds) {
  const unit = Math.min(
    bounds.width / object.width,
    bounds.height / object.height
  );
  console.log(`${object.width}, ${bounds.width}`);
  console.log(`${object.height}, ${bounds.height}`);
  const width = object.width * unit;
  const height = object.height * unit;
  return {
    width,
    height,
  };
}

function onImageLoad(image, callback) {
  if (image.complete) {
    callback();
  } else {
    image.addEventListener('load', () => callback());
  }
}

function drawCount(renderer, count) {
  const unit = renderer.unit;

  fill("#1B1A1B");
  stroke("#6E4826");
  rect(width / 2 - unit / 2, unit / 3, unit, unit / 3);

  fill("#ED050D");
  noStroke();
  text(count, width / 2 + unit * 0.45, unit * 0.48);
}

function listPuzzles() {
  const style = 'color: white; font-size: 20px; text-align: center; line-height: 2;';
  const url = location.protocol + '//' + location.host + location.pathname;
  let links = '<ul>' + Object.keys(puzzles)
    .map(name => ([url + '?puzzle=' + name, name]))
    .map(([link, name]) => `<li><a href="${link}" style="${style}">${name}</a></li>`)
    .join('') + '</ul>';
  return links;
}


function sharedPuzzleSetup({ context, board, winningPlace }) {
  const sounds = context.assets.sounds;
  let wonTheGame = false;
  let moves = 0;
  let movedOnce = false;

  const movesElement = document.querySelector("#moves");
  movesElement.innerHTML = moves;

  const resetButton = document.querySelector('#reset');
  const reset = () => {
    board.restorePositions();
    moves = 0;
    wonTheGame = false;
    renderer.render();
    movesElement.innerHTML = moves;
    sounds.reset.play();
  }
  resetButton.addEventListener('click', reset);
  resetButton.addEventListener('touchstart', reset);

  board.savePositions();
  board.on("continuousMove", () => {
    moves++
    movesElement.innerHTML = moves;
  });
  board.on("move", (block) => {

    // First move
    // if (!movedOnce) {
    //   sounds.ambiant.loop();
    //   movedOnce = true;
    // }

    if (winningPlace(block)) {
      // Locked in place
      sounds.inPlace.play();

      if (!wonTheGame) {
        // sounds.ambiant.fade(0);
        setTimeout(() => {
          // CustomSound.chain([sounds.suspens, sounds.success])
          //   .onended(() => sounds.ambiant.fade(1));
          sounds.success.play();
          // sounds.success.onended(() => sounds.ambiant.fade(1));
        }, 1000);
        wonTheGame = true;
      }
    } else {
      // Regular move
      sounds.move.play();
    }
  });
}
