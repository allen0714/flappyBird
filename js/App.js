import DataBus from './DataBus';
import Background  from './runtime/Background.js';
import Menu from './runtime/Menu.js';
import Bird from './runtime/Bird.js';

let dataBus = null;
let bg = null;
let ctx = canvas.getContext('2d');
let menu = null;
let flyBird = null;
let touchHandler = null;
let touchRankHandle = null;
let preTime = null;

const start = () => {
  dataBus = new DataBus();
  bg = new Background(ctx);
  menu = new Menu();
  flyBird = new Bird(ctx);
  loop();
  if (dataBus.phase === 0) {
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
  update();
  render();
  startNextAnimation();
};

/**
 * 更新逻辑
 */
const update = () => {
  bg.update();
};

/**
 * 绘制逻辑
 */
const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bg.render(ctx);
  if (dataBus.phase === 0) {
    flyBird.update(dataBus.frame);
    flyBird.render();
    menu.renderGameMenu(ctx);
  }
  if (dataBus.phase === 2) {
    const now = Date.now();
    const dt = now - preTime;
    preTime = now;
    flyBird.update(dataBus.frame);
    flyBird.birdDown(dt);
    flyBird.drawFlyBird();
  }
};

const touchBeginEventHandler = (e) => {
  e.preventDefault();
  let x = e.touches[0].clientX;
  let y = e.touches[0].clientY;
  let area = menu.btnBeginArea;
  if (x >= area.startX
    && x <= area.endX
    && y >= area.startY
    && y <= area.endY) {
      dataBus.goToPlay();
      //清除点击事件
      canvas.removeEventListener('touchstart', touchHandler);
      preTime = Date.now();
      if (dataBus.phase === 2) {
        canvas.addEventListener('touchstart', () => {
          flyBird.speed = -0.3;
        });
      }
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
    dataBus.goToRank();
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
