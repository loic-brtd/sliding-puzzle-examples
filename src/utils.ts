export function makeImage(url) {
  const image = new Image();
  image.src = url;
  return image;
}

export function fitInBounds(object, bounds) {
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

export function onImageLoad(image, callback) {
  if (image.complete) {
    callback();
  } else {
    image.addEventListener("load", () => callback());
  }
}

export function makePuzzleList(puzzles) {
  const baseUrl = location.protocol + "//" + location.host + location.pathname;
  let html_links = '<ul class="puzzle-list">';

  for (let [puzzleName, puzzleFactory] of Object.entries(puzzles)) {
    const puzzle = (puzzleFactory as any).makePuzzle();
    const href = baseUrl + "?puzzle=" + puzzleName;
    const title = puzzle.title;
    html_links += `<li><a href="${href}">${title}</a></li>`;
  }

  html_links += "</ul>";
  return html_links;
}
