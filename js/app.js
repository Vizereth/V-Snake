(() => {
    "use strict";
    class DOMRef {
        constructor() {
            this.storage = {
                board: document.querySelector(".board"),
                playButton: document.querySelector(".play-btn"),
                score: document.querySelector(".score__text"),
                food: document.querySelector(".food")
            };
        }
    }
    const domref = new DOMRef;
    const js_domref = domref;
    class PlayButton {
        constructor() {
            this.el = js_domref.storage.playButton;
        }
        enable() {
            this.el.disabled = false;
            this.el.style.visibility = "visible";
        }
        disable() {
            this.el.disabled = true;
            this.el.style.visibility = "hidden";
        }
    }
    const playButton = new PlayButton;
    const play_btn = playButton;
    class Board {
        constructor() {
            this.el = js_domref.storage.board;
            this.inner = this.el.querySelector(".board__inner");
        }
    }
    const board = new Board;
    const board_board = board;
    class Snake {
        constructor() {
            this.speed = 5;
            this.direction = null;
            this.coords = [ {
                x: 20,
                y: 10
            } ];
        }
        createNewSnake() {
            const lastPieceCoords = this.coords[this.coords.length - 1];
            let newPieceCoords;
            switch (this.direction) {
              case "up":
                newPieceCoords = {
                    x: lastPieceCoords.x,
                    y: lastPieceCoords.y + 1
                };
                break;

              case "down":
                newPieceCoords = {
                    x: lastPieceCoords.x,
                    y: lastPieceCoords.y - 1
                };
                break;

              case "left":
                newPieceCoords = {
                    x: lastPieceCoords.x + 1,
                    y: lastPieceCoords.y
                };
                break;

              case "right":
                newPieceCoords = {
                    x: lastPieceCoords.x - 1,
                    y: lastPieceCoords.y
                };
                break;

              default:
                break;
            }
            this.coords.push(newPieceCoords);
            const snakePiece = document.createElement("div");
            snakePiece.classList.add("snake");
            snakePiece.style.gridRowStart = newPieceCoords.y;
            snakePiece.style.gridColumnStart = newPieceCoords.x;
            const snakeInner = document.createElement("div");
            snakeInner.classList.add("snake__inner");
            snakePiece.appendChild(snakeInner);
            board_board.inner.appendChild(snakePiece);
        }
        updateSnakePosition() {
            const snakeBody = document.querySelectorAll(".snake");
            const snakeHead = snakeBody[0];
            for (let i = this.coords.length - 1; i >= 1; i--) if (1 === this.coords.length) break; else {
                this.coords[i] = {
                    ...this.coords[i - 1]
                };
                snakeBody[i].style.gridRowStart = this.coords[i].y;
                snakeBody[i].style.gridColumnStart = this.coords[i].x;
            }
            switch (this.direction) {
              case "up":
                this.coords[0].y = this.coords[0].y - 1;
                break;

              case "down":
                this.coords[0].y = this.coords[0].y + 1;
                break;

              case "left":
                this.coords[0].x = this.coords[0].x - 1;
                break;

              case "right":
                this.coords[0].x = this.coords[0].x + 1;
                break;

              default:
                break;
            }
            snakeHead.style.gridRowStart = this.coords[0].y;
            snakeHead.style.gridColumnStart = this.coords[0].x;
        }
        checkCollisionWithSelf() {
            if (1 === this.coords.length) return;
            for (let i = 1; i < this.coords.length; i++) if (Math.abs(this.coords[i].x - this.coords[0].x) < 1 && this.coords[i].y - this.coords[0].y === 0 || Math.abs(this.coords[i].y - this.coords[0].y) < 1 && this.coords[i].x - this.coords[0].x === 0) return true;
        }
        checkCollisionWithWall() {
            const snakeHeadX = this.coords[0].x;
            const snakeHeadY = this.coords[0].y;
            if (snakeHeadX >= 40 || snakeHeadX <= 0 || snakeHeadY >= 20 || snakeHeadY <= 0) return true;
        }
        removeSnake() {
            const intervalMultiplier = 250;
            const snake = document.querySelectorAll(".snake");
            const arrayEnd = snake.length - 1;
            snake.forEach(((item, index) => {
                if (0 === index) return;
                setTimeout((() => board_board.inner.removeChild(item)), (arrayEnd - index) * intervalMultiplier);
            }));
            this.direction = null;
            this.coords = [ {
                x: 20,
                y: 10
            } ];
        }
    }
    const snake = new Snake;
    const snake_snake = snake;
    class Score {
        constructor() {
            this.el = js_domref.storage.score;
            this.scoreText = "Score:";
            this.scoreCount = 0;
        }
        inc() {
            this.scoreCount += 10;
        }
        update() {
            this.el.textContent = `${this.scoreText} ${this.scoreCount}`;
        }
        reset() {
            this.scoreCount = 0;
            this.update();
        }
    }
    const score = new Score;
    const score_score = score;
    const getRandomNumber = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };
    const helpers = getRandomNumber;
    class Food {
        constructor() {
            this.x = null;
            this.y = null;
            this.el = js_domref.storage.food;
        }
        getNewCoords() {
            let newX = 0;
            let newY = 0;
            do {
                newX = helpers(3, 35);
                newY = helpers(3, 15);
            } while (this.checkFoodCoords(this.x, this.y));
            this.x = newX;
            this.y = newY;
            if (null === this.el) {
                this.createFood();
                return;
            }
            this.hideFood();
            setTimeout((() => this.changeCoords()), 1e3);
        }
        changeCoords() {
            this.el.style.gridRowStart = this.y;
            this.el.style.gridColumnStart = this.x;
            this.showFood();
        }
        checkFoodCoords(x, y) {
            snake_snake.coords.forEach((item => {
                if (x === item.x && y === item.y) return true;
            }));
        }
        checkCollisionWithSnake() {
            const snakeHeadX = snake_snake.coords[0].x;
            const snakeHeadY = snake_snake.coords[0].y;
            if (Math.abs(this.x - snakeHeadX) < 1 && 0 === Math.abs(this.y - snakeHeadY) || Math.abs(this.y - snakeHeadY) < 1 && 0 === Math.abs(this.x - snakeHeadX)) {
                score_score.inc();
                score_score.update();
                this.getNewCoords();
                snake_snake.createNewSnake();
            }
        }
        showFood() {
            this.el.style.visibility = "visible";
        }
        hideFood() {
            this.el.style.visibility = "hidden";
        }
    }
    const food = new Food;
    const food_food = food;
    const music = new Audio;
    music.loop = true;
    music.src = "./files/music.mp3";
    const sound = music;
    class Game {
        constructor() {
            this.lastRenderTime = 0;
        }
        startGame() {
            sound.play();
            play_btn.disable();
            food_food.getNewCoords();
            playGame();
        }
        endGame() {
            sound.pause();
            sound.currentTime = 0;
            this.lastRenderTime = 0;
            play_btn.enable();
            food_food.hideFood();
            snake_snake.removeSnake();
            score_score.reset();
        }
    }
    function playGame(currentTime) {
        if (snake_snake.checkCollisionWithSelf() || snake_snake.checkCollisionWithWall()) {
            game.endGame();
            return;
        }
        window.requestAnimationFrame(playGame);
        const secondsSinceLastRender = (currentTime - game.lastRenderTime) / 1e3;
        if (secondsSinceLastRender < 1 / snake_snake.speed) return;
        game.lastRenderTime = currentTime;
        snake_snake.updateSnakePosition();
        food_food.checkCollisionWithSnake();
    }
    const game = new Game;
    const game_game = game;
    const pressKey = e => {
        switch (e.keyCode) {
          case 38:
            if ("down" !== snake_snake.direction) snake_snake.direction = "up";
            break;

          case 40:
            if ("up" !== snake_snake.direction) snake_snake.direction = "down";
            break;

          case 37:
            if ("right" !== snake_snake.direction) snake_snake.direction = "left";
            break;

          case 39:
            if ("left" !== snake_snake.direction) snake_snake.direction = "right";
            break;

          default:
            break;
        }
    };
    const controller = pressKey;
    const initPlayButton = () => {
        play_btn.el.addEventListener("click", (() => game_game.startGame()));
    };
    const init = () => {
        initPlayButton();
        window.addEventListener("keydown", controller);
    };
    window.addEventListener("DOMContentLoaded", init);
})();