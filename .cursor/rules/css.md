# CSS 样式规则

## 命名约定
- 使用 BEM 方法论：`.block__element--modifier`
- 类名使用 kebab-case：`.chat-area`, `.message-bubble`
- 避免使用 ID 选择器，优先使用类选择器

## 响应式设计
- 移动优先设计原则
- 使用 CSS Grid 和 Flexbox 进行布局
- 断点设置：
  - 移动端：< 768px
  - 平板：768px - 1024px
  - 桌面端：> 1024px

## 颜色系统
```css
:root {
  /* 主色调 */
  --primary-color: #4285f4;
  --primary-hover: #3367d6;
  
  /* 背景色 */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e8eaed;
  
  /* 文本色 */
  --text-primary: #202124;
  --text-secondary: #5f6368;
  --text-tertiary: #9aa0a6;
  
  /* 边框色 */
  --border-color: #dadce0;
  --border-hover: #bdc1c6;
}
```

## 间距系统
```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
}
```

## 字体系统
```css
:root {
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
}
```

## 最佳实践
- 使用 CSS 变量定义主题色彩
- 优先使用 Flexbox 和 Grid 布局
- 避免使用 `!important`
- 使用 `scoped` 样式避免样式污染
- 合理使用 CSS 动画和过渡效果
- 确保良好的可访问性（a11y）
