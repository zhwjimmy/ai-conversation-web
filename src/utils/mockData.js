// 模拟对话数据
export const mockConversations = [
    {
        id: '1',
        title: 'Vue.js 开发最佳实践',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小时前
        messageCount: 8
    },
    {
        id: '2',
        title: 'CSS 布局技巧讨论',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1天前
        messageCount: 12
    },
    {
        id: '3',
        title: 'JavaScript 异步编程',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3天前
        messageCount: 6
    },
    {
        id: '4',
        title: '前端性能优化方案',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1周前
        messageCount: 15
    },
    {
        id: '5',
        title: 'React vs Vue 对比分析',
        timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2周前
        messageCount: 20
    }
]

// 模拟消息数据
export const mockMessages = {
    '1': [
        {
            id: '1-1',
            type: 'user',
            content: '你好，我想了解一下 Vue.js 的开发最佳实践，能给我一些建议吗？',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
            id: '1-2',
            type: 'ai',
            content: '当然可以！Vue.js 开发最佳实践包括以下几个方面：\n\n**1. 组件设计**\n- 使用单一职责原则，每个组件只做一件事\n- 合理使用 props 和 emit 进行组件通信\n- 优先使用 Composition API\n\n**2. 状态管理**\n- 简单应用使用 provide/inject\n- 复杂应用使用 Pinia 或 Vuex\n- 避免过度使用全局状态\n\n**3. 性能优化**\n- 使用 v-memo 缓存复杂计算\n- 合理使用 v-show 和 v-if\n- 懒加载非关键组件\n\n**4. 代码规范**\n- 使用 ESLint 和 Prettier\n- 遵循 Vue 官方风格指南\n- 编写有意义的组件名和变量名',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30 * 1000)
        },
        {
            id: '1-3',
            type: 'user',
            content: '能详细说说 Composition API 的优势吗？',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 2 * 60 * 1000)
        },
        {
            id: '1-4',
            type: 'ai',
            content: 'Composition API 相比 Options API 有以下优势：\n\n**1. 更好的逻辑复用**\n- 可以将相关逻辑组织在一起\n- 更容易提取和复用逻辑\n- 支持 TypeScript 更好的类型推断\n\n**2. 更灵活的组织方式**\n- 不再受限于 data、methods、computed 的分离\n- 相关逻辑可以放在一起\n- 更容易理解和维护\n\n**3. 更好的 Tree-shaking**\n- 只导入需要的 API\n- 减少打包体积\n\n**4. 更好的类型支持**\n- TypeScript 支持更完善\n- 更好的 IDE 智能提示\n\n**示例代码：**\n```javascript\nimport { ref, computed, onMounted } from \'vue\'\n\nexport default {\n  setup() {\n    const count = ref(0)\n    const doubleCount = computed(() => count.value * 2)\n    \n    onMounted(() => {\n      console.log(\'组件已挂载\')\n    })\n    \n    return {\n      count,\n      doubleCount\n    }\n  }\n}\n```',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 3 * 60 * 1000)
        }
    ],
    '2': [
        {
            id: '2-1',
            type: 'user',
            content: 'CSS 布局有哪些常用的技巧？',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
        },
        {
            id: '2-2',
            type: 'ai',
            content: 'CSS 布局的常用技巧包括：\n\n**1. Flexbox 布局**\n- 一维布局的首选\n- 强大的对齐和分布能力\n- 响应式设计友好\n\n**2. Grid 布局**\n- 二维布局的最佳选择\n- 复杂的网格系统\n- 精确的定位控制\n\n**3. 定位技巧**\n- `position: sticky` 粘性定位\n- `position: absolute` 绝对定位\n- `z-index` 层级管理\n\n**4. 响应式设计**\n- 媒体查询 `@media`\n- 相对单位 `rem`、`em`、`%`\n- 容器查询 `@container`',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 30 * 1000)
        }
    ],
    '3': [
        {
            id: '3-1',
            type: 'user',
            content: 'JavaScript 异步编程有哪些方式？',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        },
        {
            id: '3-2',
            type: 'ai',
            content: 'JavaScript 异步编程的主要方式：\n\n**1. 回调函数 (Callback)**\n- 最基础的异步处理方式\n- 容易产生回调地狱\n\n**2. Promise**\n- ES6 引入的异步解决方案\n- 链式调用，避免回调地狱\n- 支持 `.then()` 和 `.catch()`\n\n**3. async/await**\n- ES2017 引入的语法糖\n- 让异步代码看起来像同步代码\n- 基于 Promise 实现\n\n**4. Generator 函数**\n- 可以暂停和恢复的函数\n- 配合 yield 关键字使用\n- 适合处理复杂的异步流程',
            timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 1000)
        }
    ],
    '4': [
        {
            id: '4-1',
            type: 'user',
            content: '前端性能优化有哪些方法？',
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        },
        {
            id: '4-2',
            type: 'ai',
            content: '前端性能优化的主要方法：\n\n**1. 资源优化**\n- 图片压缩和格式优化\n- 代码压缩和混淆\n- 资源合并和 CDN 加速\n\n**2. 加载优化**\n- 懒加载和预加载\n- 代码分割\n- 关键资源优先加载\n\n**3. 渲染优化**\n- 减少重排和重绘\n- 使用 CSS3 硬件加速\n- 虚拟滚动\n\n**4. 缓存策略**\n- 浏览器缓存\n- Service Worker\n- HTTP 缓存头设置',
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 30 * 1000)
        }
    ],
    '5': [
        {
            id: '5-1',
            type: 'user',
            content: 'React 和 Vue 有什么区别？',
            timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
        },
        {
            id: '5-2',
            type: 'ai',
            content: 'React 和 Vue 的主要区别：\n\n**1. 学习曲线**\n- Vue：更平缓，模板语法接近 HTML\n- React：需要学习 JSX 和函数式编程\n\n**2. 生态系统**\n- React：更庞大的生态系统\n- Vue：官方工具链更完善\n\n**3. 性能**\n- Vue：响应式系统，自动优化\n- React：需要手动优化，但更灵活\n\n**4. 开发体验**\n- Vue：双向数据绑定，开发效率高\n- React：单向数据流，数据流更清晰\n\n**5. 社区支持**\n- React：Facebook 支持，社区活跃\n- Vue：尤雨溪维护，社区友好',
            timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000 + 30 * 1000)
        }
    ]
}

