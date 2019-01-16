
import Sprite from '../base/Sprite.js';
import setting from '../../setting.js';
import DataBus from '../DataBus.js';

const pipeInfo = setting["pipe"];
const [height_low, height_high] = pipeInfo["pipeDownHeightRange"];
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const { gapFactor } = pipeInfo;


const PIPE_DOWN = new Image();
PIPE_DOWN.src = 'images/pipe_down_long.png';
const PIPE_UP = new Image();
PIPE_UP.src = 'images/pipe_up_long.png';
const [PIPE_WIDTH, PIPE_HEIGHT, PIPE_MOVE_STEP, PIPE_LENGTH] = [52, screenHeight*0.8, 2, 460];

const ctx = canvas.getContext('2d');
const dataBus = new DataBus();

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export default class Pipe {
  constructor() {
    
  }
  init() {
    this.x = screenWidth;
    this.y = 0;
    this.left = screenWidth;
    this.gap = screenHeight * gapFactor;
    this.pipeDownHeight = getRandomIntInclusive(50, 250); //上管的随机高度
    this.visible = true;
  }
  update() {
    this.left -= PIPE_MOVE_STEP;
    if (this.left < -PIPE_WIDTH) {
      dataBus.removeEnemey(this)
    }
  }

  render() {
    if (!this.visible)
      return
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
