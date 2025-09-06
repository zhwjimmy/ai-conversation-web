# AI Conversation Web

一个类似 Google Gemini 网页版的单页 Web 应用程序，使用 Vue.js 构建。

## 功能特性

- 💬 **现代聊天界面** - 仿照 Google Gemini 的简洁设计
- 🎨 **响应式布局** - 适配桌面端、平板和移动端
- 📱 **侧边栏导航** - 历史对话记录管理
- 🖼️ **图片上传** - 支持图片消息发送
- ⚡ **快速响应** - 基于 Vite 的快速开发体验
- 🎯 **组件化设计** - 可复用的 Vue 组件

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **CSS3** - 现代样式和动画
- **ES6+** - 现代 JavaScript 语法

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
```bash
npm run build
```

## 项目结构

```
├── src/
│   ├── main.js              # 应用入口
│   ├── App.vue              # 根组件
│   ├── components/          # Vue 组件
│   ├── assets/              # 静态资源
│   └── utils/               # 工具函数
├── docs/                    # 项目文档
├── .cursor/                 # Cursor 规则配置
└── package.json             # 项目配置
```

## 主要组件

- **ChatArea** - 对话区域容器
- **MessageBubble** - 消息气泡组件
- **InputArea** - 输入区域组件
- **Sidebar** - 历史记录侧边栏
- **ActionButtons** - 功能按钮组件

## 设计特色

- 🎨 **现代极简风格** - 干净的界面设计
- 🌈 **Google 配色方案** - 经典的蓝绿色调
- 📐 **响应式布局** - 完美适配各种设备
- ⚡ **流畅动画** - 优雅的交互效果

## 开发规范

项目遵循严格的开发规范，详见：
- [开发指南](./docs/development.md)
- [设计规范](./docs/design.md)
- [需求文档](./docs/requirements.md)

## 文档指南

### 后端开发者
如果您是后端开发者，对 Vue.js 不太熟悉，建议阅读：
- [Vue.js 快速入门指南](./docs/vue-guide.md) - 从后端开发者的角度理解 Vue.js
- [后端集成指南](./docs/backend-integration.md) - 如何将前端与后端 API 集成

### 前端开发者
- [开发指南](./docs/development.md) - 开发环境搭建和部署
- [设计规范](./docs/design.md) - UI/UX 设计指南
- [故障排除](./docs/troubleshooting.md) - 常见问题及解决方案

## 浏览器支持

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0
- ✨ 初始版本发布
- 🎨 完整的 UI 界面实现
- 📱 响应式设计支持
- 🔧 基础功能组件