// 模拟用户信息
export const mockUser = {
    id: 'user-1',
    name: '用户',
    avatar: null,
    status: 'online'
}

// 模拟 AI 助手信息
export const mockAI = {
    id: 'ai-1',
    name: 'AI 助手',
    avatar: null,
    status: 'online',
    capabilities: [
        '文本对话',
        '代码生成',
        '问题解答',
        '创意写作',
        '翻译服务'
    ]
}

// 模拟设置数据
export const mockSettings = {
    theme: 'light',
    language: 'zh-CN',
    fontSize: 'medium',
    autoSave: true,
    notifications: true,
    shortcuts: {
        sendMessage: 'Enter',
        newLine: 'Shift+Enter',
        newConversation: 'Ctrl+N',
        toggleSidebar: 'Ctrl+B'
    }
}

// 模拟通知数据
export const mockNotifications = [
    {
        id: '1',
        type: 'info',
        title: '欢迎使用 AI Conversation',
        message: '开始您的智能对话体验吧！',
        timestamp: new Date(),
        read: false
    },
    {
        id: '2',
        type: 'success',
        title: '消息发送成功',
        message: '您的消息已成功发送给 AI 助手',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: true
    }
]

// 工具函数
export const formatTimestamp = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diff = now - time

    if (diff < 60000) {
        return '刚刚'
    } else if (diff < 3600000) {
        return `${Math.floor(diff / 60000)}分钟前`
    } else if (diff < 86400000) {
        return `${Math.floor(diff / 3600000)}小时前`
    } else if (diff < 604800000) {
        return `${Math.floor(diff / 86400000)}天前`
    } else {
        return time.toLocaleDateString('zh-CN')
    }
}

export const generateMessageId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

export const createNewConversation = () => {
    const id = generateMessageId()
    return {
        id,
        title: '新对话',
        timestamp: new Date(),
        messageCount: 0
    }
}

export const createNewMessage = (type, content, image = null) => {
    return {
        id: generateMessageId(),
        type,
        content,
        image,
        timestamp: new Date(),
        isLoading: false
    }
}
