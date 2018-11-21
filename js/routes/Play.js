//import Bird from '../runtime/Bird.js';
import BackGround from '../runtime/Background.js';
import Pipe from '../runtime/Pipe.js';
import DataBus from '../DataBus.js';

let instance = null;
const pipe = new Pipe();
const dataBus = new DataBus();
const backGround = new BackGround();    

export default class Play {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;

  }
  render() {
    backGround.render(); 
    pipe.update(); 
    pipe.render();  
  }
}