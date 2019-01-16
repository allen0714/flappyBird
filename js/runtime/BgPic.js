import Sprite from '../base/Sprite';


let instance = null;
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const ctx = canvas.getContext('2d');
const BG_IMG_SRC = 'images/bg_day.png';//绝对路径
const [BG_DAY_SRC, BG_NIGHT_SRC] = ['images/bg_day.png', 'images/bg_night.png'];
const [
  BG_WIDTH,
  BG_HEIGHT,
  LAND_HEIGHT,//地面的高度
  DAY_DURATION,//日（夜）长：对应播放多少张白天图片，变成黑夜；反过来也用这个
  BG_MOVE_STEP
  ] = [288, 512,112, 2, 0.5];

export default class BgPic extends Sprite {
  constructor() {
    if (instance) {
      return instance;
    }
    super(BG_DAY_SRC, BG_WIDTH, BG_HEIGHT);
    instance = this;
    this.BG_MOVE_STEP = BG_MOVE_STEP;
    this.left = screenWidth;
    this.dayNightPicCount = 0;//白天（黑夜）出现的图片数计数器
    this.isDay = true; //当前是白天
  }

  render() {
    this.left -= this.BG_MOVE_STEP;
    if (this.left < 0) {
      this.left = screenWidth;
      this.dayNightPicCount ++;
      if (this.dayNightPicCount > DAY_DURATION) {
        this.isDay = !this.isDay;
        this.dayNightPicCount = 0;
        this.setImage(this.isDay ? BG_DAY_SRC : BG_NIGHT_SRC, BG_WIDTH, BG_HEIGHT);
      }
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
      0,
      screenWidth,
      screenHeight - LAND_HEIGHT
    );

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.left,
      0,
      screenWidth,
      screenHeight - LAND_HEIGHT
    );
  }
}
