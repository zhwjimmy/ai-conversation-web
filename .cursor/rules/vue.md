# Vue.js 开发规则

## 组件命名规范
- 组件文件名使用 PascalCase：`MessageBubble.vue`
- 组件名在模板中使用 kebab-case：`<message-bubble>`
- 组件内部名称使用 PascalCase：`export default { name: 'MessageBubble' }`

## 组件结构规范
```vue
<template>
  <!-- 模板内容 -->
</template>

<script>
// 使用 Composition API
import { ref, reactive, computed, onMounted } from 'vue'

export default {
  name: 'ComponentName',
  props: {
    // props 定义
  },
  emits: ['event-name'],
  setup(props, { emit }) {
    // 组合式 API 逻辑
    return {
      // 返回给模板的数据和方法
    }
  }
}
</script>

<style scoped>
/* 组件样式 */
</style>
```

## 最佳实践
- 优先使用 Composition API
- 使用 `<script setup>` 语法糖（如果适用）
- 组件应该单一职责
- 使用 TypeScript 类型定义（如果项目支持）
- 合理使用 `scoped` 样式
- 组件间通信优先使用 props/emit，复杂状态使用 Pinia

## 代码风格
- 使用 2 空格缩进
- 字符串使用单引号
- 对象和数组末尾添加逗号
- 函数和变量使用 camelCase
- 常量使用 UPPER_SNAKE_CASE
