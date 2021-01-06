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
  const width = object.width * unit;
  const height = object.height * unit;
  return {
    width,
    height,
  };
}

function waitFor(condition) {
  const toExecute = (callback) => {
    if (!condition()) {
      setTimeout(() => toExecute(callback), 100);
    } else {
      callback();
    }
  };
  return { toExecute };
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
  let links = `<ul>
    ${Object.keys(puzzles)
      .map(name => url + '?puzzle=' + name)
      .map(link => `<li><a href="${link}" style="${style}">${link}</a></li>`)
      .join('')}
              </ul>`;
  return links;
}