//import Bird from '../runtime/Bird.js';
import Bird from '../runtime/Bird';
import DataBus from '../DataBus';
import BackGround from '../runtime/Background';

let instance = null;
const dataBus = new DataBus();
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const [BIRD_X, BIRD_Y] = [screenWidth / 3, screenHeight / 2];

export default class Play {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.x = BIRD_X;
    this.y = BIRD_Y;
    this.backGround = new BackGround();
    this.bird = new Bird();
  }
  render() {
    this.backGround.render();
    this.bird.wave(8, this.x, this.y);
  }
}