import Bird from '../runtime/Bird';
import DataBus from '../DataBus';
import Tutorial from '../runtime/Introduction';
import BackGround from '../runtime/Background';
import Route from '../base/Route';
import EventUtil from '../base/EventUtil';


let instance;
const dataBus = new DataBus();
const bird = new Bird();
export default class Intro extends Route {

  constructor() {
    super();
    if (instance) {
      return instance;
    }
    instance = this;
    this.bird = new Bird();
    this.backGround = new BackGround();
    this.tutorial = new Tutorial();
  }
  // onTouchScreen
  render() {
    this.backGround.render();
    this.tutorial.render();
    this.bird.wave(8);
  }
  onTouchinitEvent() {
    EventUtil.addTouchHandler(()=> true)(() => {
      dataBus.goToPlay();
    });
  }
}
