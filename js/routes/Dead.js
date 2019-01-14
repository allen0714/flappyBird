import Bird from '../runtime/Bird';
import DataBus from '../DataBus';
import BackGround from '../runtime/Background';
import Route from '../base/Route';
import EventUtil from '../base/EventUtil';

let instance = null;
const backGround = new BackGround();
const bird = new Bird();
const dataBus = new DataBus();
const instanceSpeed = -0.3;
const isPlay = true;

export default class Dead extends Route {
  constructor() {
    super();
    if (instance) {
      return instance;
    }
    instance = this;
    this.lastFrameTime = Date.now();
  }
  render() {
    const now = Date.now();
    const interval = now - this.lastFrameTime;//两帧之间的时间
    this.lastFrameTime = now;
    backGround.render();
    // bird.wave(8, isPlay);
    bird.speed = 0;
    bird.down(interval);
    // if (bird.isCollision()) {
    //   dataBus.goToDead();
    // }
  }
}