<template>
  <aside class="sidebar" :class="{ collapsed: !visible }">
    <!-- 侧边栏头部 -->
    <div class="sidebar-header">
      <button class="menu-toggle-button" @click="$emit('toggle-sidebar')" title="目录">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>
      <button v-if="visible" class="search-button" @click="$emit('open-search')" title="搜索">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </button>
    </div>
    
    <div v-if="visible" class="conversations-list" ref="conversationsList" @scroll="handleScroll">
      <div 
        v-for="conversation in displayedConversations" 
        :key="conversation.id"
        class="conversation-item"
        :class="{ active: conversation.id === currentConversationId }"
        @click="selectConversation(conversation.id)"
        @mouseenter="showMenuButton(conversation.id)"
        @mouseleave="hideMenuButton(conversation.id)"
      >
        <div class="conversation-content">
          <h3 class="conversation-title">{{ conversation.title }}</h3>
          <p class="conversation-meta">
            {{ formatTime(conversation.timestamp) }} · {{ conversation.messageCount }} 条消息
          </p>
        </div>
        
        <!-- 三点菜单按钮 -->
        <div 
          class="menu-button-container"
          :class="{ visible: hoveredConversationId === conversation.id }"
        >
          <button 
            class="menu-button"
            @click.stop="toggleContextMenu(conversation.id, $event)"
            title="更多选项"
          >
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 加载更多提示 -->
      <div v-if="hasMore && !isLoading" class="load-more-trigger">
        <div class="load-more-text">滚动加载更多</div>
      </div>
      
      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-indicator">
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="loading-text">加载中...</div>
      </div>
      
      <!-- 没有更多数据 -->
      <div v-if="!hasMore && displayedConversations.length > 0" class="no-more-data">
        <div class="no-more-text">已显示全部对话</div>
      </div>
    </div>
    
    <!-- 上下文菜单 -->
    <div 
      v-if="showContextMenu"
      class="context-menu"
      :style="contextMenuStyle"
      @click.stop
    >
      <div class="menu-item" @click="editConversationTitle(contextMenuConversationId)">
        <svg class="menu-icon" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
        <span>重命名</span>
      </div>
      <div class="menu-item" @click="deleteConversation(contextMenuConversationId)">
        <svg class="menu-icon" viewBox="0 0 24 24">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
        <span>删除</span>
      </div>
    </div>
    
    <!-- 遮罩层，点击关闭菜单 -->
    <div 
      v-if="showContextMenu"
      class="context-menu-overlay"
      @click="closeContextMenu"
    ></div>
    
    <div v-if="visible" class="sidebar-footer">
      <div class="user-info">
        <div class="avatar">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div class="user-details">
          <p class="user-name">用户</p>
          <p class="user-status">在线</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'Sidebar',
  props: {
    conversations: {
      type: Array,
      default: () => []
    },
    currentConversationId: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  emits: ['select-conversation', 'edit-conversation', 'delete-conversation', 'toggle-sidebar', 'open-search'],
  setup(props, { emit }) {
    // 响应式数据
    const hoveredConversationId = ref(null)
    const showContextMenu = ref(false)
    const contextMenuConversationId = ref(null)
    const contextMenuStyle = ref({})
    
    // 懒加载相关
    const conversationsList = ref(null)
    const displayedCount = ref(15) // 初始显示15条，确保有滚动条
    const isLoading = ref(false)
    const hasMore = ref(true)
    
    // 计算显示的对话列表
    const displayedConversations = computed(() => {
      return props.conversations.slice(0, displayedCount.value)
    })
    
    // 检查是否还有更多数据
    const checkHasMore = () => {
      hasMore.value = displayedCount.value < props.conversations.length
    }
    
    // 初始化
    const initializeLazyLoad = () => {
      checkHasMore()
    }
    
    // 格式化时间
    const formatTime = (timestamp) => {
      const now = new Date()
      const time = new Date(timestamp)
      const diff = now - time
      
      if (diff < 60000) { // 1分钟内
        return '刚刚'
      } else if (diff < 3600000) { // 1小时内
        return `${Math.floor(diff / 60000)}分钟前`
      } else if (diff < 86400000) { // 24小时内
        return `${Math.floor(diff / 3600000)}小时前`
      } else if (diff < 604800000) { // 7天内
        return `${Math.floor(diff / 86400000)}天前`
      } else {
        return time.toLocaleDateString('zh-CN', {
          month: 'short',
          day: 'numeric'
        })
      }
    }
    
    // 选择对话
    const selectConversation = (conversationId) => {
      emit('select-conversation', conversationId)
      closeContextMenu()
    }
    
    // 显示菜单按钮
    const showMenuButton = (conversationId) => {
      hoveredConversationId.value = conversationId
    }
    
    // 隐藏菜单按钮
    const hideMenuButton = (conversationId) => {
      if (hoveredConversationId.value === conversationId) {
        hoveredConversationId.value = null
      }
    }
    
    // 切换上下文菜单
    const toggleContextMenu = (conversationId, event) => {
      if (showContextMenu.value && contextMenuConversationId.value === conversationId) {
        closeContextMenu()
        return
      }
      
      contextMenuConversationId.value = conversationId
      showContextMenu.value = true
      
      // 计算菜单位置
      const rect = event.target.closest('.conversation-item').getBoundingClientRect()
      const sidebarRect = event.target.closest('.sidebar').getBoundingClientRect()
      
      contextMenuStyle.value = {
        position: 'fixed',
        top: `${rect.bottom + 4}px`,
        left: `${rect.right - 120}px`, // 菜单宽度约120px，右对齐
        zIndex: 1000
      }
    }
    
    // 关闭上下文菜单
    const closeContextMenu = () => {
      showContextMenu.value = false
      contextMenuConversationId.value = null
    }
    
    // 编辑对话标题
    const editConversationTitle = (conversationId) => {
      closeContextMenu()
      const newTitle = prompt('请输入新的对话标题:')
      if (newTitle && newTitle.trim()) {
        emit('edit-conversation', conversationId, newTitle.trim())
      }
    }
    
    // 删除对话
    const deleteConversation = (conversationId) => {
      closeContextMenu()
      if (confirm('确定要删除这个对话吗？此操作无法撤销。')) {
        emit('delete-conversation', conversationId)
      }
    }
    
    // 处理滚动事件
    const handleScroll = (event) => {
      const { scrollTop, scrollHeight, clientHeight } = event.target
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight
      
      // 当滚动到90%时触发加载更多
      if (scrollPercentage > 0.9 && hasMore.value && !isLoading.value) {
        loadMoreConversations()
      }
    }
    
    // 加载更多对话
    const loadMoreConversations = async () => {
      if (isLoading.value || !hasMore.value) return
      
      isLoading.value = true
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 增加显示数量
      displayedCount.value += 5
      checkHasMore()
      
      isLoading.value = false
    }
    
    // 组件挂载时初始化
    onMounted(() => {
      initializeLazyLoad()
    })
    
    return {
      hoveredConversationId,
      showContextMenu,
      contextMenuConversationId,
      contextMenuStyle,
      conversationsList,
      displayedConversations,
      hasMore,
      isLoading,
      formatTime,
      selectConversation,
      showMenuButton,
      hideMenuButton,
      toggleContextMenu,
      closeContextMenu,
      editConversationTitle,
      deleteConversation,
      handleScroll,
      loadMoreConversations
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  background-color: var(--bg-primary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar.collapsed .sidebar-header {
  justify-content: center;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-primary);
}

.menu-toggle-button,
.search-button {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.menu-toggle-button:hover,
.search-button:hover {
  background-color: var(--gray-100);
  color: var(--text-primary);
}

.menu-toggle-button .icon,
.search-button .icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.conversations-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-2);
}

.conversation-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-4);
  margin: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;
}

