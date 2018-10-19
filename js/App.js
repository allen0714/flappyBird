import DataBus from './DataBus';
import Background  from './runtime/Background.js';

let dataBus = null;
let bg = null;
let ctx = canvas.getContext('2d');

const start = () => {
  dataBus = new DataBus();
  bg = new Background(ctx);
  loop();
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
};

/**
 * 游戏主函数
 * @type {{start()}}
 */
const App = {
  start,
};

export default App;
