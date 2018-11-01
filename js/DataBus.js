let instance = null;

const [
  MAIN,
  INTRO,
  PLAY,
  DEAD,
  OVER
] = [0,1,2,3,4]; //阶段枚举值
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
    this.isGameOver = false; //游戏是否结束
    this.score = 0; //分数
    this.aniId = 0; // 动画句柄
    this.phase = MAIN; //游戏状态， 当前所处阶段
  }

  goToMain() {
    this.phase = MAIN;
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
    this.phase =OVER;
  }

}
