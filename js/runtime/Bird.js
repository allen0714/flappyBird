import Sprite from '../base/Sprite';

let instance = null;
let birdCount = 0;
let birdCutX = -8;
let BIRD_IMG_SRC = 'images/birds.png';
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const [BIRD_WIDTH, BIRD_HEIGHT, BIRD_PIC_WIDTH, BIRD_PIC_HEIGHT] = [screenWidth / 10, screenWidth / 12, screenWidth / 2 - screenWidth / 20, screenHeight / 2 - (screenWidth * 1) / 4];
let bird = new Image();
export default class Bird extends Sprite{
  constructor(ctx) {
    if (instance) {
      return instance;
    }
    super(BIRD_IMG_SRC, BIRD_WIDTH, BIRD_HEIGHT);
    instance = this;
    this.ctx = ctx;
    this.render(ctx);
  }
  update (frame) {
    if (frame % 8 === 0) {
      birdCount++;
      if (birdCount > 2) {
        birdCount = 0;
      }
    }
    if (birdCount === 0) {
      birdCutX = 8;
    } else if (birdCount === 1) {
      birdCutX = 60;
    } else {
      birdCutX = 113;
    }
  }
  render () {
    this.ctx.drawImage(
      this.img,
      birdCutX,
      11,
      34,
      24,
      BIRD_PIC_WIDTH,
      BIRD_PIC_HEIGHT,
      BIRD_WIDTH,
      BIRD_HEIGHT
    );
  }
};