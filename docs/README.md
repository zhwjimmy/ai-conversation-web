# 文档索引

欢迎来到 AI Conversation Web 项目文档！这里包含了项目的所有技术文档和使用指南。

## 📚 文档分类

### 🚀 快速开始
- [项目概述](../README.md) - 项目介绍和快速开始指南
- [开发指南](./development.md) - 开发环境搭建和部署指南

### 🎯 需求与设计
- [需求文档](./requirements.md) - 详细的功能需求分析
- [设计规范](./design.md) - UI/UX 设计指南和规范

### 👨‍💻 开发者指南

#### 后端开发者
如果您是后端开发者，对 Vue.js 不太熟悉，建议按以下顺序阅读：

1. **[Vue.js 快速入门指南](./vue-guide.md)** 
   - 从后端开发者的角度理解 Vue.js
   - Vue.js 核心概念与后端开发的对比
   - 项目组件结构解析
   - 数据流和事件处理机制

2. **[后端集成指南](./backend-integration.md)**
   - 如何将前端与后端 API 集成
   - RESTful API 设计建议
   - 状态管理和数据流
   - 错误处理和性能优化

#### 前端开发者
- [开发指南](./development.md) - 开发环境搭建和部署
- [设计规范](./design.md) - UI/UX 设计指南
- [故障排除](./troubleshooting.md) - 常见问题及解决方案

### 🔧 开发规范
- [Vue.js 开发规则](../.cursor/rules/vue.md) - Vue.js 组件开发规范
- [CSS 样式规则](../.cursor/rules/css.md) - CSS 样式开发规范
- [通用开发规则](../.cursor/rules/general.md) - 通用开发规范和最佳实践

## 📖 文档使用建议

### 新手入门路径
1. 阅读 [项目概述](../README.md) 了解项目
2. 根据您的背景选择相应的指南：
   - **后端开发者**：先读 [Vue.js 快速入门指南](./vue-guide.md)
   - **前端开发者**：直接看 [开发指南](./development.md)
3. 遇到问题时查看 [故障排除](./troubleshooting.md)
4. 需要集成后端时参考 [后端集成指南](./backend-integration.md)

### 按需查阅
- **想了解项目需求** → [需求文档](./requirements.md)
- **需要设计指导** → [设计规范](./design.md)
- **遇到技术问题** → [故障排除](./troubleshooting.md)
- **要集成 API** → [后端集成指南](./backend-integration.md)
- **学习 Vue.js** → [Vue.js 快速入门指南](./vue-guide.md)

## 🛠️ 项目结构

```
ai-conversation-web/
├── docs/                    # 📚 项目文档
│   ├── README.md           # 文档索引（本文件）
│   ├── requirements.md     # 需求文档
│   ├── design.md          # 设计规范
│   ├── development.md     # 开发指南
│   ├── vue-guide.md       # Vue.js 入门指南
│   ├── backend-integration.md # 后端集成指南
│   └── troubleshooting.md # 故障排除
├── .cursor/rules/          # 🔧 开发规则
│   ├── vue.md             # Vue.js 开发规范
│   ├── css.md             # CSS 样式规范
│   └── general.md         # 通用开发规范
├── src/                    # 💻 源代码
│   ├── components/        # Vue 组件
│   ├── assets/           # 静态资源
│   └── utils/            # 工具函数
└── README.md              # 项目主文档
```

## 🤝 贡献文档

如果您发现文档有错误或需要补充，欢迎：

1. **提交 Issue** - 报告文档问题
2. **提交 PR** - 直接改进文档
3. **提供反馈** - 分享使用体验

## 📞 获取帮助

- **技术问题**：查看 [故障排除](./troubleshooting.md)
- **Vue.js 学习**：参考 [Vue.js 快速入门指南](./vue-guide.md)
- **API 集成**：阅读 [后端集成指南](./backend-integration.md)
- **项目问题**：在 GitHub 提交 Issue

---

**提示**：建议将本文档加入书签，方便随时查阅！
