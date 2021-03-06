import Bird from '../runtime/Bird';
import Pipe from '../runtime/Pipe';
import DataBus from '../DataBus';
import BackGround from '../runtime/Background';
import Route from '../base/Route';
import EventUtil from '../base/EventUtil';

let instance = null;
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const backGround = new BackGround();
const bird = new Bird();
const pipe = new Pipe();
const dataBus = new DataBus();
const instanceSpeed = -0.3;
const isPlay = true;
const ctx = canvas.getContext('2d');
const SCORE_IMG = new Image();
const NUMBER_IMG_PREFIX = 'images/score_';
const NUMBER_HEIGHT = 20;
const NUMBER_WIDTH = 16;
const NUMBER_GAP = 20;


export default class Play extends Route{
  constructor() {
    super();
    if (instance) {
      return instance;
    }
    instance = this;
    this.imgs = [];
    this.lastFrameTime = Date.now();
  }

  render() {
    const now =Date.now();
    const interval = now - this.lastFrameTime;//两帧之间的时间
    this.lastFrameTime = now;

    backGround.render(dataBus);
    
    dataBus.pipes.forEach((item) => {
      item.update();
    });
    this.pipeGenerate();
    this.collisionDetection();
    dataBus.pipes.forEach((item) => {
      item.render();
    });
    this.drawScore();
    bird.wave(8, isPlay);
    bird.down(interval);

  }
  onTouchBirdUp() {
    EventUtil.addTouchHandler(() => true)(() => {
      bird.speed = instanceSpeed;
    });
  }
  
  pipeGenerate() {
    if (dataBus.frame % 130 === 0) {
      let pipe = dataBus.pool.getItemByClass('pipe', Pipe);
      pipe.init();
      dataBus.pipes.push(pipe);
    }
  }
  // 碰撞检测
  collisionDetection() {
    for (let i = 0, il = dataBus.pipes.length; i < il; i++) {
      const pipe = dataBus.pipes[i];
      if (bird.isCollisionWith(pipe)) {
        dataBus.goToDead();
      }
      if (bird.x > pipe.left + pipe.width) {
        pipe.isPassed = true;
        if (!pipe.isPassedChange && pipe.isPassed) {
          dataBus.score ++;
          pipe.isPassedChange = true;
        }
      }
    }
  }

  drawScore() {
    this.getImg();
    const bits = this.getBit();    
    bits.forEach((item, idx) => {
      ctx.drawImage(this.imgs[idx], screenWidth / 2 + idx * NUMBER_GAP, NUMBER_GAP, NUMBER_WIDTH, NUMBER_HEIGHT)
    });
  }
  getBit() {
    return String(dataBus.score).split('');
  }
  getImg() {
    const bits = this.getBit();
    bits.forEach((item,idx) => {
      const img = new Image();
      this.imgs.push(img);
      this.imgs[idx].src = NUMBER_IMG_PREFIX + bits[idx] + '.png';
    });
  }
}