import EventUtil from '../base/EventUtil.js';
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const ctx = canvas.getContext('2d');

let atlas = new Image();
atlas.src = 'images/title.png';
// 绘制圆角矩形
const drawRoundRect = (ctx,x, y, w, h, r, color, type) => {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx[type + 'Style'] = color;
  ctx.closePath();
  ctx[type]();
}
const drawTriangle = (ctx, x1, y1, x2, y2, x3, y3, color, type) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);  //绘制起始点
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx[type + 'Style'] = color;
  ctx.closePath();
  ctx[type]();
}
export default class Menu {
  renderGameMenu() {
    // 绘制title
    ctx.drawImage(
      atlas,
      screenWidth / 2 - 100,
      screenHeight / 2 - screenHeight / 3,
      200, 50
    );
    // 绘制圆角矩形
    drawRoundRect(ctx, screenWidth / 2 - 87, screenHeight / 2 - 35, 175, 70, 30, "#ffffff", "fill");

    // 开始游戏文字
    ctx.fillStyle = "#000000"
    ctx.font = "25px STXihei"
    ctx.fillText(
      '开始游戏',
      screenWidth / 2 - 37,
      screenHeight / 2 + 10,
    )
    drawTriangle(ctx, screenWidth / 2 - 42, screenHeight / 2, screenWidth / 2 - 57,
    screenHeight / 2 - 15, screenWidth / 2 - 57, screenHeight / 2 + 15, "#00EE76", "fill");
    // 排行榜
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.rect(screenWidth / 2 - 60,
      screenHeight / 2 - 110 + 265, 10, 25);
    ctx.rect(screenWidth / 2 - 49,
      screenHeight / 2 - 110 + 255, 10, 35);
    ctx.rect(screenWidth / 2 - 38,
      screenHeight / 2 - 110 + 260, 10, 30);
      ctx.fill();
    ctx.font = "30px Arial"
    ctx.fillText(
      '排行榜',
      screenWidth / 2 - 10,
      screenHeight / 2 - 120 + 300
    )
  }
  checkIfHit = (e, targetType) => {
    const { clientX, clientY } = e.touches[0];
    const { startX, startY, endX, endY } = (targetType === 'RANK' ? this.btnRankArea: this.btnBeginArea);
    return (clientX >= startX
      && clientX <= endX
      && clientY >= startY
      && clientY <= endY);
  }


  getTouchRankFunc = EventUtil.addTouchHandler(e => this.checkIfHit(e, 'RANK'))

  getTouchStartFunc = EventUtil.addTouchHandler(e => this.checkIfHit(e, 'START'))

  btnBeginArea = {
    startX: screenWidth / 2 - 87,
    startY: screenHeight / 2 - 35,
    endX: screenWidth / 2 + 87,
    endY: screenHeight / 2 + 35, 
  }
  btnRankArea = {
    startX: screenWidth / 2 - 60,
    startY: screenHeight / 2 + 150,
    endX: screenWidth / 2 + 80,
    endY: screenHeight / 2 + 180,
  }


}