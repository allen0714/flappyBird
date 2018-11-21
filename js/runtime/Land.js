import Sprite from '../base/Sprite';

const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const BG_IMG_SRC = 'images/land_high.png';//绝对路径
const [BG_WIDTH, BG_HEIGHT, BG_PIC_HEIGHT, BG_MOVE_STEP] = [336, screenHeight * 0.2, screenHeight * 0.8, 2];
const ctx = canvas.getContext('2d');

let instance = null;

export default class Land extends Sprite {
  constructor() {
    if (instance) {
      return instance;
    }
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT);
    instance = this;
    this.left = screenWidth;
    this.render();
  }

  render() {
    this.left -= BG_MOVE_STEP;
    if (this.left < 0) {
      this.left = screenWidth;
    }
    /**
    * 通过绘制两张图片模拟动画效果
    */
    ctx.drawImage(
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

    ctx.drawImage(
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
