import Pool from './base/Pool.js';

let instance = null;
const [
  MENU,
  INTRO,
  PLAY,
  DEAD,
  OVER,
  RANK
] = ['MENU', 'INTRO', 'PLAY', 'DEAD', 'OVER', 'RANK']; //阶段枚举值
/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.frame = 0; //帧
    this.score = 0; //分数
    this.aniId = 0; // 动画句柄
    this.phase = MENU; //游戏状态， 当前所处阶段
    // 缓存对象池
    this.pool = new Pool();
    this.pipes = [];
  }

  runFrame () {
    this.frame ++;
  }

  goToMenu() {
    this.phase = MENU;
  }

  goToIntro() {
    this.phase = INTRO;
  }

  goToPlay() {
    this.phase = PLAY;
  }

  goToDead() {
    this.phase = DEAD;
  }

  goToOver() {
    this.phase = OVER;
  }
  goToRank() {
    this.phase = RANK;
  }


  intervalCall = (callback, frames = 1) => {
    if (this.frame % frames === 0 ) {
      callback();
    }
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(Pipe) {
    let temp = this.pipes.shift()

    temp.visible = false

    this.pool.recover('pipe', Pipe)
  }

}
