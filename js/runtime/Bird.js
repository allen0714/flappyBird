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
const G = 0.0006;
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
// const [BIRD_WIDTH, BIRD_HEIGHT, BIRD_PIC_WIDTH, BIRD_PIC_HEIGHT]
//   = [screenWidth / 10, screenWidth / 12, screenWidth / 2 - screenWidth / 20, screenHeight / 2 - (screenWidth * 1) / 4];
// const [BIRD_X, BIRD_Y, speed, a] = [screenWidth / 2, screenHeight / 2, 0.0003, 0.0006];
const [speed, a] = [0.0003, 0.0006];
export default class Bird extends Sprite{
  constructor() {
    super(BIRD_IMG_SRC, BIRD_WIDTH, BIRD_HEIGHT);
    if (instance) {
      return instance;
    }
    instance = this;
    this.speed = speed; //初始速度
    // this.x = BIRD_X;
    // this.y = BIRD_Y;
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
  // fly = (frameCount, x, y, play = false) => {
  //   ctx.save();
  //   ctx.translate(x, y);
  //   if (play) {
  //     ctx.rotate((Math.PI / 6) * this.speed / 0.3);
  //   }
  //   ctx.drawImage(
  //     this.img,
  //     this.birdXPistions.nextBy(frameCount),
  //     BIRD_PIC_Y_START,
  //     BIRD_WIDTH,
  //     BIRD_HEIGHT,
  //     -BIRD_WIDTH / 2,
  //     -BIRD_HEIGHT / 2 - 100,
  //     BIRD_WIDTH,
  //     BIRD_HEIGHT
  //   );
  //   ctx.restore();
  // }

  birdDown (dur) {
    this.speed = this.speed + this.a * dur;
    this.y = this.y + this.speed * dur;
  }
  // drawFlyBird () {
  //   this.ctx.save();
  //   this.ctx.translate(this.x, this.y);  //坐标移动到小鸟的中心点上
  //   this.ctx.rotate((Math.PI / 6) * this.speed / 0.3);
  //   //小鸟最大旋转30度，并随着速度实时改变角度
  //   this.ctx.drawImage(
  //     this.img,
  //     birdCutX,
  //     11,
  //     34,
  //     24,
  //     -34 / 2,
  //     -24 / 2,
  //     34,
  //     24
  //   );
  //   this.ctx.restore();
  // }
};
