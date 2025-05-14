const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;
const GROUND_LEVEL = 300;

const OBSTACLE_SIZE = 40;
const BIRD_SIZE = 40;
const DINO_SIZE = 40;
const DINO_X = 50;

const DINO_IMAGE = new Image();
DINO_IMAGE.src = "dyno.png";

const BIRD_IMAGE = new Image();
BIRD_IMAGE.src = "bird.png";

const OBSTACLE_IMAGE = new Image();
OBSTACLE_IMAGE.src = "obstacle.png";

class Entity {
  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Dino extends Entity {
  constructor(x, y) {
    super(x, y, DINO_SIZE, DINO_SIZE, DINO_IMAGE);
    this.jumpVelocity = 0;
    this.trails = [];
  }
}

class Bird extends Entity {
  constructor(x, speed) {
    super(x, GROUND_LEVEL - DINO_SIZE, BIRD_SIZE, BIRD_SIZE, BIRD_IMAGE);
    this.speed = speed;
  }

  update() {
    this.x -= this.speed;
  }
}

class Obstacle extends Entity {
  constructor(x, speed) {
    super(x, OBSTACLE_SIZE, OBSTACLE_SIZE, OBSTACLE_SIZE, OBSTACLE_IMAGE);
    this.speed = speed;
  }

  update() {
    this.x -= this.speed;
  }
}

class Game {
  constructor(context) {
    this.context = context;
    this.dino = new Dino(DINO_X, GROUND_LEVEL);
    this.entities = [this.dino];
    this.score = 0;
    this.speed = 5;
    this.play = true;

    this.spawObstacle();
  }

  spawObstacle() {
    if (Math.random() < 0.5) {
      // @ts-ignore
      this.entities.push(new Obstacle(GAME_WIDTH, this.speed));
    } else {
      // @ts-ignore
      this.entities.push(new Bird(GAME_WIDTH, this.speed));
    }

    setTimeout(() => {
      this.spawObstacle();
    }, Math.max(500, 2000 - this.speed * 5));
  }

  update() {
    this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.context.fillStyle("blue");
    this.context.fillRect(0, GROUND_LEVEL, GAME_WIDTH, GAME_HEIGHT);
  }
}

const canvas = document.querySelector("canvas");

const context = canvas?.getContext("2d");

const game = new Game(context);

const frame = () => {
  if (game.play) {
    game.update();
    requestAnimationFrame(frame);
  }
};

requestAnimationFrame(frame);
