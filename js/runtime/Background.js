import BgPic from './BgPic';
import Land from './Land';
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const BG_IMG_SRC = 'images/bg_day.png';//绝对路径
const [ BG_WIDTH, BG_HEIGHT, BG_MOVE_STEP ] = [288,512, 0.5];

let instance = null;

export default class Background {
  constructor() {
    console.info('屏宽：',screenWidth,'屏高:', screenHeight);
    if(instance) {
      return instance;
    }
    instance = this;
    this.bgPic = new BgPic();
    this.land = new Land();
  }

  render = () => {
    this.bgPic.render();
    this.land.render();
  }
}
