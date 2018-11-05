const INTRO_READY_IMG = new Image();
INTRO_READY_IMG.src = 'images/text_ready.png';
const INTRO_TUTORIAL_IMG = new Image();
INTRO_TUTORIAL_IMG.src = 'images/tutorial.png';
const INTRO_SCORE = new Image();
INTRO_SCORE.src = 'images/number_score_00.png';
const BIRD_IMG = new Image();
BIRD_IMG.src = 'images/birds.png';
const { innerWidth: screenWidth, innerHeight: screenHeight } = window;
const [READY_WIDTH, READY_HEIGHT, TUTORIAL_WIDTH, TUTORIAL_HEIGHT, INIT_SCORE_WIDTH, INIT_SCORE_HEIGHT] = [196, 62, 114, 98, 16, 20];
const a = 9.8;
export default class Intro {
  constructor(ctx) {

    this.index = 0; // 用于绘制小鸟扇动翅膀
    this.speed = 10;
    this.y = 220;
    this.dy = 0.2;
  }
  update(frame) {
    this.dy += 0.088;
    this.y += this.dy;
    this
    if (frame % 8 === 0) {
      this.index++;
    }
    if (this.index > 2) {
      this.index = 0;
    }
    if (this.y > 247) {
      this.dy = -2;
    }
  }

  render(ctx) {
    // 绘制getready
    ctx.drawImage(
      INTRO_READY_IMG,
      screenWidth / 2 - READY_WIDTH / 2,
      screenHeight / 3 - READY_HEIGHT / 2,
      READY_WIDTH,
      READY_HEIGHT,
    );
    // 绘制操作示例
    ctx.drawImage(
      INTRO_TUTORIAL_IMG,
      screenWidth / 2 - TUTORIAL_WIDTH / 2,
      screenHeight / 2 - TUTORIAL_HEIGHT / 2,
      TUTORIAL_WIDTH,
      TUTORIAL_HEIGHT,
    );
    // 绘制初始分数
    ctx.drawImage(
      INTRO_SCORE,
      screenWidth / 2 - INIT_SCORE_WIDTH / 2,
      screenHeight / 8 - TUTORIAL_HEIGHT / 2,
      INIT_SCORE_WIDTH,
      INIT_SCORE_HEIGHT,
    );

    ctx.drawImage(
      BIRD_IMG,
      52.5 * this.index, 0,
      50, 35,
      screenWidth / 6,
      this.y,
      50,
      35,
    );
  }
} 
