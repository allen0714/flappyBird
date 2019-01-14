// import Sprite from '../base/Sprite.js';
import setting from '../../setting.js';

const pipeInfo = setting["pipe"];
console.info(pipeInfo)
const [height_low,height_high] = pipeInfo["randomHeightRange"];
const [center_low,center_high] = pipeInfo["centerRange"];
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;

const PIPE_DOWN = new Image();
PIPE_DOWN.src = 'images/pipe_down_long.png';
const PIPE_UP = new Image();
PIPE_UP.src = 'images/pipe_up_long.png';
const [PIPE_WIDTH, PIPE_HEIGHT, PIPE_MOVE_STEP, PIPE_LENGTH] = [52, screenHeight*0.8, 2, 460];

const ctx = canvas.getContext('2d');

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export default class Pipe {
  constructor() {
    this.pipeDownHeight = getRandomIntInclusive(50,250); //上管的随机高度
    this.gap = 130;
    this.left = screenWidth; // 管子最开始在屏幕右侧
  }
  update() {
    this.left -= PIPE_MOVE_STEP;
    if (this.left < -PIPE_WIDTH) {
      this.left = screenWidth;
      this.pipeDownHeight = getRandomIntInclusive(50, 250); //上管的随机高度
    }
  }
  render() {
    ctx.drawImage(
      PIPE_DOWN,
      0, PIPE_LENGTH - this.pipeDownHeight,
      PIPE_WIDTH,
      this.pipeDownHeight,
      this.left,
      0,
      PIPE_WIDTH,
      this.pipeDownHeight,
    );
    ctx.drawImage(
      PIPE_UP,
      0, 0,
      PIPE_WIDTH,
      PIPE_HEIGHT - this.gap - this.pipeDownHeight,
      this.left,
      this.pipeDownHeight + this.gap,
      PIPE_WIDTH,
      PIPE_HEIGHT - this.gap - this.pipeDownHeight,
    );
  }
};
