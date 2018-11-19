import Bird from '../runtime/Bird';
import DataBus from '../DataBus';
import Tutorial from '../runtime/Introduction';
import BackGround from '../runtime/Background';
import Route from '../base/Route';
import EventUtil from '../base/EventUtil';


let instance;
const dataBus = new DataBus();
const bird = new Bird();
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
    bird.wave(8);
  }
  onTouchScreen() {
    EventUtil.addTouchHandler(() => true)(() => {
      dataBus.goToPlay();
    });
  }
}
