//import Bird from '../runtime/Bird.js';
import BackGround from '../runtime/Background.js';
let instance = null;

export default class Play {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.backGround = new BackGround();    
    //this.bird = new Bird();
  }
  render() {
    this.backGround.render();    
  }
}