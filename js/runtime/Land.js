import Sprite from '../base/Sprite';

let instance = null;
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const BG_IMG_SRC = 'images/land.png';//绝对路径
const [BG_WIDTH, BG_HEIGHT, BG_PIC_HEIGHT, BG_MOVE_STEP] = [336, 112, screenHeight-112, 50];

export default class Land extends Sprite {
  constructor(ctx) {
    if (instance) {
      return instance;
    }
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT);
    instance = this;
    this.left = screenWidth;
    this.ctx = ctx;
    this.render(ctx);
  }

  update() {
    this.left -= BG_MOVE_STEP;
    if (this.left < 0) {
      this.left = screenWidth;
    }
  }

  render() {
    /**
    * 通过绘制两张图片模拟动画效果
    */
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,

      this.left - screenWidth,
      BG_PIC_HEIGHT,
      screenWidth,
      BG_HEIGHT
    );

    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.left,
      BG_PIC_HEIGHT,
      screenWidth,
      BG_HEIGHT
    );
  }
}
