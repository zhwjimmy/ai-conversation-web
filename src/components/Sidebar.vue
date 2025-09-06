<template>
  <aside class="sidebar" :class="{ collapsed: !visible }">
    <div class="sidebar-header">
      <button class="new-chat-button" @click="$emit('new-conversation')">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        新对话
      </button>
    </div>
    
    <div class="conversations-list">
      <div 
        v-for="conversation in conversations" 
        :key="conversation.id"
        class="conversation-item"
        :class="{ active: conversation.id === currentConversationId }"
        @click="$emit('select-conversation', conversation.id)"
      >
        <div class="conversation-content">
          <h3 class="conversation-title">{{ conversation.title }}</h3>
          <p class="conversation-meta">
            {{ formatTime(conversation.timestamp) }} · {{ conversation.messageCount }} 条消息
          </p>
        </div>
        
        <div class="conversation-actions">
          <button 
            class="action-button"
            @click.stop="editConversationTitle(conversation.id)"
            title="编辑标题"
          >
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <button 
            class="action-button"
            @click.stop="deleteConversation(conversation.id)"
            title="删除对话"
          >
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div class="sidebar-footer">
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
import { ref } from 'vue'

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
  emits: ['select-conversation', 'new-conversation', 'edit-conversation', 'delete-conversation'],
  setup(props, { emit }) {
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
    
    // 编辑对话标题
    const editConversationTitle = (conversationId) => {
      const newTitle = prompt('请输入新的对话标题:')
      if (newTitle && newTitle.trim()) {
        emit('edit-conversation', conversationId, newTitle.trim())
      }
    }
    
    // 删除对话
    const deleteConversation = (conversationId) => {
      if (confirm('确定要删除这个对话吗？此操作无法撤销。')) {
        emit('delete-conversation', conversationId)
      }
    }
    
    return {
      formatTime,
      editConversationTitle,
      deleteConversation
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.sidebar.collapsed {
  transform: translateX(-100%);
}

.sidebar-header {
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--border-color);
}

.new-chat-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  background-color: var(--primary-blue);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.new-chat-button:hover {
  background-color: var(--primary-hover);
}

.conversations-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-2);
}

.conversation-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-3);
  margin-bottom: var(--spacing-1);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;
}

.conversation-item:hover {
  background-color: var(--gray-100);
}

.conversation-item.active {
  background-color: var(--primary-blue);
  color: white;
}

.conversation-item.active .conversation-title {
  color: white;
}

.conversation-item.active .conversation-meta {
  color: rgba(255, 255, 255, 0.8);
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

.conversation-actions {
  display: flex;
  gap: var(--spacing-1);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.conversation-item:hover .conversation-actions {
  opacity: 1;
}

.action-button {
  padding: var(--spacing-1);
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-tertiary);
  transition: all 0.2s ease;
}

.action-button:hover {
  background-color: var(--gray-200);
  color: var(--text-primary);
}

.conversation-item.active .action-button {
  color: rgba(255, 255, 255, 0.8);
}

.conversation-item.active .action-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
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
