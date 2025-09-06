# 设计规范文档

## 设计系统

### 颜色规范
```css
/* 主色调 */
--primary-blue: #4285f4;      /* Google Blue */
--primary-green: #34a853;     /* Google Green */
--primary-red: #ea4335;       /* Google Red */
--primary-yellow: #fbbc04;    /* Google Yellow */

/* 中性色 */
--gray-50: #f8f9fa;
--gray-100: #f1f3f4;
--gray-200: #e8eaed;
--gray-300: #dadce0;
--gray-400: #bdc1c6;
--gray-500: #9aa0a6;
--gray-600: #80868b;
--gray-700: #5f6368;
--gray-800: #3c4043;
--gray-900: #202124;

/* 语义化颜色 */
--text-primary: var(--gray-900);
--text-secondary: var(--gray-700);
--text-tertiary: var(--gray-600);
--bg-primary: #ffffff;
--bg-secondary: var(--gray-50);
--border-color: var(--gray-300);
```

### 字体规范
```css
/* 字体族 */
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* 字体大小 */
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
--font-size-2xl: 24px;

/* 行高 */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### 间距规范
```css
/* 间距系统 */
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
--spacing-16: 64px;
```

### 圆角规范
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### 阴影规范
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
```

## 组件设计

### 消息气泡
- **用户消息**：右对齐，蓝色背景，白色文字
- **AI 消息**：左对齐，浅灰色背景，深色文字
- **圆角**：使用 `--radius-lg`
- **内边距**：`--spacing-4`
- **最大宽度**：70%

### 输入框
- **样式**：圆角矩形，浅色边框
- **聚焦状态**：边框颜色变为主色调
- **占位符**：浅灰色文字
- **按钮**：圆形，主色调背景

### 侧边栏
- **背景**：浅灰色
- **宽度**：280px（桌面端）
- **列表项**：悬停效果，圆角
- **滚动条**：自定义样式

### 按钮
- **主要按钮**：主色调背景，白色文字
- **次要按钮**：透明背景，主色调边框和文字
- **图标按钮**：圆形，悬停效果

## 响应式设计

### 断点
- **移动端**：< 768px
- **平板**：768px - 1024px
- **桌面端**：> 1024px

### 布局适配
- **移动端**：侧边栏隐藏，全屏对话
- **平板**：侧边栏可折叠
- **桌面端**：固定侧边栏布局

## 动画效果
- **过渡时间**：200ms
- **缓动函数**：ease-in-out
- **悬停效果**：轻微缩放或颜色变化
- **加载状态**：骨架屏或加载动画
