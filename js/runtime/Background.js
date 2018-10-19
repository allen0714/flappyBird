import Sprite from '../base/Sprite';
import BgPic from './BgPic';
import Land from './Land';
let instance = null;
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const BG_IMG_SRC = 'images/bg_day.png';//绝对路径
const [ BG_WIDTH, BG_HEIGHT, BG_MOVE_STEP ] = [288,512, 0.5];

export default class Background {
  constructor(ctx) {
    console.info('屏宽：',screenWidth,'屏高:', screenHeight);
    if(instance) {
      return instance;
    }
    instance = this;
    this.bgPic = new BgPic(ctx);
    this.land = new Land(ctx);
    this.render(ctx);
  }

  update() {
    this.bgPic.update();
    this.land.update();
  }

  render(ctx) {
    this.bgPic.render();
    this.land.render();
    //this.land.drawToCanvas(ctx);
  }
}
