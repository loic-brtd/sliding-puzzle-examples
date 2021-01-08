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
    .map(name => url + '?puzzle=' + name)
    .map(link => `<li><a href="${link}" style="${style}">${link}</a></li>`)
    .join('') + '</ul>';
  return links;
}


class HTMLRenderer {

  constructor({
    board,
    parentElement,
    proportions,
    backgroundImage,
  }) {
    this.board = board;
    this.proportions = proportions;
    this.parentElement = parentElement;

    // Background
    this.backgroundDiv = document.createElement('div');
    this.parentElement.style.display = 'grid';
    this.parentElement.appendChild(this.backgroundDiv);

    const resize = () => {
      const bounds = this.parentElement.getBoundingClientRect();
      const bgRatio = backgroundImage.width / backgroundImage.height;
      const boundsRatio = bounds.width / bounds.height;
      let w = 1, h = 1;
      if (boundsRatio > bgRatio) {
        w = bgRatio / boundsRatio;
      } else {
        h = boundsRatio / bgRatio;
      }
      this.backgroundDiv.style.width = w * 100 + '%';
      this.backgroundDiv.style.height = h * 100 + '%';
    }
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(this.parentElement)

    this.backgroundDiv.style.position = 'relative';
    this.backgroundDiv.style.margin = 'auto';
    this.backgroundDiv.id = 'background';

    if (board.color) {
      this.backgroundDiv.backgroundColor = board.color;
    }
    if (backgroundImage) {
      this._applyBackground(this.backgroundDiv, backgroundImage.src);
    }

    // Puzzle
    this.boardDiv = document.createElement('div');
    this.boardDiv.style.position = 'absolute';
    this._applyProportions(this.boardDiv, proportions);
    this.boardDiv.id = 'board';
    this.backgroundDiv.appendChild(this.boardDiv);

    // Blocks
    this.blockDivs = new Map(); // Map<Block, Element>

    for (let block of board.blocks) {
      const div = document.createElement('div');
      this.blockDivs.set(block, div);
      div.classList.add('block');
      div.style.position = 'absolute';

      this._applyProportions(div, {
        x: block.x / board.cols,
        y: block.y / board.rows,
        width: block.cols / board.cols,
        height: block.rows / board.rows,
      });

      if (block.color) {
        div.style.backgroundColor = block.color;
      }
      if (block.imagePath) {
        this._applyBackground(div, block.imagePath);
      }

      this.boardDiv.appendChild(div)
    }

    this.mouseIsPressed = false;
  }

  _applyProportions(element, proportions) {
    element.style.width = proportions.width * 100 + '%';
    element.style.height = proportions.height * 100 + '%';
    element.style.left = proportions.x * 100 + '%';
    element.style.top = proportions.y * 100 + '%';
  }

  _applyBackground(element, imageSource) {
    element.style.backgroundImage = `url("${imageSource}")`;
    element.style.backgroundSize = 'contain';
    element.style.backgroundRepeat = 'no-repeat';
  }

  _callbackMouseCoord(event, type) {
    const rect = this.boardDiv.getBoundingClientRect();

    const pos = (type === 'mouse')
      ? { x: event.clientX, y: event.clientY }
      : { x: event.touches[0].pageX, y: event.touches[0].pageY };

    const x = (pos.x - rect.left) / rect.width * this.board.cols; // [0..cols]
    const y = (pos.y - rect.top) / rect.height * this.board.rows; // [0..rows]

    return { x, y };
  }

  onMousePressed(callback) {
    const handler = (e, type) => {
      e.preventDefault();
      this.mouseIsPressed = true;
      const { x, y } = this._callbackMouseCoord(e, type);
      callback(x, y);
    }
    this.boardDiv.addEventListener('mousedown', e => handler(e, 'mouse'));
    this.boardDiv.addEventListener('touchstart', e => handler(e, 'touch'));
  }

  onMouseDragged(callback) {
    const handler = (e, type) => {
      e.preventDefault();
      if (this.mouseIsPressed) {
        const { x, y } = this._callbackMouseCoord(e, type);
        callback(x, y);
      }
    }
    this.boardDiv.addEventListener('mousemove', e => handler(e, 'mouse'));
    this.boardDiv.addEventListener('touchmove', e => handler(e, 'touch'));
  }

  onMouseReleased(callback) {
    const handler = e => {
      e.preventDefault();
      callback();
      this.mouseIsPressed = false;
    }
    this.boardDiv.addEventListener('mouseup', e => handler(e));
    this.boardDiv.addEventListener('touchend', e => handler(e));
  }

  render(block = null) {
    if (block) {
      const div = this.blockDivs.get(block);
      div.style.left = block.x / this.board.cols * 100 + '%';
      div.style.top = block.y / this.board.rows * 100 + '%';

    } else {
      for (let block of this.board.blocks) {
        this.render(block);
      }
    }
  }
}