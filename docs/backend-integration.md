# 后端集成指南

## 概述

本文档说明如何将现有的 Vue.js 前端应用与后端 API 集成，适合后端开发者理解前端的数据流和 API 调用方式。

## 当前项目状态

目前项目使用模拟数据（`src/utils/mockData.js`），所有数据都是静态的。要接入真实后端，需要：

1. 替换模拟数据为 API 调用
2. 添加 HTTP 客户端
3. 实现错误处理
4. 添加加载状态

## 推荐的 API 设计

### 1. 对话管理 API

```http
# 获取对话列表
GET /api/conversations
Response: {
  "data": [
    {
      "id": "conv_123",
      "title": "Vue.js 开发讨论",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T11:45:00Z",
      "message_count": 8
    }
  ]
}

# 创建新对话
POST /api/conversations
Request: {
  "title": "新对话"
}
Response: {
  "data": {
    "id": "conv_456",
    "title": "新对话",
    "created_at": "2024-01-15T12:00:00Z",
    "message_count": 0
  }
}

# 获取对话详情
GET /api/conversations/{id}
Response: {
  "data": {
    "id": "conv_123",
    "title": "Vue.js 开发讨论",
    "messages": [
      {
        "id": "msg_1",
        "type": "user",
        "content": "你好",
        "created_at": "2024-01-15T10:30:00Z"
      },
      {
        "id": "msg_2",
        "type": "ai",
        "content": "你好！有什么可以帮助您的吗？",
        "created_at": "2024-01-15T10:30:15Z"
      }
    ]
  }
}

# 更新对话标题
PUT /api/conversations/{id}
Request: {
  "title": "新的对话标题"
}

# 删除对话
DELETE /api/conversations/{id}
```

### 2. 消息管理 API

```http
# 发送消息
POST /api/conversations/{id}/messages
Request: {
  "content": "用户消息内容",
  "type": "user",
  "image_url": "optional_image_url"
}
Response: {
  "data": {
    "id": "msg_123",
    "type": "user",
    "content": "用户消息内容",
    "created_at": "2024-01-15T10:30:00Z"
  }
}

# 获取 AI 回复（流式响应）
POST /api/conversations/{id}/messages/{message_id}/reply
Response: Server-Sent Events (SSE) 或 WebSocket
```

### 3. 文件上传 API

```http
# 上传图片
POST /api/upload/image
Request: multipart/form-data
Response: {
  "data": {
    "url": "https://cdn.example.com/images/abc123.jpg",
    "filename": "image.jpg",
    "size": 1024000
  }
}
```

## 前端集成步骤

### 1. 安装 HTTP 客户端

```bash
npm install axios
```

### 2. 创建 API 服务

创建 `src/services/api.js`：

```javascript
import axios from 'axios'

// 创建 axios 实例
const api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证 token
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 统一错误处理
    if (error.response?.status === 401) {
      // 未授权，跳转到登录页
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API 方法
export const conversationAPI = {
  // 获取对话列表
  getConversations: () => api.get('/conversations'),
  
  // 创建新对话
  createConversation: (title) => api.post('/conversations', { title }),
  
  // 获取对话详情
  getConversation: (id) => api.get(`/conversations/${id}`),
  
  // 更新对话标题
  updateConversation: (id, title) => api.put(`/conversations/${id}`, { title }),
  
  // 删除对话
  deleteConversation: (id) => api.delete(`/conversations/${id}`)
}

export const messageAPI = {
  // 发送消息
  sendMessage: (conversationId, content, imageUrl = null) => 
    api.post(`/conversations/${conversationId}/messages`, {
      content,
      type: 'user',
      image_url: imageUrl
    }),
  
  // 获取 AI 回复（流式）
  getAIReply: (conversationId, messageId) => 
    api.post(`/conversations/${conversationId}/messages/${messageId}/reply`)
}

export const uploadAPI = {
  // 上传图片
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default api
```

### 3. 创建状态管理

创建 `src/stores/conversation.js`（使用 Pinia）：

```bash
npm install pinia
```

```javascript
import { defineStore } from 'pinia'
import { conversationAPI, messageAPI } from '@/services/api'

export const useConversationStore = defineStore('conversation', {
  state: () => ({
    conversations: [],
    currentConversation: null,
    messages: [],
    loading: false,
    error: null
  }),

  actions: {
    // 获取对话列表
    async fetchConversations() {
      this.loading = true
      this.error = null
      try {
        const response = await conversationAPI.getConversations()
        this.conversations = response.data
      } catch (error) {
        this.error = error.message
        console.error('获取对话列表失败:', error)
      } finally {
        this.loading = false
      }
    },

    // 创建新对话
    async createConversation(title = '新对话') {
      try {
        const response = await conversationAPI.createConversation(title)
        this.conversations.unshift(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    // 选择对话
    async selectConversation(id) {
      this.loading = true
      try {
        const response = await conversationAPI.getConversation(id)
        this.currentConversation = response.data
        this.messages = response.data.messages || []
      } catch (error) {
        this.error = error.message
        console.error('获取对话详情失败:', error)
      } finally {
        this.loading = false
      }
    },

    // 发送消息
    async sendMessage(content, imageUrl = null) {
      if (!this.currentConversation) return

      try {
        const response = await messageAPI.sendMessage(
          this.currentConversation.id,
          content,
          imageUrl
        )
        
        // 添加用户消息
        this.messages.push(response.data)
        
        // 获取 AI 回复
        await this.getAIReply(response.data.id)
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    // 获取 AI 回复
    async getAIReply(messageId) {
      if (!this.currentConversation) return

      try {
        // 添加加载中的 AI 消息
        const loadingMessage = {
          id: `loading_${Date.now()}`,
          type: 'ai',
          content: '',
          isLoading: true,
          created_at: new Date().toISOString()
        }
        this.messages.push(loadingMessage)

        // 调用 AI 回复 API
        const response = await messageAPI.getAIReply(
          this.currentConversation.id,
          messageId
        )

        // 移除加载消息，添加真实回复
        this.messages = this.messages.filter(msg => msg.id !== loadingMessage.id)
        this.messages.push(response.data)
      } catch (error) {
        // 移除加载消息
        this.messages = this.messages.filter(msg => msg.id !== `loading_${Date.now()}`)
        this.error = error.message
        throw error
      }
    }
  }
})
```

