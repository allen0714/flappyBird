import DataBus from './DataBus';
import Background  from './runtime/Background.js';
import Bird from './runtime/Bird.js';
import Intro from './routes/Intro';
import Menu from './routes/Menu';
import Rank from './routes/Rank';
import Play from './routes/Play';

const ctx = canvas.getContext('2d');


export default class App {
  constructor() {
    this.dataBus = new DataBus();
  }

  start() {
    this.loop();
  }

  render() {
    const { phase } = this.dataBus;
    const component =
      {
        MENU: new Menu(),
        INTRO: new Intro(),
        RANK: new Rank(),
        PLAY: new Play(),
      }[phase];
    if (component.render) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      component.render();
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

