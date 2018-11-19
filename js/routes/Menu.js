import Bird from '../runtime/Bird';
import DataBus from '../DataBus';
import MenuButton from '../runtime/Menu.js';
import BackGround from '../runtime/Background';
import Route from '../base/Route';
const backGround = new BackGround();
const menuButton = new MenuButton();

let instance = null;
const dataBus = new DataBus();

export default class Menu extends Route {
  constructor() {
    super(); // 坑，小程序继承必须调用super
    if (instance) {
      return instance;
    }
    instance = this;
    this.bird = new Bird();
  }
  onTouchStart() {
    menuButton.getTouchStartFunc(() => {
      dataBus.goToIntro();
    });
  }
  onTouchRank() {
    menuButton.getTouchStartFunc(() => {
      dataBus.goToIntro();
    });
  }

  render() {
    backGround.render();
    menuButton.renderGameMenu();
    this.bird.wave(8);
  }
}

