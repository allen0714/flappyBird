import DataBus from './DataBus';
import Background  from './runtime/Background.js';
import Menu from './runtime/Menu.js';
import Bird from './runtime/Bird.js';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
let dataBus = null;
let bg = null;
let ctx = canvas.getContext('2d');
let isMenuDisplay = true;
let menu = null;
let flyBird = null;
let touchHandler = null;
let touchRankHandle = null;
let isTouchBegin = false;

const start = () => {
  dataBus = new DataBus();
  bg = new Background(ctx);
  menu = new Menu();
  flyBird = new Bird(ctx);
  loop();
  if (isMenuDisplay) {
    touchHandler = touchBeginEventHandler.bind(this);
    canvas.addEventListener('touchstart', touchHandler);
    touchRankHandle = touchRankEventHandler.bind(this);
    canvas.addEventListener('touchstart', touchRankHandle);
  }
};
/**
 * 开始下一次动画
 */
const startNextAnimation = () => {
  dataBus.aniId = window.requestAnimationFrame(loop, canvas);
};

/**
 * 停止动画
 */
const stopAnimation = () => {
  if (dataBus.aniId) {
    window.cancelAnimationFrame(dataBus.aniId);
  }
};

/**
 * 帧循环逻辑
 */
const loop = () => {
  dataBus.frame ++ ;
  update(dataBus.frame);
  render();
  startNextAnimation();
};

/**
 * 更新逻辑
 */
const update = (frame) => {
  bg.update();
  flyBird.update(frame);
};

/**
 * 绘制逻辑
 */
const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bg.render(ctx);
  if (isMenuDisplay) {
    flyBird.render();
    menu.renderGameMenu(ctx);
  }
};

const touchBeginEventHandler = (e) => {
  e.preventDefault()

  let x = e.touches[0].clientX
  let y = e.touches[0].clientY
  let area = menu.btnBeginArea
  if (x >= area.startX
    && x <= area.endX
    && y >= area.startY
    && y <= area.endY) {
      // 点击开始游戏后触发的事件
      console.log(1);
      isMenuDisplay = false;
      isTouchBegin = true;
      //清除点击事件
      canvas.removeEventListener('touchstart', touchHandler);
    }
}
const touchRankEventHandler = (e) => {
  e.preventDefault()

  let x = e.touches[0].clientX
  let y = e.touches[0].clientY
  let area = menu.btnRankArea
  if (x >= area.startX
    && x <= area.endX
    && y >= area.startY
    && y <= area.endY) {
    // 点击排行榜后触发的事件
    console.log(2);
    isMenuDisplay = false;
    //清除点击事件
    canvas.removeEventListener('touchstart', touchRankHandle);
  }
}

/**
 * 游戏主函数
 * @type {{start()}}
 */
const App = {
  start,
};

export default App;
