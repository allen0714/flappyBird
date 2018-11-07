import Sprite from '../base/Sprite';

let instance = null;
let birdCount = 0;
let birdCutX = -8;
let BIRD_IMG_SRC = 'images/birds.png';
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const [BIRD_WIDTH, BIRD_HEIGHT, BIRD_PIC_WIDTH, BIRD_PIC_HEIGHT] = [screenWidth / 10, screenWidth / 12, screenWidth / 2 - screenWidth / 20, screenHeight / 2 - (screenWidth * 1) / 4];
const [BIRD_X, BIRD_Y, speed, a] = [screenWidth / 2, screenHeight / 2, 0.0003, 0.0006];
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
    this.speed = speed; //初始速度
    this.a = a;    //加速度
    this.x = BIRD_X;
    this.y = BIRD_Y;
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
  birdDown (dur) {
    this.speed = this.speed + this.a * dur;
    this.y = this.y + this.speed * dur;
  }
  drawFlyBird () {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);  //坐标移动到小鸟的中心点上
    this.ctx.rotate((Math.PI / 6) * this.speed / 0.3);
    //小鸟最大旋转30度，并随着速度实时改变角度
    this.ctx.drawImage(
      this.img,
      birdCutX,
      11,
      34,
      24,
      -34 / 2,
      -24 / 2,
      34,
      24
    );
    this.ctx.restore();
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
