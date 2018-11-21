import Bird from '../runtime/Bird';
import DataBus from '../DataBus';
import BackGround from '../runtime/Background';
import Route from '../base/Route';
import EventUtil from '../base/EventUtil';
const backGround = new BackGround();
const bird = new Bird();

let instance = null;
const dataBus = new DataBus();
const instanceSpeed = -0.3;

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
    backGround.render();
    bird.fly(8);
    bird.down(interval);
  }
  onTouchBirdUp() {
    EventUtil.addTouchHandler(() => true)(() => {
      bird.speed = instanceSpeed;
    });
  }
}