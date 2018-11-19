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

const ctx = canvas.getContext('2d');

export default class Introduction {
  render() {
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
  }
} 
