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
const isPlay = false;// 小鸟是否在游戏飞行中
const isDead = true;// 小鸟是否死亡

export default class Dead extends Route {
  constructor() {
    super();
    if (instance) {
      return instance;
    }
    instance = this;
    this.speed = 0;
    this.lastFrameTime = Date.now();
  }
  render() {
    const now = Date.now();
    const interval = now - this.lastFrameTime;// 两帧之间的时间
    this.lastFrameTime = now;
    backGround.setMoveStep();// 碰撞后背景和地面停止移动
    backGround.render();
    bird.wave(32, isPlay, isDead);// 碰撞后翅膀煽动频率变慢
    bird.down(interval);
    if (bird.isCollisionWithGround()) {// 碰撞后下落，直至落到地面
      bird.y = window.innerHeight * 0.8 - bird.width / 2;
      bird.speed = 0;
    }
  }
}