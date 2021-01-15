/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function makeImage(url) {
    var image = new Image();
    image.src = url;
    return image;
}
function onImageLoad(image, callback) {
    if (image.complete) {
        callback();
    }
    else {
        image.addEventListener("load", function () { return callback(); });
    }
}
function makePuzzleList(puzzles) {
    var e_1, _a;
    var baseUrl = location.protocol + "//" + location.host + location.pathname;
    var html_links = '<ul class="puzzle-list">';
    try {
        for (var _b = __values(Object.entries(puzzles)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), puzzleName = _d[0], puzzleFactory = _d[1];
            var puzzle = puzzleFactory.makePuzzle();
            var href = baseUrl + "?puzzle=" + puzzleName;
            var title = puzzle.title;
            html_links += "<li><a href=\"" + href + "\">" + title + "</a></li>";
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    html_links += "</ul>";
    return html_links;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __generator$1(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: [],
    },
    f,
    y,
    t,
    g;
  return (
    (g = { next: verb(0), throw: verb(1), return: verb(2) }),
    typeof Symbol === "function" &&
      (g[Symbol.iterator] = function () {
        return this;
      }),
    g
  );
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (
          ((f = 1),
          y &&
            (t =
              op[0] & 2
                ? y["return"]
                : op[0]
                ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t;
        if (((y = 0), t)) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (
              !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
              (op[0] === 6 || op[0] === 2)
            ) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}

function __values$1(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function () {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      },
    };
  throw new TypeError(
    s ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}

function __read$1(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error: error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

var Direction = /** @class */ (function () {
  function Direction(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }
  Direction.all = function () {
    return [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
  };
  Direction.vertical = function () {
    return [Direction.UP, Direction.DOWN];
  };
  Direction.horizontal = function () {
    return [Direction.LEFT, Direction.RIGHT];
  };
  Direction.none = function () {
    return [];
  };
  Direction.from = function (dx, dy) {
    var e_1, _a;
    try {
      for (
        var _b = __values$1(this.all()), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var dir = _c.value;
        if (dir.dx === dx && dir.dy === dy) {
          return dir;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    return null;
  };
  Direction.UP = new Direction(0, -1);
  Direction.DOWN = new Direction(0, 1);
  Direction.LEFT = new Direction(-1, 0);
  Direction.RIGHT = new Direction(1, 0);
  return Direction;
})();

var Block = /** @class */ (function () {
  function Block(_a) {
    var _b = _a === void 0 ? {} : _a,
      _c = _b.shape,
      shape = _c === void 0 ? [[1]] : _c,
      _d = _b.x,
      x = _d === void 0 ? 0 : _d,
      _e = _b.y,
      y = _e === void 0 ? 0 : _e,
      _f = _b.possibleMoves,
      possibleMoves = _f === void 0 ? Direction.all() : _f,
      _g = _b.possibleOverlaps,
      possibleOverlaps = _g === void 0 ? [] : _g,
      _h = _b.selectable,
      selectable = _h === void 0 ? true : _h,
      color = _b.color,
      image = _b.image,
      name = _b.name,
      content = _b.content;
    this.shape = [[1]];
    this.cols = 0;
    this.rows = 0;
    this.shape = shape;
    this.cols = this.shape.reduce(function (acc, curr) {
      return Math.max(acc, curr.length);
    }, 0);
    this.rows = this.shape.length;
    this.x = x;
    this.y = y;
    this.possibleMoves = possibleMoves;
    this.possibleOverlaps = possibleOverlaps;
    this.selectable = selectable;
    this.color = color;
    this.name = name;
    this.content = content;
    if (image) {
      if (typeof image === "string") {
        this.imageElement = Block._urlToImage(image);
        this.imagePath = image;
      } else if (image instanceof HTMLImageElement) {
        this.imageElement = image;
        this.imagePath = this.imageElement.src;
      } else if (image.elt) {
        var url = image.elt.toDataURL();
        this.imageElement = Block._urlToImage(url);
        this.imageElement.width = image.elt.width;
        this.imageElement.height = image.elt.height;
        this.imagePath = this.imageElement.src;
      }
    }
  }
  Block._urlToImage = function (url) {
    var image = new Image();
    image.onerror = function () {
      throw new Error('Error on image "' + url + '".');
    };
    image.src = url;
    return image;
  };
  Block.prototype.shapeCoords = function () {
    var y, x;
    return __generator$1(this, function (_a) {
      switch (_a.label) {
        case 0:
          y = 0;
          _a.label = 1;
        case 1:
          if (!(y < this.shape.length)) return [3 /*break*/, 6];
          x = 0;
          _a.label = 2;
        case 2:
          if (!(x < this.shape[y].length)) return [3 /*break*/, 5];
          if (!(this.shape[y][x] === 1)) return [3 /*break*/, 4];
          return [4 /*yield*/, [this.x + x, this.y + y]];
        case 3:
          _a.sent();
          _a.label = 4;
        case 4:
          x++;
          return [3 /*break*/, 2];
        case 5:
          y++;
          return [3 /*break*/, 1];
        case 6:
          return [2 /*return*/];
      }
    });
  };
  Block.prototype.containsCoord = function (x, y) {
    var e_1, _a;
    try {
      for (
        var _b = __values$1(this.shapeCoords()), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var _d = __read$1(_c.value, 2),
          bx = _d[0],
          by = _d[1];
        if (x === bx && y === by) {
          return true;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    return false;
  };
  Block.prototype.move = function (direction) {
    this.x += direction.dx;
    this.y += direction.dy;
  };
  Block.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
  };
  Block.prototype.cannotOverlapWith = function (other) {
    return !this.possibleOverlaps.includes(other);
  };
  Block.prototype.overlapsWith = function (other, dx, dy) {
    var e_2, _a, e_3, _b;
    if (dx === void 0) {
      dx = 0;
    }
    if (dy === void 0) {
      dy = 0;
    }
    try {
      for (
        var _c = __values$1(this.shapeCoords()), _d = _c.next();
        !_d.done;
        _d = _c.next()
      ) {
        var _e = __read$1(_d.value, 2),
          x = _e[0],
          y = _e[1];
        try {
          for (
            var _f = ((e_3 = void 0), __values$1(other.shapeCoords())),
              _g = _f.next();
            !_g.done;
            _g = _f.next()
          ) {
            var _h = __read$1(_g.value, 2),
              ox = _h[0],
              oy = _h[1];
            if (x === ox + dx && y === oy + dy) {
              return true;
            }
          }
        } catch (e_3_1) {
          e_3 = { error: e_3_1 };
        } finally {
          try {
            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
          } finally {
            if (e_3) throw e_3.error;
          }
        }
      }
    } catch (e_2_1) {
      e_2 = { error: e_2_1 };
    } finally {
      try {
        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
    return false;
  };
  return Block;
})();

function constrain(value, min, max) {
  return value < min ? min : value > max ? max : value;
}
function lerp(start, stop, amount) {
  return amount * (stop - start) + start;
}
function runAnimation(_a) {
  // Inspired from https://javascript.info/js-animation
  var _b = _a === void 0 ? {} : _a,
    _c = _b.duration,
    duration = _c === void 0 ? 100 : _c,
    _d = _b.timingFunction,
    timingFunction =
      _d === void 0
        ? function (t) {
            return t;
          }
        : _d,
    onFrame = _b.onFrame,
    onEnd = _b.onEnd;
  var startTime;
  requestAnimationFrame(function run(currentTime) {
    if (startTime === undefined) {
      startTime = currentTime;
    }
    var ellapsedMillis = currentTime - startTime;
    var timeFraction = ellapsedMillis / duration; // [0..1]
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    // calculate the current animation state
    var progress = timingFunction(timeFraction);
    if (onFrame) {
      onFrame(progress);
    }
    if (timeFraction < 1) {
      requestAnimationFrame(run);
    } else {
      if (onEnd) {
        onEnd();
      }
    }
  });
}

var CALLBACK_NAMES = ["moveStart", "moveEnd", "fullMoveEnd", "animation"];
var Board = /** @class */ (function () {
  function Board(_a) {
    var _b = _a === void 0 ? {} : _a,
      _c = _b.cols,
      cols = _c === void 0 ? 6 : _c,
      _d = _b.rows,
      rows = _d === void 0 ? 6 : _d,
      _e = _b.animate,
      animate = _e === void 0 ? true : _e,
      _f = _b.animationDuration,
      animationDuration = _f === void 0 ? 60 : _f,
      color = _b.color,
      image = _b.image;
    this.blocks = [];
    this._callbacks = new Map(
      CALLBACK_NAMES.map(function (name) {
        return [name, []];
      })
    );
    this._animationRunning = false;
    this._movesSincePressed = 0;
    this.cols = cols;
    this.rows = rows;
    this.animate = animate;
    this.animationDuration = animationDuration;
    this.color = color;
    if (image) {
      if (typeof image === "string") {
        this.imageElement = document.createElement("img");
        this.imageElement.src = image;
        this.imagePath = image;
      } else if (image instanceof HTMLImageElement) {
        this.imageElement = image;
        this.imagePath = this.imageElement.src;
      }
    }
  }
  Board.prototype.savePositions = function () {
    var e_1, _a;
    this._savedPositions = new Map();
    try {
      for (
        var _b = __values$1(this.blocks), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var block = _c.value;
        this._savedPositions.set(block, { x: block.x, y: block.y });
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  Board.prototype.restorePositions = function () {
    var e_2, _a;
    try {
      for (
        var _b = __values$1(this.blocks), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var block = _c.value;
        var _d = this._savedPositions.get(block),
          x = _d.x,
          y = _d.y;
        block.setPosition(x, y);
      }
    } catch (e_2_1) {
      e_2 = { error: e_2_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  };
  Board.prototype.addBlock = function (block) {
    this.blocks.push(block);
  };
  Board.prototype.findBlock = function (nameOrPredicate) {
    var e_3, _a, e_4, _b;
    if (typeof nameOrPredicate === "string") {
      var name_1 = nameOrPredicate;
      try {
        for (
          var _c = __values$1(this.blocks), _d = _c.next();
          !_d.done;
          _d = _c.next()
        ) {
          var block = _d.value;
          if (block.name === name_1) return block;
        }
      } catch (e_3_1) {
        e_3 = { error: e_3_1 };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        } finally {
          if (e_3) throw e_3.error;
        }
      }
      return null;
    } else {
      var predicate = nameOrPredicate;
      try {
        for (
          var _e = __values$1(this.blocks), _f = _e.next();
          !_f.done;
          _f = _e.next()
        ) {
          var block = _f.value;
          if (predicate(block)) return block;
        }
      } catch (e_4_1) {
        e_4 = { error: e_4_1 };
      } finally {
        try {
          if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        } finally {
          if (e_4) throw e_4.error;
        }
      }
      return null;
    }
  };
  Board.prototype.on = function (event, callback) {
    // Runtime check
    if (!CALLBACK_NAMES.includes(event)) {
      console.error(
        "'" +
          event +
          "' is not an event of the Board class. " +
          ("Valid events are: " +
            CALLBACK_NAMES.map(function (n) {
              return '"' + n + '"';
            }).join(", ") +
            ".")
      );
      return;
    }
    this._callbacks.get(event).push(callback);
  };
  Board.prototype._fireEvent = function (event, block) {
    this._callbacks.get(event).forEach(function (cb) {
      return cb(block);
    });
  };
  Board.prototype.blockAtCoord = function (x, y) {
    var e_5, _a;
    try {
      for (
        var _b = __values$1(this.blocks), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var block = _c.value;
        if (block.selectable && block.containsCoord(x, y)) {
          return block;
        }
      }
    } catch (e_5_1) {
      e_5 = { error: e_5_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_5) throw e_5.error;
      }
    }
    return null;
  };
  // Mouse pressed on a block : select this block
  // Mouse dragged to another point : this point is the target that the selected block must follow, one step by one, each step taking the same amount of time.
  // Reference for the animation of the movements : https://www.youtube.com/watch?v=aJzu2rblcYg&ab_channel=GameLoc
  Board.prototype.mousePressed = function (x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    this._pressedPoint = { x: x, y: y };
    var block = this.blockAtCoord(x, y);
    if (block) {
      this.selectedBlock = block;
    }
    this._movesSincePressed = 0;
  };
  Board.prototype.mouseDragged = function (x, y) {
    if (!this._pressedPoint || !this.selectedBlock) {
      return;
    }
    x = Math.floor(x);
    y = Math.floor(y);
    var draggedX = x - this._pressedPoint.x;
    var draggedY = y - this._pressedPoint.y;
    var diffX = Math.round(draggedX);
    var diffY = Math.round(draggedY);
    if (diffX === 0 && diffY === 0) {
      return;
    }
    // Choosing between a horizontal or vertical move, constrained to 1 unit
    var dx = 0;
    var dy = 0;
    if (Math.abs(draggedX) > Math.abs(draggedY)) {
      dx = constrain(diffX, -1, 1);
    } else {
      dy = constrain(diffY, -1, 1);
    }
    var direction = Direction.from(dx, dy);
    if (direction) {
      if (this.tryMoveSelectedBlock(direction)) {
        // if I move the selected block by (dx, 0) or (dy, 0), I must
        // move 'this.pressedPoint' towards the same direction
        this._pressedPoint.x += dx;
        this._pressedPoint.y += dy;
      }
    } else {
      console.warn("direction is null (should't be)");
    }
  };
  Board.prototype.mouseReleased = function () {
    if (this.selectedBlock) {
      if (this._movesSincePressed > 0 || this._animationRunning) {
        this._fireEvent("fullMoveEnd", this.selectedBlock);
      }
      this.selectedBlock = null;
    }
  };
  Board.prototype.tryMoveSelectedBlock = function (direction) {
    var e_6, _a;
    var _this = this;
    if (this._animationRunning || !this.selectedBlock) {
      return false;
    }
    // Checking if direction if allowed for this block
    if (!this.selectedBlock.possibleMoves.includes(direction)) {
      return false;
    }
    // Checking if move is valid
    var dx = direction.dx,
      dy = direction.dy;
    try {
      for (
        var _b = __values$1(this.blocks), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var other = _c.value;
        if (
          other !== this.selectedBlock &&
          other.overlapsWith(this.selectedBlock, dx, dy) &&
          this.selectedBlock.cannotOverlapWith(other)
        ) {
          return false;
        }
      }
    } catch (e_6_1) {
      e_6 = { error: e_6_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_6) throw e_6.error;
      }
    }
    if (this.animate) {
      // With animation
      var _d = this.selectedBlock,
        x_1 = _d.x,
        y_1 = _d.y;
      var animatedBlock_1 = this.selectedBlock;
      this._animationRunning = true;
      this._fireEvent("moveStart", this.selectedBlock);
      runAnimation({
        duration: this.animationDuration,
        onFrame: function (progress) {
          animatedBlock_1.x = lerp(x_1, x_1 + dx, progress);
          animatedBlock_1.y = lerp(y_1, y_1 + dy, progress);
          _this._fireEvent("animation", animatedBlock_1);
        },
        onEnd: function () {
          _this._animationRunning = false;
          _this._movesSincePressed += 1;
          _this._fireEvent("moveEnd", animatedBlock_1);
        },
      });
    } else {
      // Without animation
      this._fireEvent("moveStart", this.selectedBlock);
      this.selectedBlock.move(direction);
      this._movesSincePressed += 1;
      this._fireEvent("moveEnd", this.selectedBlock);
    }
    return true;
  };
  return Board;
})();

var CanvasRenderer = /** @class */ (function () {
  function CanvasRenderer(_a) {
    var board = _a.board,
      canvas = _a.canvas,
      dimension = _a.dimension;
    this.board = board;
    if (!canvas && !dimension) {
      throw new Error(
        "You may pass a 'canvas' or a 'dimension' or both as parameters."
      );
    }
    if (!canvas) {
      this.canvas = document.createElement("canvas");
    } else if (canvas instanceof HTMLCanvasElement) {
      this.canvas = canvas;
    } else if (canvas.elt && canvas.elt.classList.contains("p5Canvas")) {
      this.canvas = canvas.elt;
    } else {
      throw new TypeError(
        "'canvas' parameter should be an HTMLCanvasElement or a p5 canvas."
      );
    }
    if (!dimension) {
      this.canvas.width = dimension.width;
      this.canvas.height = dimension.height;
    }
    this.unit = this.canvas.width / this.board.cols;
    this.ctx = this.canvas.getContext("2d");
  }
  Object.defineProperty(CanvasRenderer.prototype, "width", {
    get: function () {
      return this.canvas.width;
    },
    enumerable: false,
    configurable: true,
  });
  Object.defineProperty(CanvasRenderer.prototype, "height", {
    get: function () {
      return this.canvas.height;
    },
    enumerable: false,
    configurable: true,
  });
  CanvasRenderer.prototype.render = function () {
    var e_1, _a;
    if (this.board.imageElement) {
      this.ctx.drawImage(
        this.board.imageElement,
        0,
        0,
        this.board.cols * this.unit,
        this.board.rows * this.unit
      );
    } else {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    if (this.board.color) {
      this.ctx.fillStyle = this.board.color;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
    try {
      for (
        var _b = __values$1(this.board.blocks), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var block = _c.value;
        this.renderBlock(block);
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  CanvasRenderer.prototype.renderBlock = function (block) {
    var e_2, _a;
    var unit = this.unit;
    if (block.color) {
      var inside = unit * 0.8;
      try {
        for (
          var _b = __values$1(block.shapeCoords()), _c = _b.next();
          !_c.done;
          _c = _b.next()
        ) {
          var _d = __read$1(_c.value, 2),
            x = _d[0],
            y = _d[1];
          this.ctx.fillStyle = block.color;
          this.ctx.fillRect(x * unit, y * unit, unit, unit);
          this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
          this.ctx.fillRect(
            x * unit + inside,
            y * unit + inside,
            unit - 2 * inside,
            unit - 2 * inside
          );
        }
      } catch (e_2_1) {
        e_2 = { error: e_2_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
      if (block.selectable) {
        // Contour of block
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.lineWidth = unit * 0.04;
        this.ctx.strokeRect(
          block.x * unit,
          block.y * unit,
          block.cols * unit,
          block.rows * unit
        );
      }
    }
    if (block.imageElement) {
      this.ctx.drawImage(
        block.imageElement,
        block.x * unit,
        block.y * unit,
        block.cols * unit,
        block.rows * unit
      );
    }
  };
  return CanvasRenderer;
})();

var HTMLRenderer = /** @class */ (function () {
  function HTMLRenderer(_a) {
    var e_1, _b;
    var _this = this;
    var board = _a.board,
      _c = _a.container,
      container = _c === void 0 ? document.body : _c,
      _d = _a.proportions,
      proportions = _d === void 0 ? { x: 0, y: 0, width: 1, height: 1 } : _d,
      backgroundImage = _a.backgroundImage;
    this.blockDivsMap = new Map();
    this.mouseIsPressed = false;
    this.board = board;
    this.proportions = proportions;
    this.container = container;
    // Background
    this.backgroundDiv =
      this.container.querySelector("div.background") ||
      document.createElement("div");
    this.container.appendChild(this.backgroundDiv);
    this.container.style.display = "grid";
    var resizeBackground = function () {
      if (backgroundImage) {
        var bounds = container.getBoundingClientRect();
        var boundsRatio = bounds.width / bounds.height;
        var bgRatio = backgroundImage.width / backgroundImage.height;
        var w = boundsRatio > bgRatio ? bgRatio / boundsRatio : 1;
        var h = boundsRatio > bgRatio ? 1 : boundsRatio / bgRatio;
        _this.backgroundDiv.style.width = w * 100 + "%";
        _this.backgroundDiv.style.height = h * 100 + "%";
      } else {
        _this.backgroundDiv.style.width = "100%";
        _this.backgroundDiv.style.height = "100%";
      }
    };
    resizeBackground();
    var observer = new ResizeObserver(resizeBackground);
    observer.observe(this.container);
    this.backgroundDiv.style.position = "relative";
    this.backgroundDiv.style.margin = "auto";
    this.backgroundDiv.classList.add("background");
    if (board.color) {
      this.backgroundDiv.style.backgroundColor = board.color;
    }
    if (backgroundImage) {
      this._applyBackground(this.backgroundDiv, backgroundImage.src);
    }
    // Puzzle
    this.boardDiv =
      this.backgroundDiv.querySelector("div.board") ||
      document.createElement("div");
    this.backgroundDiv.appendChild(this.boardDiv);
    this.boardDiv.style.position = "absolute";
    this._applyProportions(this.boardDiv, proportions);
    this.boardDiv.classList.add("board");
    try {
      // Blocks
      for (
        var _e = __values$1(board.blocks), _f = _e.next();
        !_f.done;
        _f = _e.next()
      ) {
        var block = _f.value;
        var blockDiv = document.createElement("div");
        this.blockDivsMap.set(block, blockDiv);
        blockDiv.classList.add("block");
        if (block.selectable) {
          blockDiv.classList.add("selectable");
        }
        blockDiv.style.position = "absolute";
        this._applyProportions(blockDiv, {
          x: block.x / board.cols,
          y: block.y / board.rows,
          width: block.cols / board.cols,
          height: block.rows / board.rows,
        });
        if (block.color) {
          blockDiv.style.backgroundColor = block.color;
        }
        if (block.imagePath) {
          this._applyBackground(blockDiv, block.imagePath);
        }
        if (block.content) {
          blockDiv.innerHTML = block.content;
        }
        this.boardDiv.appendChild(blockDiv);
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    this.mouseIsPressed = false;
  }
  HTMLRenderer.prototype._applyProportions = function (element, proportions) {
    element.style.width = proportions.width * 100 + "%";
    element.style.height = proportions.height * 100 + "%";
    element.style.left = proportions.x * 100 + "%";
    element.style.top = proportions.y * 100 + "%";
  };
  HTMLRenderer.prototype._applyBackground = function (element, imageSource) {
    element.style.backgroundImage = 'url("' + imageSource + '")';
    element.style.backgroundSize = "contain";
    element.style.backgroundRepeat = "no-repeat";
  };
  HTMLRenderer.prototype._callbackMouseCoord = function (event) {
    var rect = this.boardDiv.getBoundingClientRect();
    var pos;
    if (event instanceof MouseEvent) {
      pos = { x: event.clientX, y: event.clientY };
    } else {
      pos = { x: event.touches[0].pageX, y: event.touches[0].pageY };
    }
    var x = ((pos.x - rect.left) / rect.width) * this.board.cols; // [0..cols]
    var y = ((pos.y - rect.top) / rect.height) * this.board.rows; // [0..rows]
    return { x: x, y: y };
  };
  HTMLRenderer.prototype.onMousePressed = function (callback) {
    var _this = this;
    var handler = function (e) {
      e.preventDefault();
      _this.mouseIsPressed = true;
      var _a = _this._callbackMouseCoord(e),
        x = _a.x,
        y = _a.y;
      callback(x, y);
    };
    this.boardDiv.addEventListener("mousedown", handler);
    this.boardDiv.addEventListener("touchstart", handler);
  };
  HTMLRenderer.prototype.onMouseDragged = function (callback) {
    var _this = this;
    var handler = function (e) {
      e.preventDefault();
      if (_this.mouseIsPressed) {
        var _a = _this._callbackMouseCoord(e),
          x = _a.x,
          y = _a.y;
        callback(x, y);
      }
    };
    this.boardDiv.addEventListener("mousemove", handler);
    this.boardDiv.addEventListener("touchmove", handler);
  };
  HTMLRenderer.prototype.onMouseReleased = function (callback) {
    var _this = this;
    var handler = function (e) {
      e.preventDefault();
      callback();
      _this.mouseIsPressed = false;
    };
    // Event is placed on the <body> element to handle the case where the
    // player releases the mouse outside de puzzle board.
    document.body.addEventListener("mouseup", function (e) {
      return handler(e);
    });
    document.body.addEventListener("touchend", function (e) {
      return handler(e);
    });
  };
  HTMLRenderer.prototype.render = function (block) {
    var e_2, _a;
    if (block) {
      var blockDiv = this.blockDivsMap.get(block);
      blockDiv.style.left = (block.x / this.board.cols) * 100 + "%";
      blockDiv.style.top = (block.y / this.board.rows) * 100 + "%";
    } else {
      try {
        for (
          var _b = __values$1(this.board.blocks), _c = _b.next();
          !_c.done;
          _c = _b.next()
        ) {
          var block_1 = _c.value;
          this.render(block_1);
        }
      } catch (e_2_1) {
        e_2 = { error: e_2_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
    }
  };
  return HTMLRenderer;
})();

var CustomSound = /** @class */ (function () {
    function CustomSound(path) {
        this.path = path;
        this.audio = new Audio(path);
        this.audio.volume = CustomSound.globalVolume;
    }
    CustomSound.prototype.play = function () {
        this.audio.loop = false;
        this.audio.currentTime = 0;
        this.audio.play();
    };
    CustomSound.prototype.loop = function () {
        this.audio.loop = true;
        this.audio.currentTime = 0;
        this.audio.play();
    };
    CustomSound.prototype.pause = function () {
        this.audio.play();
    };
    CustomSound.prototype.stop = function () {
        this.audio.pause();
        this.audio.currentTime = 0;
    };
    CustomSound.prototype.fade = function (target) {
        var _this = this;
        target *= CustomSound.globalVolume;
        if (Math.abs(this.audio.volume - target) < 0.05) {
            this.audio.volume = target;
        }
        else {
            if (this.audio.volume > target) {
                this.audio.volume -= 0.02;
            }
            else {
                this.audio.volume += 0.02;
            }
            setTimeout(function () { return _this.fade(target); }, 20);
        }
    };
    CustomSound.prototype.volume = function (value) {
        value *= CustomSound.globalVolume;
        if (value !== undefined) {
            this.audio.volume = value;
        }
        else {
            return value;
        }
    };
    CustomSound.prototype.onended = function (callback) {
        this.audio.onended = callback;
    };
    CustomSound.chain = function (sounds) {
        if (sounds.length == 0) {
            return;
        }
        var _loop_1 = function (i) {
            var curr = sounds[i];
            var next = sounds[i + 1];
            curr.onended(function () { return next.play(); });
        };
        for (var i = 0; i < sounds.length - 1; i++) {
            _loop_1(i);
        }
        sounds[0].play();
        return sounds[sounds.length - 1];
    };
    CustomSound.globalVolume = 0.1;
    return CustomSound;
}());

function main() {
    return __awaiter(this, void 0, void 0, function () {
        function setupRenderer(puzzle) {
            document.querySelector(".loader").remove();
            var renderer = new HTMLRenderer({
                container: document.querySelector("#container"),
                board: puzzle.board,
                proportions: puzzle.proportions,
                backgroundImage: puzzle.background,
            });
            renderer.onMousePressed(function (x, y) {
                return puzzle.board.mousePressed(x, y);
            });
            renderer.onMouseDragged(function (x, y) {
                return puzzle.board.mouseDragged(x, y);
            });
            renderer.onMouseReleased(function () { return puzzle.board.mouseReleased(); });
            puzzle.board.on("animation", function (block) { return renderer.render(block); });
            return renderer;
        }
        function setupGameLogic(_a) {
            var sounds = _a.sounds, board = _a.board, winningPlace = _a.winningPlace, renderer = _a.renderer;
            var wonTheGame = false;
            var moves = 0;
            var movesElement = document.querySelector("#moves");
            movesElement.innerHTML = moves.toString();
            var resetButton = document.querySelector("#reset");
            var reset = function () {
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
            board.on("fullMoveEnd", function () {
                moves++;
                movesElement.innerHTML = moves.toString();
            });
            board.on("moveStart", function (block) {
                sounds.move.play();
                // if (!userInteracted) {
                //   sounds.ambiant.loop();
                //   userInteracted = true;
                // }
            });
            board.on("moveEnd", function (block) {
                if (winningPlace(block)) {
                    sounds.inPlace.play();
                    if (!wonTheGame) {
                        // sounds.ambiant.fade(0);
                        setTimeout(function () {
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
        var audioPath, assets, puzzles, params, puzzleName, puzzleFactory, puzzle_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    audioPath = window.location.origin + "/src/audio/";
                    assets = {
                        sounds: {
                            // ambiant: new CustomSound(audioPath + puzzle_theme.mp3"),
                            move: new CustomSound(audioPath + "move1.wav"),
                            // suspens: new CustomSound(audioPath + "suspens.wav"),
                            success: new CustomSound(audioPath + "success.wav"),
                            inPlace: new CustomSound(audioPath + "in_place.wav"),
                            reset: new CustomSound(audioPath + "reset.wav"),
                        },
                    };
                    _a = {};
                    return [4 /*yield*/, Promise.resolve().then(function () { return puzzle; })];
                case 1:
                    _a.getTheBallOut1 = _b.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return puzzle$1; })];
                case 2:
                    _a.getTheBallOut4 = _b.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return puzzle$2; })];
                case 3:
                    puzzles = (_a.royalEscape = _b.sent(),
                        _a);
                    params = new URLSearchParams(window.location.search);
                    puzzleName = params.get("puzzle");
                    // if (puzzles.includes(puzzleName)) {
                    if (puzzleName in puzzles) {
                        puzzleFactory = puzzles[puzzleName];
                        puzzle_1 = puzzleFactory.makePuzzle();
                        if (puzzle_1 && puzzle_1.background) {
                            onImageLoad(puzzle_1.background, function () {
                                var renderer = setupRenderer(puzzle_1);
                                setupGameLogic({
                                    sounds: assets.sounds,
                                    board: puzzle_1.board,
                                    winningPlace: puzzle_1.winningPlace,
                                    renderer: renderer,
                                });
                            });
                        }
                    }
                    else {
                        document.querySelector("#container").innerHTML = makePuzzleList(puzzles);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", main);

var makePuzzle = function () {
    var gtbo1 = window.location.origin + "/src/puzzles/getTheBallOut1/images/";
    var gtbo4 = window.location.origin + "/src/puzzles/getTheBallOut4/images/";
    var images = {
        blue: makeImage(gtbo4 + "blue.jpg"),
        green: makeImage(gtbo4 + "green.jpg"),
        ball: makeImage(gtbo4 + "ball.png"),
        yellow: makeImage(gtbo4 + "yellow.jpg"),
        purple: makeImage(gtbo4 + "purple.jpg"),
        board: makeImage(gtbo1 + "board.jpg"),
    };
    var blueSettings = {
        shape: [[1, 1]],
        image: images.blue,
    };
    var greenSettings = {
        shape: [[1], [1]],
        image: images.green,
    };
    var purpleSettings = {
        shape: [[1]],
        image: images.purple,
    };
    var yellowSettings = {
        shape: [
            [1, 1],
            [1, 1],
        ],
        image: images.yellow,
    };
    function makeBlock(x, y, settings) {
        return new Block({
            x: x,
            y: y,
            shape: settings.shape,
            image: settings.image,
        });
    }
    var ball = new Block({
        x: 2,
        y: 0,
        shape: [[1]],
        image: images.ball,
        name: "ball",
    });
    var blocks = [
        makeBlock(0, 1, greenSettings),
        makeBlock(1, 1, yellowSettings),
        makeBlock(2, 3, yellowSettings),
        makeBlock(3, 2, blueSettings),
        makeBlock(0, 3, blueSettings),
        makeBlock(4, 3, purpleSettings),
        makeBlock(4, 4, purpleSettings),
    ];
    var boundaries = new Block({
        x: -1,
        y: -1,
        shape: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ],
        selectable: false,
    });
    var board = new Board({
        cols: 5,
        rows: 6,
    });
    board.addBlock(boundaries);
    board.addBlock(ball);
    blocks.forEach(function (b) { return board.addBlock(b); });
    return {
        title: "Get the Ball Out! 1",
        background: images.board,
        proportions: {
            x: 64 / 256,
            y: 32 / 192,
            width: 120 / 256,
            height: 144 / 192,
        },
        board: board,
        winningPlace: function (block) {
            return block.name === "ball" && block.x === 2 && block.y === 5;
        },
    };
};

var puzzle = /*#__PURE__*/Object.freeze({
    __proto__: null,
    makePuzzle: makePuzzle
});

var makePuzzle$1 = function () {
    var path = window.location.origin + "/src/puzzles/getTheBallOut4/images/";
    var images = {
        blue: makeImage(path + "blue.jpg"),
        green: makeImage(path + "green.jpg"),
        ball: makeImage(path + "ball.png"),
        yellow: makeImage(path + "yellow.jpg"),
        purple: makeImage(path + "purple.jpg"),
        board: makeImage(path + "board.jpg"),
    };
    var blueSettings = {
        shape: [[1, 1]],
        image: images.blue,
    };
    var greenSettings = {
        shape: [[1], [1]],
        image: images.green,
    };
    var purpleSettings = {
        shape: [[1]],
        image: images.purple,
    };
    function makeBlock(x, y, settings) {
        return new Block({
            x: x,
            y: y,
            shape: settings.shape,
            image: settings.image,
        });
    }
    var ball = new Block({
        x: 0,
        y: 0,
        shape: [[1]],
        image: images.ball,
        name: "ball",
    });
    var blocks = [
        makeBlock(0, 1, blueSettings),
        makeBlock(2, 4, blueSettings),
        makeBlock(0, 2, greenSettings),
        makeBlock(3, 2, greenSettings),
        makeBlock(2, 1, purpleSettings),
        makeBlock(3, 1, purpleSettings),
        makeBlock(0, 4, purpleSettings),
        makeBlock(1, 4, purpleSettings),
        new Block({
            x: 1,
            y: 2,
            shape: [
                [1, 1],
                [1, 1],
            ],
            image: images.yellow,
        }),
    ];
    var boundaries = new Block({
        x: -1,
        y: -1,
        shape: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ],
        selectable: false,
    });
    var board = new Board({ cols: 4, rows: 6 });
    board.addBlock(boundaries);
    board.addBlock(ball);
    blocks.forEach(function (b) { return board.addBlock(b); });
    return {
        title: "Get the Ball Out! 4",
        background: images.board,
        proportions: {
            x: 320 / 1024,
            y: 127 / 768,
            width: 384 / 1024,
            height: 576 / 768,
        },
        board: board,
        winningPlace: function (block) {
            return block.name === "ball" && block.x === 3 && block.y === 5;
        },
    };
};

var puzzle$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    makePuzzle: makePuzzle$1
});

var makePuzzle$2 = function () {
    var dir = window.location.origin + "/src/puzzles/royalEscape/images/";
    var images = {
        blue: makeImage(dir + "blue.jpg"),
        green: makeImage(dir + "green.jpg"),
        red: makeImage(dir + "red.jpg"),
        purple: makeImage(dir + "purple.jpg"),
        board: makeImage(dir + "board3.jpg"),
    };
    var blueSettings = {
        shape: [[1, 1]],
        image: images.blue,
    };
    var greenSettings = {
        shape: [[1]],
        image: images.green,
    };
    function makeBlock(x, y, settings) {
        return new Block({
            x: x,
            y: y,
            shape: settings.shape,
            image: settings.image,
        });
    }
    var finishBlock = new Block({
        x: 5,
        y: 1,
        shape: [[1], [1]],
        selectable: false,
    });
    var redBlock = new Block({
        x: 0,
        y: 1,
        shape: [
            [1, 1],
            [1, 1],
        ],
        image: images.red,
        possibleOverlaps: [finishBlock],
        name: "red",
    });
    var blocks = [
        makeBlock(0, 0, blueSettings),
        makeBlock(2, 0, blueSettings),
        makeBlock(0, 3, blueSettings),
        makeBlock(2, 3, blueSettings),
        makeBlock(4, 0, greenSettings),
        makeBlock(3, 1, greenSettings),
        makeBlock(3, 2, greenSettings),
        makeBlock(4, 3, greenSettings),
        new Block({
            x: 2,
            y: 1,
            shape: [[1], [1]],
            image: images.purple,
        }),
    ];
    var boundaries = new Block({
        x: -1,
        y: -1,
        shape: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        selectable: false,
    });
    var board = new Board({
        cols: 8,
        rows: 4,
    });
    board.addBlock(boundaries);
    board.addBlock(finishBlock);
    board.addBlock(redBlock);
    blocks.forEach(function (b) { return board.addBlock(b); });
    return {
        title: "Royal Escape",
        background: images.board,
        proportions: {
            x: 16 / 256,
            y: 48 / 192,
            width: 256 / 256,
            height: 128 / 192,
        },
        board: board,
        winningPlace: function (block) { return block.name === "red" && block.x === 6; },
    };
};

var puzzle$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    makePuzzle: makePuzzle$2
});
