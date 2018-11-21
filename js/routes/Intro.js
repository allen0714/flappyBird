import Bird from '../runtime/Bird';
import DataBus from '../DataBus';
import Tutorial from '../runtime/Introduction';
import BackGround from '../runtime/Background';
import Route from '../base/Route';
import EventUtil from '../base/EventUtil';


let instance;
const dataBus = new DataBus();
const bird = new Bird();
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const [BIRD_X, BIRD_Y] = [screenWidth / 4, screenHeight / 2];
const backGround = new BackGround();
const tutorial = new Tutorial();
export default class Intro extends Route {

  constructor() {
    super();
    if (instance) {
      return instance;
    }
    instance = this;
  }

  render() {
    backGround.render();
    tutorial.render();
    bird.wave(8, BIRD_X, BIRD_Y);
  }
  onTouchScreen() {
    EventUtil.addTouchHandler(() => true)(() => {
      dataBus.goToPlay();
    });
  }
}
