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

export function listPuzzles(puzzles) {
  const style =
    "color: white; font-size: 20px; text-align: center; line-height: 2;";
  const url = location.protocol + "//" + location.host + location.pathname;
  let links =
    "<ul>" +
    Object.keys(puzzles)
      .map((name) => [url + "?puzzle=" + name, name])
      .map(
        ([link, name]) =>
          `<li><a href="${link}" style="${style}">${name}</a></li>`
      )
      .join("") +
    "</ul>";
  return links;
}
