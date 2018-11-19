import Bird from '../runtime/Bird';
import DataBus from '../DataBus';
import MenuButton from '../runtime/MenuButton.js';
import BackGround from '../runtime/Background';

let instance = null;
const dataBus = new DataBus();
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const [BIRD_X, BIRD_Y] = [screenWidth / 2, screenHeight / 2 - 100];

export default class Menu {

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.bird = new Bird();
    this.backGround = new BackGround();
    this.menuButton = new MenuButton();
    this.onClickRank = this.menuButton.getTouchRankFunc(() => {
      dataBus.goToRank();
    });
    this.onClickStart = this.menuButton.getTouchStartFunc(()=> {
      dataBus.goToIntro();
    });
    // this.onClickRank = EventUtil.addTouchHandler(this.menuButton.checkIfHitRank)(() => {
    //   dataBus.goToRank();
    // });
  }

  render() {
    this.backGround.render();
    this.menuButton.renderGameMenu();
    this.bird.wave(8, BIRD_X, BIRD_Y);
  }
}

