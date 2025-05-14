class Game {
  constructor(context) {
    this.context = context;
  }
}

const canvas = document.querySelector("canvas");

const context = canvas?.getContext("2d");

const game = new Game(context);
