var SlidingPuzzle;
(function (SlidingPuzzle) {
    class Block {
        constructor({ shape = [[1]], x = 0, y = 0, possibleMoves = SlidingPuzzle.Direction.all(), possibleOverlaps = [], selectable = true, color = null, image = null, tag = null, } = {}) {
            this.shape = [[1]];
            this.cols = 0;
            this.rows = 0;
            this.shape = shape;
            this.cols = this.shape.reduce((acc, curr) => Math.max(acc, curr.length), 0);
            this.rows = this.shape.length;
            this.x = x;
            this.y = y;
            this.possibleMoves = possibleMoves;
            this.possibleOverlaps = possibleOverlaps;
            this.selectable = selectable;
            this.color = color;
            this.tag = tag;
            if (image) {
                if (typeof image === "string") {
                    this.imageElement = Block.urlToImage(image);
                    this.imagePath = image;
                }
                else if (image instanceof HTMLImageElement) {
                    this.imageElement = image;
                    this.imagePath = this.imageElement.src;
                }
                else if (image.canvas) {
                    const url = image.canvas.toDataURL();
                    this.imageElement = Block.urlToImage(url);
                    this.imageElement.width = image.canvas.width;
                    this.imageElement.height = image.canvas.height;
                    this.imagePath = this.imageElement.src;
                }
            }
        }
        static urlToImage(url) {
            const image = new Image();
            image.onerror = () => {
                throw new Error(`Error on image "${url}".`);
            };
            image.src = url;
            return image;
        }
        *shapeCoords() {
            for (let y = 0; y < this.shape.length; y++) {
                for (let x = 0; x < this.shape[y].length; x++) {
                    if (this.shape[y][x] === 1) {
                        yield [this.x + x, this.y + y];
                    }
                }
            }
        }
        containsCoord(x, y) {
            for (let [bx, by] of this.shapeCoords()) {
                if (x === bx && y === by) {
                    return true;
                }
            }
            return false;
        }
        move(direction) {
            this.x += direction.dx;
            this.y += direction.dy;
        }
        setPosition(x, y) {
            this.x = x;
            this.y = y;
        }
        cannotOverlapWith(other) {
            return !this.possibleOverlaps.includes(other);
        }
        overlapsWith(other, dx = 0, dy = 0) {
            for (let [x, y] of this.shapeCoords()) {
                for (let [ox, oy] of other.shapeCoords()) {
                    if (x === ox + dx && y === oy + dy) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
    SlidingPuzzle.Block = Block;
})(SlidingPuzzle || (SlidingPuzzle = {}));
var SlidingPuzzle;
(function (SlidingPuzzle) {
    class Board {
        constructor({ cols = 6, rows = 6, animate = true, animationDuration = 60, color = null, image = null, } = {}) {
            this.cols = cols;
            this.rows = rows;
            this.blocks = [];
            this.selectedBlock = null;
            this.pressedPoint = null;
            this.animate = animate;
            this.animationDuration = animationDuration;
            this.animationRunning = false;
            this.color = color;
            if (typeof image === "string") {
                this.imageElement = document.createElement("img");
                this.imageElement.src = image;
            }
            else if (image instanceof HTMLImageElement) {
                this.imageElement = image;
            }
            this.callbacks = {
                move: [],
                continuousMove: [],
                animation: [],
            };
            this.savedPositions = null;
        }
        savePositions() {
            this.savedPositions = new Map();
            for (let block of this.blocks) {
                this.savedPositions.set(block, { x: block.x, y: block.y });
            }
        }
        restorePositions() {
            for (let block of this.blocks) {
                const { x, y } = this.savedPositions.get(block);
                block.setPosition(x, y);
            }
        }
        addBlock(block) {
            this.blocks.push(block);
        }
        findBlocksByTag(tag) {
            return this.blocks.filter((b) => b.tag === tag);
        }
        on(event, callback) {
            if (this.callbacks[event] === undefined) {
                console.warn(`'${event}' is not an event of the Board class. ` +
                    `Valid events are ${Object.keys(this.callbacks).join(", ")}.`);
                return;
            }
            this.callbacks[event].push(callback);
        }
        fireEvent(event, block) {
            this.callbacks[event].forEach((cb) => cb(block));
        }
        blockAtCoord(x, y) {
            for (let block of this.blocks) {
                if (block.selectable && block.containsCoord(x, y)) {
                    return block;
                }
            }
            return null;
        }
        // Mouse pressed on a block : select this block
        // Mouse dragged to another point : this point is the target that the selected block must follow, one step by one, each step taking the same amount of time.
        // Reference for the animation of the movements : https://www.youtube.com/watch?v=aJzu2rblcYg&ab_channel=GameLoc
        mousePressed(x, y) {
            x = Math.floor(x);
            y = Math.floor(y);
            this.pressedPoint = { x, y };
            const block = this.blockAtCoord(x, y);
            if (block) {
                this.selectedBlock = block;
            }
            this.movesSincePressed = 0;
        }
        mouseDragged(x, y) {
            if (!this.pressedPoint || !this.selectedBlock) {
                return;
            }
            x = Math.floor(x);
            y = Math.floor(y);
            const draggedX = x - this.pressedPoint.x;
            const draggedY = y - this.pressedPoint.y;
            const diffX = Math.round(draggedX);
            const diffY = Math.round(draggedY);
            if (diffX === 0 && diffY === 0) {
                return;
            }
            // Choosing between a horizontal or vertical move, constrained to 1 unit
            let dx = 0;
            let dy = 0;
            if (Math.abs(draggedX) > Math.abs(draggedY)) {
                dx = SlidingPuzzle.Utils.constrain(diffX, -1, 1);
            }
            else {
                dy = SlidingPuzzle.Utils.constrain(diffY, -1, 1);
            }
            let direction = SlidingPuzzle.Direction.from(dx, dy);
            if (direction !== null) {
                if (this.tryMoveSelectedBlock(direction)) {
                    // if I move the selected block by (dx, 0) or (dy, 0), I must
                    // move 'this.pressedPoint' towards the same direction
                    this.pressedPoint.x += dx;
                    this.pressedPoint.y += dy;
                }
            }
            else {
                console.warn("direction is null (should't be)");
            }
        }
        mouseReleased() {
            if (this.selectedBlock !== null) {
                if (this.movesSincePressed > 0 || this.animationRunning) {
                    this.fireEvent("continuousMove", this.selectedBlock);
                }
                this.selectedBlock = null;
            }
        }
        tryMoveSelectedBlock(direction) {
            if (this.animationRunning || !this.selectedBlock) {
                return false;
            }
            // Checking if direction if allowed for this block
            if (!this.selectedBlock.possibleMoves.includes(direction)) {
                return false;
            }
            // Checking if move is valid
            const { dx, dy } = direction;
            for (let other of this.blocks) {
                if (other !== this.selectedBlock &&
                    other.overlapsWith(this.selectedBlock, dx, dy) &&
                    this.selectedBlock.cannotOverlapWith(other)) {
                    return false;
                }
            }
            if (this.animate) {
                // With animation
                const { x, y } = this.selectedBlock;
                const animatedBlock = this.selectedBlock;
                this.animationRunning = true;
                SlidingPuzzle.Utils.runAnimation({
                    duration: this.animationDuration,
                    onFrame: (progress) => {
                        animatedBlock.x = SlidingPuzzle.Utils.lerp(x, x + dx, progress);
                        animatedBlock.y = SlidingPuzzle.Utils.lerp(y, y + dy, progress);
                        this.callbacks.animation.forEach((cb) => cb(animatedBlock));
                    },
                    onEnd: () => {
                        this.animationRunning = false;
                        this.movesSincePressed += 1;
                        this.fireEvent("move", animatedBlock);
                    },
                });
            }
            else {
                // Without animation
                this.selectedBlock.move(direction);
                this.movesSincePressed += 1;
                this.fireEvent("move", this.selectedBlock);
            }
            return true;
        }
    }
    SlidingPuzzle.Board = Board;
})(SlidingPuzzle || (SlidingPuzzle = {}));
var SlidingPuzzle;
(function (SlidingPuzzle) {
    class CanvasRenderer {
        constructor({ board, canvas, dimension, }) {
            this.board = board;
            if (!canvas && !dimension) {
                throw new Error("You may pass a 'canvas' or a 'dimension' or both as parameters.");
            }
            if (!canvas) {
                this.canvas = document.createElement("canvas");
            }
            else if (canvas.elt && canvas.elt.classList.contains("p5Canvas")) {
                this.canvas = canvas.elt;
            }
            else if (canvas instanceof HTMLCanvasElement) {
                this.canvas = canvas;
            }
            else {
                throw new TypeError("'canvas' parameter should be an HTMLCanvasElement or a p5 canvas.");
            }
            if (!dimension) {
                this.canvas.width = dimension.width;
                this.canvas.height = dimension.height;
            }
            this.unit = this.canvas.width / this.board.cols;
            this.ctx = this.canvas.getContext("2d");
        }
        get width() {
            return this.canvas.width;
        }
        get height() {
            return this.canvas.height;
        }
        render() {
            if (this.board.imageElement) {
                this.ctx.drawImage(this.board.imageElement, 0, 0, this.board.cols * this.unit, this.board.rows * this.unit);
            }
            else {
                this.ctx.clearRect(0, 0, this.width, this.height);
            }
            if (this.board.color !== null) {
                this.ctx.fillStyle = this.board.color;
                this.ctx.fillRect(0, 0, this.width, this.height);
            }
            for (let block of this.board.blocks) {
                this.renderBlock(block);
            }
        }
        renderBlock(block) {
            const unit = this.unit;
            if (block.color !== null) {
                const inside = unit * 0.8;
                for (let [x, y] of block.shapeCoords()) {
                    this.ctx.fillStyle = block.color;
                    this.ctx.fillRect(x * unit, y * unit, unit, unit);
                    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
                    this.ctx.fillRect(x * unit + inside, y * unit + inside, unit - 2 * inside, unit - 2 * inside);
                }
                if (block.selectable) {
                    // Contour of block
                    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
                    this.ctx.lineWidth = unit * 0.04;
                    this.ctx.strokeRect(block.x * unit, block.y * unit, block.cols * unit, block.rows * unit);
                }
            }
            if (block.imageElement != null) {
                this.ctx.drawImage(block.imageElement, block.x * unit, block.y * unit, block.cols * unit, block.rows * unit);
            }
        }
    }
    SlidingPuzzle.CanvasRenderer = CanvasRenderer;
})(SlidingPuzzle || (SlidingPuzzle = {}));
var SlidingPuzzle;
(function (SlidingPuzzle) {
    class Direction {
        constructor(dx, dy) {
            this.dx = dx;
            this.dy = dy;
        }
        static all() {
            return [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
        }
        static vertical() {
            return [Direction.UP, Direction.DOWN];
        }
        static horizontal() {
            return [Direction.LEFT, Direction.RIGHT];
        }
        static none() {
            return [];
        }
        static from(dx, dy) {
            for (let dir of this.all()) {
                if (dir.dx === dx && dir.dy === dy) {
                    return dir;
                }
            }
            return null;
        }
    }
    Direction.UP = new Direction(0, -1);
    Direction.DOWN = new Direction(0, 1);
    Direction.LEFT = new Direction(-1, 0);
    Direction.RIGHT = new Direction(1, 0);
    SlidingPuzzle.Direction = Direction;
})(SlidingPuzzle || (SlidingPuzzle = {}));
var SlidingPuzzle;
(function (SlidingPuzzle) {
    class HTMLRenderer {
        constructor({ board, parentElement, proportions, backgroundImage, }) {
            this.board = board;
            this.proportions = proportions;
            this.parentElement = parentElement;
            // Background
            this.backgroundDiv = document.createElement("div");
            this.parentElement.style.display = "grid";
            this.parentElement.appendChild(this.backgroundDiv);
            const resize = () => {
                const bounds = this.parentElement.getBoundingClientRect();
                const bgRatio = backgroundImage.width / backgroundImage.height;
                const boundsRatio = bounds.width / bounds.height;
                let w = 1, h = 1;
                if (boundsRatio > bgRatio) {
                    w = bgRatio / boundsRatio;
                }
                else {
                    h = boundsRatio / bgRatio;
                }
                this.backgroundDiv.style.width = w * 100 + "%";
                this.backgroundDiv.style.height = h * 100 + "%";
            };
            resize();
            const observer = new ResizeObserver(resize);
            observer.observe(this.parentElement);
            this.backgroundDiv.style.position = "relative";
            this.backgroundDiv.style.margin = "auto";
            this.backgroundDiv.id = "background";
            if (board.color) {
                this.backgroundDiv.style.backgroundColor = board.color;
            }
            if (backgroundImage) {
                this._applyBackground(this.backgroundDiv, backgroundImage.src);
            }
            // Puzzle
            this.boardDiv = document.createElement("div");
            this.boardDiv.style.position = "absolute";
            this._applyProportions(this.boardDiv, proportions);
            this.boardDiv.id = "board";
            this.backgroundDiv.appendChild(this.boardDiv);
            // Blocks
            this.blockDivs = new Map(); // Map<Block, Element>
            for (let block of board.blocks) {
                const div = document.createElement("div");
                this.blockDivs.set(block, div);
                div.classList.add("block");
                div.style.position = "absolute";
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
                this.boardDiv.appendChild(div);
            }
            this.mouseIsPressed = false;
        }
        _applyProportions(element, proportions) {
            element.style.width = proportions.width * 100 + "%";
            element.style.height = proportions.height * 100 + "%";
            element.style.left = proportions.x * 100 + "%";
            element.style.top = proportions.y * 100 + "%";
        }
        _applyBackground(element, imageSource) {
            element.style.backgroundImage = `url("${imageSource}")`;
            element.style.backgroundSize = "contain";
            element.style.backgroundRepeat = "no-repeat";
        }
        _callbackMouseCoord(event) {
            const rect = this.boardDiv.getBoundingClientRect();
            let pos;
            if (event instanceof MouseEvent) {
                pos = { x: event.clientX, y: event.clientY };
            }
            else {
                pos = { x: event.touches[0].pageX, y: event.touches[0].pageY };
            }
            const x = ((pos.x - rect.left) / rect.width) * this.board.cols; // [0..cols]
            const y = ((pos.y - rect.top) / rect.height) * this.board.rows; // [0..rows]
            return { x, y };
        }
        onMousePressed(callback) {
            const handler = (e) => {
                e.preventDefault();
                this.mouseIsPressed = true;
                const { x, y } = this._callbackMouseCoord(e);
                callback(x, y);
            };
            this.boardDiv.addEventListener("mousedown", handler);
            this.boardDiv.addEventListener("touchstart", handler);
        }
        onMouseDragged(callback) {
            const handler = (e) => {
                e.preventDefault();
                if (this.mouseIsPressed) {
                    const { x, y } = this._callbackMouseCoord(e);
                    callback(x, y);
                }
            };
            this.boardDiv.addEventListener("mousemove", handler);
            this.boardDiv.addEventListener("touchmove", handler);
        }
        onMouseReleased(callback) {
            const handler = (e) => {
                e.preventDefault();
                callback();
                this.mouseIsPressed = false;
            };
            this.boardDiv.addEventListener("mouseup", (e) => handler(e));
            this.boardDiv.addEventListener("touchend", (e) => handler(e));
        }
        render(block = null) {
            if (block) {
                const div = this.blockDivs.get(block);
                div.style.left = (block.x / this.board.cols) * 100 + "%";
                div.style.top = (block.y / this.board.rows) * 100 + "%";
            }
            else {
                for (let block of this.board.blocks) {
                    this.render(block);
                }
            }
        }
    }
    SlidingPuzzle.HTMLRenderer = HTMLRenderer;
})(SlidingPuzzle || (SlidingPuzzle = {}));
var SlidingPuzzle;
(function (SlidingPuzzle) {
    var Utils;
    (function (Utils) {
        function constrain(value, min, max) {
            return value < min ? min : value > max ? max : value;
        }
        Utils.constrain = constrain;
        function lerp(start, stop, amount) {
            return amount * (stop - start) + start;
        }
        Utils.lerp = lerp;
        function fitInBounds(board, bounds) {
            const unit = Math.floor(Math.min(bounds.width / board.cols, bounds.height / board.rows));
            const width = board.cols * unit;
            const height = board.rows * unit;
            return { width, height };
        }
        Utils.fitInBounds = fitInBounds;
        function runAnimation({ duration = 100, timingFunction = (t) => t, onFrame, onEnd, } = {}) {
            // Inspired from https://javascript.info/js-animation
            let startTime;
            requestAnimationFrame(function run(currentTime) {
                if (startTime === undefined) {
                    startTime = currentTime;
                }
                const ellapsedMillis = currentTime - startTime;
                let timeFraction = ellapsedMillis / duration; // [0..1]
                if (timeFraction > 1) {
                    timeFraction = 1;
                }
                // calculate the current animation state
                const progress = timingFunction(timeFraction);
                if (onFrame) {
                    onFrame(progress);
                }
                if (timeFraction < 1) {
                    requestAnimationFrame(run);
                }
                else {
                    if (onEnd) {
                        onEnd();
                    }
                }
            });
        }
        Utils.runAnimation = runAnimation;
    })(Utils = SlidingPuzzle.Utils || (SlidingPuzzle.Utils = {}));
})(SlidingPuzzle || (SlidingPuzzle = {}));