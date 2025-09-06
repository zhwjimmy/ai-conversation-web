<template>
  <div id="app" class="app">
    <!-- 侧边栏 -->
    <Sidebar 
      :conversations="conversations"
      :current-conversation-id="currentConversationId"
      :visible="sidebarVisible"
      @select-conversation="selectConversation"
      @toggle-sidebar="toggleSidebar"
      @open-search="openSearch"
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
          <div class="user-avatar">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
      </header>
      
      <!-- 对话区域 -->
      <ChatArea 
        v-if="!searchVisible"
        ref="chatAreaRef"
        :messages="currentMessages"
        @regenerate-message="regenerateMessage"
        @edit-message="editMessage"
        @copy-message="copyMessage"
      />
      
      <!-- 搜索页面 -->
      <SearchPage 
        v-if="searchVisible"
        :conversations="conversations"
        :visible="searchVisible"
        @select-conversation="selectConversation"
        @close-search="closeSearch"
      />
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import ChatArea from './components/ChatArea.vue'
import SearchPage from './components/SearchPage.vue'
import { mockConversations, mockMessages } from './utils/mockData.js'

export default {
  name: 'App',
  components: {
    Sidebar,
    ChatArea,
    SearchPage
  },
  setup() {
    // 响应式数据
    const conversations = ref(mockConversations)
    const currentConversationId = ref(conversations.value[0]?.id || null)
    const sidebarVisible = ref(true)
    const searchVisible = ref(false)
    const chatAreaRef = ref(null)
    
    // 计算属性
    const currentMessages = computed(() => {
      if (!currentConversationId.value) return []
      const messages = mockMessages[currentConversationId.value]
      return Array.isArray(messages) ? messages : []
    })
    
    // 方法
    const selectConversation = (conversationId) => {
      try {
        currentConversationId.value = conversationId
        // 如果搜索页面正在显示，关闭搜索页面
        if (searchVisible.value) {
          searchVisible.value = false
        }
        // 切换对话后滚动到顶部
        setTimeout(() => {
          try {
            if (chatAreaRef.value && typeof chatAreaRef.value.scrollToTop === 'function') {
              chatAreaRef.value.scrollToTop()
            }
          } catch (error) {
            console.warn('切换对话滚动失败:', error)
          }
        }, 200)
      } catch (error) {
        console.warn('切换对话失败:', error)
      }
    }
    
    
    const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value
    }
    
    const openSearch = () => {
      searchVisible.value = true
    }
    
    const closeSearch = () => {
      searchVisible.value = false
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
      searchVisible,
      chatAreaRef,
      currentMessages,
      selectConversation,
      toggleSidebar,
      openSearch,
      closeSearch,
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
  height: 100vh; /* 确保主内容区域占满视口高度 */
  overflow: hidden; /* 防止整体页面滚动 */
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

.user-avatar {
  width: 32px;
  height: 32px;
  background-color: var(--gray-200);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.user-avatar:hover {
  background-color: var(--gray-300);
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
