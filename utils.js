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