### 4. 修改组件使用 API

修改 `src/App.vue`：

```vue
<template>
  <div id="app" class="app">
    <Sidebar 
      :conversations="conversationStore.conversations"
      :current-conversation-id="conversationStore.currentConversation?.id"
      :loading="conversationStore.loading"
      @select-conversation="selectConversation"
      @new-conversation="createNewConversation"
    />
    
    <main class="main-content">
      <!-- 错误提示 -->
      <div v-if="conversationStore.error" class="error-banner">
        {{ conversationStore.error }}
        <button @click="conversationStore.error = null">×</button>
      </div>
      
      <header class="toolbar">
        <!-- 工具栏内容 -->
      </header>
      
      <ChatArea 
        :messages="conversationStore.messages"
        :loading="conversationStore.loading"
        @send-message="sendMessage"
      />
    </main>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useConversationStore } from '@/stores/conversation'
import Sidebar from './components/Sidebar.vue'
import ChatArea from './components/ChatArea.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    ChatArea
  },
  setup() {
    const conversationStore = useConversationStore()

    // 组件挂载时获取对话列表
    onMounted(async () => {
      await conversationStore.fetchConversations()
    })

    // 选择对话
    const selectConversation = async (id) => {
      await conversationStore.selectConversation(id)
    }

    // 创建新对话
    const createNewConversation = async () => {
      const newConversation = await conversationStore.createConversation()
      await conversationStore.selectConversation(newConversation.id)
    }

    // 发送消息
    const sendMessage = async (messageData) => {
      try {
        await conversationStore.sendMessage(
          messageData.text,
          messageData.image
        )
      } catch (error) {
        console.error('发送消息失败:', error)
      }
    }

    return {
      conversationStore,
      selectConversation,
      createNewConversation,
      sendMessage
    }
  }
}
</script>
```

### 5. 环境变量配置

创建 `.env` 文件：

```bash
# 开发环境
VITE_API_BASE_URL=http://localhost:8080/api

# 生产环境
# VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## 错误处理策略

### 1. 网络错误处理
```javascript
// 在 API 服务中添加重试机制
const retryRequest = async (config, retries = 3) => {
  try {
    return await api(config)
  } catch (error) {
    if (retries > 0 && error.response?.status >= 500) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return retryRequest(config, retries - 1)
    }
    throw error
  }
}
```

### 2. 用户友好的错误提示
```vue
<template>
  <div v-if="error" class="error-message">
    <div class="error-content">
      <span class="error-icon">⚠️</span>
      <span class="error-text">{{ error }}</span>
      <button @click="retry" class="retry-button">重试</button>
    </div>
  </div>
</template>
```

## 性能优化建议

### 1. 分页加载
```javascript
// 对话列表分页
const fetchConversations = async (page = 1, limit = 20) => {
  const response = await api.get(`/conversations?page=${page}&limit=${limit}`)
  return response.data
}
```

### 2. 虚拟滚动
对于大量消息，使用虚拟滚动组件：
```bash
npm install @tanstack/vue-virtual
```

### 3. 缓存策略
```javascript
// 使用浏览器缓存
const cacheKey = `conversation_${id}`
const cached = localStorage.getItem(cacheKey)
if (cached) {
  return JSON.parse(cached)
}
```

## 部署配置

### 1. 构建配置
```javascript
// vite.config.js
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'axios'],
          ui: ['@vueuse/core']
        }
      }
    }
  }
})
```

### 2. Nginx 配置
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        root /var/www/ai-conversation-web/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 测试建议

### 1. API 测试
```javascript
// 使用 Jest 测试 API 调用
import { conversationAPI } from '@/services/api'

describe('Conversation API', () => {
  test('should fetch conversations', async () => {
    const conversations = await conversationAPI.getConversations()
    expect(conversations.data).toBeDefined()
  })
})
```

### 2. 组件测试
```javascript
// 使用 Vue Test Utils 测试组件
import { mount } from '@vue/test-utils'
import ChatArea from '@/components/ChatArea.vue'

test('should render messages', () => {
  const wrapper = mount(ChatArea, {
    props: {
      messages: mockMessages
    }
  })
  expect(wrapper.findAll('.message-bubble')).toHaveLength(mockMessages.length)
})
```

## 总结

集成后端 API 的主要步骤：

1. **设计 RESTful API**：遵循 REST 规范
2. **安装 HTTP 客户端**：使用 axios
3. **创建 API 服务层**：封装所有 API 调用
4. **实现状态管理**：使用 Pinia 管理应用状态
5. **修改组件**：替换模拟数据为真实 API 调用
6. **错误处理**：添加完善的错误处理机制
7. **性能优化**：实现分页、缓存等优化策略

这样就能将静态的前端应用转换为与后端 API 集成的动态应用。
