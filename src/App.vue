<template>
  <div id="app" class="app">
    <!-- 侧边栏 -->
    <Sidebar 
      :conversations="conversations"
      :current-conversation-id="currentConversationId"
      @select-conversation="selectConversation"
      @new-conversation="createNewConversation"
    />
    
    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 顶部工具栏 -->
      <header class="toolbar">
        <div class="toolbar-left">
          <button 
            class="menu-button"
            @click="toggleSidebar"
            :class="{ active: sidebarVisible }"
          >
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
          <h1 class="app-title">AI Conversation</h1>
        </div>
        
        <div class="toolbar-right">
          <button class="toolbar-button" @click="shareConversation">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
            </svg>
            分享
          </button>
          <button class="toolbar-button" @click="exportConversation">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            导出
          </button>
        </div>
      </header>
      
      <!-- 对话区域 -->
      <ChatArea 
        :messages="currentMessages"
        @send-message="sendMessage"
        @regenerate-message="regenerateMessage"
        @edit-message="editMessage"
        @copy-message="copyMessage"
      />
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import ChatArea from './components/ChatArea.vue'
import { mockConversations, mockMessages } from './utils/mockData.js'

export default {
  name: 'App',
  components: {
    Sidebar,
    ChatArea
  },
  setup() {
    // 响应式数据
    const conversations = ref(mockConversations)
    const currentConversationId = ref(conversations.value[0]?.id || null)
    const sidebarVisible = ref(true)
    
    // 计算属性
    const currentMessages = computed(() => {
      if (!currentConversationId.value) return []
      return mockMessages[currentConversationId.value] || []
    })
    
    // 方法
    const selectConversation = (conversationId) => {
      currentConversationId.value = conversationId
    }
    
    const createNewConversation = () => {
      const newConversation = {
        id: Date.now().toString(),
        title: '新对话',
        timestamp: new Date(),
        messageCount: 0
      }
      conversations.value.unshift(newConversation)
      currentConversationId.value = newConversation.id
    }
    
    const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value
    }
    
    const sendMessage = (message) => {
      console.log('发送消息:', message)
      // TODO: 实现消息发送逻辑
    }
    
    const regenerateMessage = (messageId) => {
      console.log('重新生成消息:', messageId)
      // TODO: 实现消息重新生成逻辑
    }
    
    const editMessage = (messageId) => {
      console.log('编辑消息:', messageId)
      // TODO: 实现消息编辑逻辑
    }
    
    const copyMessage = (messageId) => {
      console.log('复制消息:', messageId)
      // TODO: 实现消息复制逻辑
    }
    
    const shareConversation = () => {
      console.log('分享对话')
      // TODO: 实现对话分享逻辑
    }
    
    const exportConversation = () => {
      console.log('导出对话')
      // TODO: 实现对话导出逻辑
    }
    
    // 生命周期
    onMounted(() => {
      console.log('AI Conversation App 已加载')
    })
    
    return {
      conversations,
      currentConversationId,
      sidebarVisible,
      currentMessages,
      selectConversation,
      createNewConversation,
      toggleSidebar,
      sendMessage,
      regenerateMessage,
      editMessage,
      copyMessage,
      shareConversation,
      exportConversation
    }
  }
}
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
  background-color: var(--bg-primary);
  font-family: var(--font-family);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* 防止 flex 子元素溢出 */
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4) var(--spacing-6);
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  min-height: 64px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.menu-button {
  display: none;
  padding: var(--spacing-2);
  background: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu-button:hover {
  background-color: var(--gray-100);
}

.menu-button.active {
  background-color: var(--gray-200);
}

.app-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.toolbar-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.toolbar-button:hover {
  background-color: var(--gray-50);
  border-color: var(--border-hover);
  color: var(--text-primary);
}

.icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .menu-button {
    display: block;
  }
  
  .toolbar {
    padding: var(--spacing-3) var(--spacing-4);
  }
  
  .app-title {
    font-size: var(--font-size-base);
  }
  
  .toolbar-button {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-xs);
  }
  
  .toolbar-button span {
    display: none;
  }
}
</style>
