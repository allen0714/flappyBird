let instance = null;
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
  }

}
