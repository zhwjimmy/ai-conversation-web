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
    },
    {
        id: '6',
        title: '关于人生哲学的深度思考',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5天前
        messageCount: 16
    },
    {
        id: '7',
        title: 'Claude Pro 中国大陆付费指南',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1天前
        messageCount: 4
    },
    {
        id: '8',
        title: '研发价值:从执行到共创',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2天前
        messageCount: 7
    },
    {
        id: '9',
        title: '室友闹钟扰眠沟通指南',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3天前
        messageCount: 5
    },
    {
        id: '10',
        title: '医生与心理医生咨询',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4天前
        messageCount: 9
    },
    {
        id: '11',
        title: '口腔溃疡的有效治疗方法',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5天前
        messageCount: 6
    },
    {
        id: '12',
        title: 'SaaS 发版风险控制方案',
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6天前
        messageCount: 11
    },
    {
        id: '13',
        title: '中美外卖市场竞争差异',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7天前
        messageCount: 8
    },
    {
        id: '14',
        title: '樂於分享有趣事物',
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8天前
        messageCount: 3
    },
    {
        id: '15',
        title: '焦虑症状的专业分析与建议',
        timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9天前
        messageCount: 12
    },
    {
        id: '16',
        title: '家庭话题的深入探讨',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10天前
        messageCount: 14
    },
    {
        id: '17',
        title: '室友问题:温馨提示纸条',
        timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000), // 11天前
        messageCount: 5
    },
    {
        id: '18',
        title: 'AI 对话数据本地化与分析系统',
        timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12天前
        messageCount: 18
    },
    {
        id: '19',
        title: 'Carta.com 网站介绍',
        timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000), // 13天前
        messageCount: 7
    },
    {
        id: '20',
        title: 'TypeScript 高级类型应用',
        timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15天前
        messageCount: 13
    },
    {
        id: '21',
        title: '微服务架构设计原则',
        timestamp: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000), // 16天前
        messageCount: 16
    },
    {
        id: '22',
        title: '数据库索引优化策略',
        timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18天前
        messageCount: 10
    },
    {
        id: '23',
        title: 'Docker 容器化部署实践',
        timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20天前
        messageCount: 9
    },
    {
        id: '24',
        title: 'GraphQL API 设计最佳实践',
        timestamp: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), // 22天前
        messageCount: 11
    },
    {
        id: '25',
        title: '机器学习模型评估方法',
        timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25天前
        messageCount: 15
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
            content: '当然可以！Vue.js 开发最佳实践包括以下几个方面：\n\n**1. 组件设计**\n- 使用单一职责原则，每个组件只做一件事\n- 合理使用 props 和 emit 进行组件通信\n- 优先使用 Composition API\n\n**2. 状态管理**\n- 简单应用使用 provide/inject\n- 复杂应用使用 Pinia 或 Vuex\n- 避免过度使用全局状态\n\n**3. 性能优化**\n- 使用 v-memo 缓存复杂计算\n- 合理使用 v-show 和 v-if\n- 懒加载非关键组件\n\n**4. 代码规范**\n- 使用 ESLint 和 Prettier\n- 遵循 Vue 官方风格指南\n- 编写有意义的组件名和变量名\n\n**示例代码：**\n\n```javascript\n// Composition API 示例\nimport { ref, computed, onMounted } from \'vue\'\n\nexport default {\n  setup() {\n    const count = ref(0)\n    const doubleCount = computed(() => count.value * 2)\n    \n    const increment = () => {\n      count.value++\n    }\n    \n    onMounted(() => {\n      console.log(\'组件已挂载\')\n    })\n    \n    return {\n      count,\n      doubleCount,\n      increment\n    }\n  }\n}\n```\n\n**性能计算公式：**\n\n在计算组件性能时，我们可以使用以下公式：\n\n性能得分 = (渲染时间 / 总时间) × 100\n\n这是一个简单的数学表达式，用于评估组件性能。',
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
    ],
    '6': [
        {
            id: '6-1',
            type: 'user',
            content: '最近我一直在思考人生的意义，感觉生活中有很多困惑。你能和我聊聊关于人生哲学的话题吗？',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        },
        {
            id: '6-2',
            type: 'ai',
            content: '当然可以！人生哲学是一个深刻而永恒的话题。每个人在成长过程中都会遇到类似的困惑和思考。\n\n**关于人生意义的思考**\n\n人生意义这个问题，从古至今都是哲学家们探讨的核心。不同的哲学流派给出了不同的答案：\n\n- **存在主义**认为人生本无预设意义，意义需要我们自己创造\n- **斯多葛主义**强调接受命运，专注于我们能控制的事情\n- **佛教哲学**主张通过修行达到内心的平静和解脱\n- **儒家思想**强调修身齐家治国平天下的社会责任\n\n**现代视角下的思考**\n\n在现代社会，我们面临着前所未有的选择自由，但同时也承受着选择的焦虑。心理学家维克多·弗兰克尔在《活出生命的意义》中提到，即使在最困难的环境中，我们仍然可以选择如何回应。\n\n**一些思考方向**\n\n1. **价值观探索**：什么对你来说是最重要的？\n2. **关系与连接**：与他人的关系如何影响你的生活？\n3. **成长与学习**：你希望成为什么样的人？\n4. **贡献与影响**：你希望为世界带来什么？\n\n你具体在哪些方面感到困惑呢？我们可以深入探讨。',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 30 * 1000)
        },
        {
            id: '6-3',
            type: 'user',
            content: '我经常感到焦虑，担心未来，也担心自己是否在正确的道路上。有时候觉得时间过得太快，而自己好像什么都没做成。这种感受让我很困扰。',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 1000)
        },
        {
            id: '6-4',
            type: 'ai',
            content: '你的感受我完全理解，这种焦虑和迷茫在现代社会中非常普遍。让我们来深入分析一下这些感受。\n\n**关于时间焦虑**\n\n时间焦虑往往源于我们对"应该"的期待与现实的差距。我们生活在一个快节奏的社会中，社交媒体让我们看到别人的"成功"，容易产生比较心理。\n\n**重新定义"成就"**\n\n也许我们需要重新思考什么是"成就"：\n\n- **微小的进步**：每天的小改变累积起来就是巨大的成长\n- **内在的成长**：学会更好地理解自己，管理情绪\n- **关系的建立**：与家人朋友的深度连接\n- **体验的丰富**：旅行、阅读、学习新技能\n\n**关于"正确道路"的思考**\n\n其实，人生没有唯一的"正确道路"。每个人的人生都是独特的，重要的是：\n\n1. **自我认知**：了解自己的价值观、兴趣和优势\n2. **灵活调整**：允许自己改变方向，人生是动态的\n3. **过程导向**：关注过程而非结果，享受当下的努力\n4. **接受不确定性**：未来本身就是不确定的，这是生活的本质\n\n**实用的应对策略**\n\n- **正念练习**：关注当下，减少对未来的过度担忧\n- **目标设定**：设定小目标，逐步实现\n- **感恩练习**：记录每天的小确幸\n- **寻求支持**：与信任的人分享你的感受\n\n你觉得这些观点中哪些对你最有帮助？',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 1000)
        },
        {
            id: '6-5',
            type: 'user',
            content: '你说得很有道理。我确实经常在社交媒体上看到别人的生活，然后觉得自己不够好。而且我总是想要一个明确的答案，比如"我应该做什么工作"、"我应该过什么样的生活"，但似乎永远找不到标准答案。',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000)
        },
        {
            id: '6-6',
            type: 'ai',
            content: '你的观察非常敏锐！这正是现代人面临的核心困境。让我们来探讨一下这些深层次的问题。\n\n**社交媒体的"完美陷阱"**\n\n社交媒体展示的往往是生活的"高光时刻"，而不是真实的日常。这种选择性展示会让我们产生"别人都过得很好，只有我过得不好"的错觉。\n\n**关于"标准答案"的迷思**\n\n你提到的"标准答案"问题很有意思。我们从小接受的教育让我们习惯了有标准答案的问题，但人生恰恰没有标准答案。\n\n**重新思考"应该"**\n\n"应该"这个词往往带有外在的期待和压力。也许我们可以换个角度：\n\n- 不是"我应该做什么工作"，而是"什么工作让我感到充实和有价值？"\n- 不是"我应该过什么样的生活"，而是"什么样的生活让我感到快乐和满足？"\n\n**寻找内在的指南针**\n\n每个人都有自己的内在智慧，我们需要学会倾听它：\n\n1. **身体信号**：什么让你感到有活力？什么让你感到疲惫？\n2. **情感反应**：什么让你感到兴奋？什么让你感到恐惧？\n3. **价值观排序**：在冲突时，什么对你来说更重要？\n4. **直觉感受**：抛开理性分析，你的内心在说什么？\n\n**接受"不知道"的智慧**\n\n有时候，"不知道"本身就是一种智慧。它意味着我们保持开放，允许新的可能性出现。\n\n**实践建议**\n\n- **减少社交媒体时间**：设定使用时间限制\n- **记录真实感受**：写日记，记录你的真实想法\n- **尝试新体验**：通过行动来发现自己的偏好\n- **与不同的人交流**：了解不同的人生选择\n\n你觉得从哪个方面开始尝试会比较容易？',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 7 * 60 * 1000)
        },
        {
            id: '6-7',
            type: 'user',
            content: '我想先从减少社交媒体时间开始，因为我觉得这确实影响了我的心态。另外，我也想开始写日记，记录自己的想法。但是有时候我觉得写日记很困难，不知道写什么，或者写出来的内容很负面，让我更焦虑。',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000)
        },
        {
            id: '6-8',
            type: 'ai',
            content: '你的计划很实际！这两个改变确实能带来很大的积极影响。关于写日记的困难，这是很多人都会遇到的问题，让我来分享一些实用的方法。\n\n**关于社交媒体的调整**\n\n减少社交媒体使用是一个很好的开始。你可以：\n\n- 删除手机上的社交媒体应用，只在电脑上使用\n- 设定固定的使用时间，比如每天30分钟\n- 取消关注让你感到焦虑的账号\n- 关注一些积极、有启发性的内容\n\n**写日记的实用技巧**\n\n**1. 从简单开始**\n- 不需要每天写，一周2-3次就可以\n- 每次写5-10分钟就够了\n- 不需要写得很长或很深刻\n\n**2. 不同的写作方式**\n- **感恩日记**：每天记录3件让你感激的事情\n- **情绪日记**：记录当天的情绪变化\n- **观察日记**：记录你观察到的人和事\n- **问题日记**：写下你的困惑和思考\n\n**3. 处理负面情绪**\n\n负面情绪是正常的，写日记的目的不是消除它们，而是理解它们：\n\n- **接纳情绪**：允许自己感到焦虑、沮丧\n- **探索原因**：问自己"为什么会有这种感受？"\n- **寻找模式**：看看是否有重复出现的情绪模式\n- **寻找资源**：想想什么能帮助你感觉更好\n\n**4. 积极的写作框架**\n\n可以尝试这样的结构：\n- 今天发生了什么？\n- 我的感受是什么？\n- 我学到了什么？\n- 明天我想尝试什么？\n\n**5. 创造安全的写作空间**\n\n- 选择一个安静、舒适的地方\n- 使用你喜欢的笔和本子\n- 记住这是私人的，不需要给别人看\n- 允许自己写得"不好"，重要的是开始\n\n**关于"不知道写什么"**\n\n可以从这些简单的问题开始：\n- 今天天气怎么样？\n- 我今天吃了什么？\n- 我今天和谁说话了？\n- 我今天做了什么？\n- 我今天有什么感受？\n\n记住，写日记是一个过程，不需要完美。你觉得这些建议中哪些对你最有帮助？',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 12 * 60 * 1000)
        },
        {
            id: '6-9',
            type: 'user',
            content: '这些建议都很实用，特别是关于从简单问题开始写日记的想法。我想试试感恩日记，因为我觉得自己经常关注负面的东西，忽略了很多美好的事情。但是有时候我觉得生活很平淡，没有什么特别值得感恩的事情。',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000)
        },
        {
            id: '6-10',
            type: 'ai',
            content: '你的想法很好！感恩练习确实能帮助我们重新关注生活中的美好。关于"生活平淡，没什么值得感恩"的感受，这其实是一个很常见的误解。\n\n**重新定义"值得感恩"**\n\n我们往往认为只有"大事"才值得感恩，但实际上，生活中的小事情同样珍贵：\n\n**日常生活中的感恩**\n\n- **身体方面**：健康的身体、能看见美丽的风景、能听到音乐\n- **基本需求**：有食物吃、有地方住、有干净的水\n- **人际关系**：家人的关心、朋友的陪伴、陌生人的善意\n- **环境方面**：阳光、新鲜的空气、美丽的云朵\n- **机会方面**：能学习新东西、能表达自己的想法、能做出选择\n\n**感恩练习的具体方法**\n\n**1. 从"理所当然"开始**\n\n很多我们认为是"理所当然"的事情，实际上都是值得感恩的：\n\n- 今天没有生病\n- 今天有食物吃\n- 今天有人对我微笑\n- 今天我能自由地思考\n- 今天我有选择的权利\n\n**2. 关注细节**\n\n- 咖啡的香味\n- 阳光透过窗户的方式\n- 朋友说话时的表情\n- 音乐中的某个音符\n- 书中的一句话\n\n**3. 感恩的层次**\n\n- **物质层面**：食物、住所、健康\n- **情感层面**：爱、友谊、理解\n- **精神层面**：学习、成长、创造\n- **存在层面**：生命本身、意识、自由意志\n\n**4. 感恩日记的格式**\n\n可以这样写：\n\n"今天，我感恩：\n1. [具体的事情] - 因为[原因]\n2. [具体的事情] - 因为[原因]\n3. [具体的事情] - 因为[原因]\n\n今天让我感到温暖的一个瞬间是：[描述]\n\n今天我想感谢的人是：[名字] - 因为[原因]"\n\n**关于"平淡"的重新思考**\n\n"平淡"其实是一种福气。在平静中，我们才能：\n- 真正地观察和感受\n- 培养内心的平静\n- 为未来的挑战做准备\n- 享受当下的美好\n\n**实践建议**\n\n- 每天睡前花5分钟写感恩日记\n- 不要强迫自己，如果某天不想写就跳过\n- 可以拍照记录美好的瞬间\n- 与家人朋友分享你的感恩\n\n你觉得从哪个方面开始最容易？',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 18 * 60 * 1000)
        },
        {
            id: '6-11',
            type: 'user',
            content: '我想从身体方面开始，因为你说得对，健康的身体确实是最基本的，但我经常忽略它。我想试试每天记录一件关于身体的小事情，比如今天没有头痛，或者今天能正常走路。这样写会不会太简单了？',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000 + 20 * 60 * 1000)
        },
        {
            id: '6-12',
            type: 'ai',
            content: '你的想法非常棒！从身体方面开始是一个很好的选择，而且你提到的例子一点也不简单。\n\n**关于"简单"的重新思考**\n\n我们经常低估了"简单"事情的价值。实际上：\n\n- **没有头痛**：意味着你的神经系统正常工作，大脑没有受到干扰\n- **能正常走路**：意味着你的骨骼、肌肉、神经系统都在协调工作\n- **能看见**：意味着你的视觉系统正常，能接收和处理光线信息\n- **能听见**：意味着你的听觉系统正常，能感知声音的振动\n\n这些都是非常复杂的生理过程，我们往往把它们视为理所当然。\n\n**身体感恩的深度**\n\n当你开始关注身体时，你会发现：\n\n**1. 身体的智慧**\n- 身体知道什么时候需要休息\n- 身体会通过疼痛提醒我们注意\n- 身体有自我修复的能力\n- 身体能适应不同的环境\n\n**2. 身体的奇迹**\n- 心脏每天跳动约10万次\n- 肺部每天呼吸约2万次\n- 大脑有860亿个神经元\n- 身体有37万亿个细胞\n\n**3. 身体与情绪的联系**\n- 紧张时肌肉会收缩\n- 快乐时身体会放松\n- 焦虑时心跳会加快\n- 平静时呼吸会变深\n\n**具体的感恩练习**\n\n你可以这样记录：\n\n"今天，我的身体：\n- 让我能够[具体的动作]\n- 没有[具体的疼痛或不适]\n- 感受到了[具体的感觉]\n- 帮助我完成了[具体的事情]\n\n今天我想特别感谢我的[身体部位]，因为[具体原因]"\n\n**扩展练习**\n\n随着练习的深入，你可以：\n- 关注身体的不同系统（呼吸、循环、消化等）\n- 观察身体与情绪的关系\n- 感谢身体在困难时期的支持\n- 关注身体的需求和信号\n\n**关于"太简单"的思考**\n\n简单的事情往往是最重要的。就像：\n- 呼吸是简单的，但生命离不开它\n- 心跳是简单的，但它是生命的节拍\n- 微笑是简单的，但能带来快乐\n\n你的感恩练习一点也不简单，它是对生命奇迹的深刻认识。\n\n你觉得这个方向怎么样？有什么具体的身体感受你想从今天开始记录吗？',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 22 * 60 * 1000)
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
