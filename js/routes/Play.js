import Bird from '../runtime/Bird';
import Pipe from '../runtime/Pipe';
import DataBus from '../DataBus';
import BackGround from '../runtime/Background';
import Route from '../base/Route';
import EventUtil from '../base/EventUtil';

let instance = null;
const backGround = new BackGround();
const bird = new Bird();
const pipe = new Pipe();
const dataBus = new DataBus();
const instanceSpeed = -0.3;
const isPlay = true;
const ctx = canvas.getContext('2d');
const SCORE_IMG = new Image();
const NUMBER_IMG_PREFIX = 'images/score_';

const scoreImg = ['images/score_00.png', 'images/score_01.png', 'images/score_02.png', 'images/score_03.png', 'images/score_04.png', 'images/score_05.png', 'images/score_06.png', 'images/score_07.png', 'images/score_08.png', 'images/score_09.png']

export default class Play extends Route{
  constructor() {
    super();
    if (instance) {
      return instance;
    }
    instance = this;
    this.bits = [];
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
    this.drawScore()
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
    this.splitBit(dataBus.score);
    this.bits.reverse();
    for (var i = 0; i < this.bits.length; i++) {
      SCORE_IMG.src = NUMBER_IMG_PREFIX + this.bits[i] + '.png';
      ctx.drawImage(SCORE_IMG, 147 + i * 23, 40)
    }
  }

  splitBit() {
    if (dataBus.score < 10) {
      this.bits.push(dataBus.score);
      return;
    }

    const bit = Math.floor(dataBus.score / 10);
    const rest = dataBus.score % 10;

    if (bit >= 10) {
      this.bits.push(rest)
      this.splitBit(bit)
    } else {
      this.splitBit(rest)
      this.bits.push(bit)
    }
  }

}