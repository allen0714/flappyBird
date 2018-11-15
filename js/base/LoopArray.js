export default class LoopArray extends Array {
  constructor(...rest) {
    super(...rest);
    this.position = -1;
    this.frameCount = 0;
  }
  /**
   * 每次调用都返回新的队列值
   */
  next = () => {
    const { length, position } = this;
    const nextPosition = position + 1;
    this.position = nextPosition >= length ? 0 : nextPosition;
    return this[this.position];
  }
  /**
   * 每隔 frames 帧数，返回新的队列值；否则仍返回老值
   */
  nextBy = (frames = 1) => {
    this.frameCount ++;
    if (this.frameCount >= frames) {
     this.frameCount = 0;
     return this.next();
    } else {
     return this[this.position]; 
    }
  }
}
