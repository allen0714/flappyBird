const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

let atlas = new Image();
atlas.src = 'images/title.png';
// 绘制圆角矩形
const roundRect = (ctx,x, y, w, h, r) => {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  return ctx;
}
export default class Menu {
  renderGameMenu(ctx) {
    // 绘制title
    ctx.drawImage(
      atlas,
      screenWidth / 2 - 100,
      screenHeight / 2 - screenHeight / 3,
      200, 50
    )
    // 绘制圆角矩形
    ctx.fillStyle = "#ffffff"
    roundRect(ctx, screenWidth / 2 - 87, screenHeight / 2 - 35, 175, 70, 30).fill();

    // 开始游戏文字
    ctx.fillStyle = "#000000"
    ctx.font = "25px STXihei"
    ctx.fillText(
      '开始游戏',
      screenWidth / 2 - 37,
      screenHeight / 2 + 10,
    )
    // 绘制开始游戏的三角图标
    ctx.beginPath();
    ctx.moveTo(screenWidth / 2 - 42, screenHeight / 2);  //绘制起始点
    ctx.lineTo(screenWidth / 2 - 57, screenHeight / 2-15);
    ctx.lineTo(screenWidth / 2 - 57, screenHeight / 2 + 15);
    ctx.fillStyle = "#00EE76";
    ctx.closePath();
    ctx.fill();
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
    ctx.fillStyle = "#ffffff"
    ctx.font = "30px Arial"
    ctx.fillText(
      '排行榜',
      screenWidth / 2 - 10,
      screenHeight / 2 - 120 + 300
    )
  }
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