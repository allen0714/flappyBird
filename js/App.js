import DataBus from './DataBus';
import Background  from './runtime/Background.js';
import Bird from './runtime/Bird.js';
import Intro from './routes/Intro';
import Menu from './routes/Menu';
import Rank from './routes/Rank';
import Play from './routes/Play';

const ctx = canvas.getContext('2d');

const getRoute = (phase) => {
  switch(phase) {
    case 'MENU': 
      return new Menu();
    case 'INTRO':
      return new Intro();
    case 'RANK':
      return new Rank();
    case 'PLAY':
      return new Play();
    default:
      throw new Error('unknown router of phase:' + phase);
  }
} 


export default class App {
  constructor() {
    this.dataBus = new DataBus();
  }

  start() {
    this.loop();
  }

  render() {
    const { phase } = this.dataBus;
    const route = getRoute(phase);
    if (route.render) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      route.render();
    } else {
      throw new Error(`组件${phase}没有定义render方法`);
    }
  }

  loop = () => {
    this.dataBus.runFrame();
    this.render();
    this.startNextAnimation();
  }

  startNextAnimation() {
    this.dataBus.aniId = window.requestAnimationFrame(this.loop);
  }

}

