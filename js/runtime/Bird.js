import _ from 'lodash';
import Sprite from '../base/Sprite';
import LoopArray from '../base/LoopArray';
const ctx = canvas.getContext('2d');

let instance = null;
let birdCount = 0;
let birdCutX = -8;
let BIRD_IMG_SRC = 'images/birds.png';
const [
  BIRD_PIC_Y_START, //小鸟图片中，鸟在y轴的位置
  BIRD_WIDTH, //小鸟图片中，小鸟的宽度
  BIRD_HEIGHT//小鸟图片中，小鸟的高度
] = [11,34,24];
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const [BIRD_POSITION_X, BIRD_POSITION_Y, G, speed] = [screenWidth / 4, screenHeight / 2, 0.0006, 0.0003];
export default class Bird extends Sprite{
  constructor() {
    super(BIRD_IMG_SRC, BIRD_WIDTH, BIRD_HEIGHT);
    if (instance) {
      return instance;
    }
    instance = this;
    this.x = BIRD_POSITION_X;
    this.y = BIRD_POSITION_Y;
    this.speed = speed;
    this.G = G;
    this.birdXPistions = new LoopArray(8, 60, 113);//小鸟图片中，小鸟左边身体的x位置
  }

  wave = (frameCount, BIRD_X, BIRD_Y) => { //todo: fps ??
    ctx.save();
    ctx.translate(BIRD_X, BIRD_Y);
    ctx.drawImage(
      this.img,
      this.birdXPistions.nextBy(frameCount),
      BIRD_PIC_Y_START,
      BIRD_WIDTH,
      BIRD_HEIGHT,
      -BIRD_WIDTH / 2,
      -BIRD_HEIGHT / 2,
      BIRD_WIDTH,
      BIRD_HEIGHT
    );
    ctx.restore();
  }
  fly = (frameCount) => {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((Math.PI / 6) * this.speed / 0.3);
    ctx.drawImage(
      this.img,
      this.birdXPistions.nextBy(frameCount),
      BIRD_PIC_Y_START,
      BIRD_WIDTH,
      BIRD_HEIGHT,
      -BIRD_WIDTH / 2,
      -BIRD_HEIGHT / 2,
      BIRD_WIDTH,
      BIRD_HEIGHT
    );
    ctx.restore();
  };
  down = (interval) => {
    this.speed = this.speed + this.G * interval;
    this.y = this.y + this.speed * interval + 0.5 * this.G * interval * interval;
  };
};
