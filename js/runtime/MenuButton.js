import EventUtil from '../base/EventUtil.js';
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const ctx = canvas.getContext('2d');

let atlas = new Image();
atlas.src = 'images/title.png';
// 绘制圆角矩形
const drawRoundRect = (x, y, w, h, r, color, type) => {
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
//画三角形
const drawTriangle = (x1, y1, x2, y2, x3, y3, color, type) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);  //绘制起始点
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx[type + 'Style'] = color;
  ctx.closePath();
  ctx[type]();
}
//画文字
const drawText = (x, y, color, fontSize, text) => {
  ctx.fillStyle = color;
  ctx.font = fontSize;
  ctx.fillText(
    text,
    x,
    y,
  );
}
//画排行榜
const drawRank = (x, y, w, h, color, type) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.rect(x - w - 1, y + 10, w, h - 10);
  ctx.rect(x, y, w, h);
  ctx.rect(x + w + 1, y + 5, w, h - 5);
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
    drawRoundRect(screenWidth / 2 - 87, screenHeight / 2 - 35, 175, 70, 30, "#ffffff", "fill");
    drawText(screenWidth / 2 - 37, screenHeight / 2 + 10, "#000000", "25px STXihei", "开始游戏");
    drawTriangle(screenWidth / 2 - 42, screenHeight / 2, screenWidth / 2 - 57,
      screenHeight / 2 - 15, screenWidth / 2 - 57, screenHeight / 2 + 15, "#00EE76", "fill");
    drawRank(screenWidth / 2 - 59, screenHeight * 0.7, 10, 35, "#ffffff", "fill");
    drawText(screenWidth / 2 - 20, screenHeight * 0.7 + 30, "#ffffff", "30px Arial", "排行榜");
  }
  checkIfHit = (e, targetType) => {
    const { clientX, clientY } = e.touches[0];
    const { startX, startY, endX, endY } = (targetType === 'RANK' ? this.btnRankArea: this.btnBeginArea);
    return (clientX >= startX
      && clientX <= endX
      && clientY >= startY
      && clientY <= endY);
  }
  getTouchRankFunc = EventUtil.addTouchHandler(e => this.checkIfHit(e, 'RANK'));
  getTouchStartFunc = EventUtil.addTouchHandler(e => this.checkIfHit(e, 'START'));
  btnBeginArea = {
    startX: screenWidth / 2 - 87,
    startY: screenHeight / 2 - 35,
    endX: screenWidth / 2 + 87,
    endY: screenHeight / 2 + 35, 
  };
  btnRankArea = {
    startX: screenWidth / 2 - 70,
    startY: screenHeight * 0.7,
    endX: screenWidth / 2 + 70,
    endY: screenHeight * 0.7 + 35,
  };
}