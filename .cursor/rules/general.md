# 通用开发规则

## 代码风格
- 使用 2 空格缩进
- 行尾不添加分号（JavaScript）
- 字符串使用单引号
- 对象和数组末尾添加逗号
- 每行最大长度 100 字符

## 文件组织
- 一个文件一个主要功能
- 相关文件放在同一目录
- 使用有意义的文件名
- 保持目录结构清晰

## 注释规范
```javascript
/**
 * 函数功能描述
 * @param {string} param1 - 参数1描述
 * @param {number} param2 - 参数2描述
 * @returns {boolean} 返回值描述
 */
function exampleFunction(param1, param2) {
  // 单行注释说明关键逻辑
  return true
}
```

## Git 提交规范
- 提交信息格式：`type(scope): description`
- 类型：feat, fix, docs, style, refactor, test, chore
- 示例：`feat(chat): add message bubble component`

## 错误处理
- 使用 try-catch 处理异步操作
- 提供有意义的错误信息
- 记录关键错误日志
- 优雅降级处理

## 性能优化
- 避免不必要的 DOM 操作
- 使用防抖和节流
- 合理使用缓存
- 图片懒加载
- 代码分割

## 可访问性
- 使用语义化 HTML 标签
- 提供 alt 属性
- 确保键盘导航
- 合理的颜色对比度
- 屏幕阅读器友好