.conversation-item:hover {
  background-color: var(--gray-100);
}

.conversation-item.active {
  background-color: #e3f2fd;
  color: var(--text-primary);
}

.conversation-item.active .conversation-title {
  color: var(--text-primary);
}

.conversation-item.active .conversation-meta {
  color: var(--text-secondary);
}

.conversation-content {
  flex: 1;
  min-width: 0;
}

.conversation-title {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-1) 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-meta {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin: 0;
}

/* 三点菜单按钮容器 */
.menu-button-container {
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.menu-button-container.visible {
  opacity: 1;
}

.menu-button {
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-tertiary);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.menu-button:hover {
  background-color: var(--gray-200);
  color: var(--text-primary);
}

.conversation-item.active .menu-button {
  color: rgba(0, 0, 0, 0.6);
}

.conversation-item.active .menu-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
}

/* 上下文菜单 */
.context-menu {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: var(--spacing-1);
  min-width: 120px;
  z-index: 1000;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.menu-item:hover {
  background-color: var(--gray-100);
}

.menu-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

/* 遮罩层 */
.context-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: transparent;
}

/* 懒加载相关样式 */
.load-more-trigger,
.loading-indicator,
.no-more-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
  margin: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
}

.load-more-text,
.loading-text,
.no-more-text {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  text-align: center;
}


.loading-dots {
  display: flex;
  gap: var(--spacing-1);
  margin-bottom: var(--spacing-2);
}

.loading-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--text-tertiary);
  animation: loading-bounce 1.4s ease-in-out infinite both;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loading-bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.sidebar-footer {
  padding: var(--spacing-4);
  border-top: 1px solid var(--border-color);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: var(--gray-200);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-1) 0;
}

.user-status {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin: 0;
}

.icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
  }
  
  .sidebar.collapsed {
    transform: translateX(-100%);
  }
}
</style>
