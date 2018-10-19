# flappyBird

## 目录结构

```
./js
├── base                                   // 基础类
│   ├── Animatoin.js                       // 帧动画
│   ├── Pool.js                            // 对象池
│   └── Sprite.js                          // 精灵类
├── lib                                    // 跟业务无关的第三方库 
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 适配器
├── player                                 // 玩家（鸟）相关
│   ├── bullet.js                          // 子弹类
│   └── index.js                           // 玩家类
├── runtime                                // 背景、音乐、等
│   ├── background.js                      // 背景类
│   ├── gameinfo.js                        // 用于展示分数和结算界面
│   └── music.js                           // 全局音效管理器
├── databus.js                             // 全局状态管理器
└── main.js                                // 游戏入口主函数

```
