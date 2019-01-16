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

export default class Play extends Route{
  constructor() {
    super();
    if (instance) {
      return instance;
    }
    instance = this;
    this.lastFrameTime = Date.now();
  }

  render() {
    const now =Date.now();
    const interval = now - this.lastFrameTime;//两帧之间的时间
    this.lastFrameTime = now;

    backGround.render(dataBus);
    
    // if (bird.isCollisionWith(pipe)) {
    //   dataBus.goToDead();
    // }
    dataBus.pipes.forEach((item) => {
      item.update();
    });
    this.pipeGenerate();
    this.collisionDetection();
    dataBus.pipes.forEach((item) => {
      item.render();
    });
    
    bird.wave(8, isPlay);
    bird.down(interval);
    
  }
  onTouchBirdUp() {
    EventUtil.addTouchHandler(() => true)(() => {
      bird.speed = instanceSpeed;
    });
  }
  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
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
    }
  }
}