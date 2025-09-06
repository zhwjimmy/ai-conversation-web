# 开发指南

## 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

## 快速开始

### 1. 安装依赖
```bash
npm install
# 或
yarn install
```

### 2. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

### 3. 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 4. 预览生产版本
```bash
npm run preview
# 或
yarn preview
```

## 项目结构

```
src/
├── main.js              # 应用入口
├── App.vue              # 根组件
├── components/          # 组件目录
│   ├── ChatArea.vue     # 对话区域
│   ├── MessageBubble.vue # 消息气泡
│   ├── InputArea.vue    # 输入区域
│   ├── Sidebar.vue      # 侧边栏
│   └── ActionButtons.vue # 功能按钮
├── assets/              # 静态资源
│   ├── css/
│   │   └── main.css     # 主样式
│   └── icons/           # 图标文件
└── utils/               # 工具函数
    └── mockData.js      # 模拟数据
```

## 开发规范

### 组件开发
1. 使用 Vue 3 Composition API
2. 组件名使用 PascalCase
3. 文件名与组件名保持一致
4. 使用 `<script setup>` 语法糖
5. 样式使用 `scoped` 避免污染

### 样式开发
1. 使用 CSS 变量定义主题
2. 遵循 BEM 命名规范
3. 优先使用 Flexbox 和 Grid
4. 确保响应式设计
5. 注意可访问性

### 代码提交
1. 遵循 Git 提交规范
2. 提交前运行代码检查
3. 保持提交信息清晰
4. 避免提交临时文件

## 调试技巧

### Vue DevTools
- 安装 Vue DevTools 浏览器扩展
- 使用组件检查器查看组件状态
- 利用时间旅行调试功能

### 控制台调试
```javascript
// 在组件中添加调试信息
console.log('Component mounted:', this.$el)
```

### 网络调试
- 使用浏览器开发者工具
- 检查网络请求和响应
- 模拟慢网络环境

## 性能优化

### 代码分割
- 使用动态导入分割路由
- 懒加载非关键组件
- 优化第三方库加载

### 图片优化
- 使用适当的图片格式
- 实现图片懒加载
- 提供多种尺寸适配

### 缓存策略
- 合理使用浏览器缓存
- 实现数据缓存机制
- 优化 API 请求频率

## 部署指南

### 静态部署
1. 运行 `npm run build`
2. 将 `dist` 目录上传到服务器
3. 配置 Web 服务器指向 `index.html`

### 环境变量
```bash
# 开发环境
VITE_API_URL=http://localhost:3000/api

# 生产环境
VITE_API_URL=https://api.example.com
```

### 构建优化
- 启用 Gzip 压缩
- 配置 CDN 加速
- 设置缓存策略
- 监控性能指标
