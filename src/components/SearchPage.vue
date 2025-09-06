<template>
  <div class="search-page">
    <!-- 搜索标题 -->
    <div class="search-header">
      <h1 class="search-title">搜索</h1>
    </div>
    
    <!-- 搜索框 -->
    <div class="search-input-container">
      <div class="search-input-wrapper">
        <svg class="search-icon" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input 
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="搜索对话"
          @input="handleSearch"
          @keyup.enter="handleSearch"
        />
      </div>
    </div>
    
    <!-- 近期对话 -->
    <div class="recent-conversations">
      <h2 class="section-title">近期对话</h2>
      <div class="conversations-list">
        <div 
          v-for="conversation in filteredConversations" 
          :key="conversation.id"
          class="conversation-item"
          @click="selectConversation(conversation.id)"
        >
          <div class="conversation-content">
            <h3 class="conversation-title">{{ conversation.title }}</h3>
            <p class="conversation-date">{{ formatDate(conversation.timestamp) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'SearchPage',
  props: {
    conversations: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select-conversation', 'close-search'],
  setup(props, { emit }) {
    const searchQuery = ref('')
    
    // 过滤对话列表
    const filteredConversations = computed(() => {
      if (!searchQuery.value.trim()) {
        // 如果没有搜索词，显示所有对话
        return props.conversations
      }
      
      // 根据搜索词过滤对话
      const query = searchQuery.value.toLowerCase()
      return props.conversations.filter(conversation => 
        conversation.title.toLowerCase().includes(query)
      )
    })
    
    // 处理搜索
    const handleSearch = () => {
      // 搜索逻辑已在 computed 中处理
    }
    
    // 选择对话
    const selectConversation = (conversationId) => {
      emit('select-conversation', conversationId)
      // 自动关闭搜索页面，回到对话页面
      emit('close-search')
    }
    
    // 格式化日期
    const formatDate = (timestamp) => {
      const date = new Date(timestamp)
      const now = new Date()
      const diff = now - date
      
      if (diff < 86400000) { // 24小时内
        return '今天'
      } else if (diff < 172800000) { // 48小时内
        return '昨天'
      } else if (diff < 604800000) { // 7天内
        return `${Math.floor(diff / 86400000)}天前`
      } else {
        return date.toLocaleDateString('zh-CN', {
          month: 'numeric',
          day: 'numeric'
        })
      }
    }
    
    // 监听搜索页面显示状态，重置搜索词
    watch(() => props.visible, (newVisible) => {
      if (newVisible) {
        searchQuery.value = ''
      }
    })
    
    return {
      searchQuery,
      filteredConversations,
      handleSearch,
      selectConversation,
      formatDate
    }
  }
}
</script>

<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-primary);
  padding: var(--spacing-8) 120px;
  max-width: 100%;
  margin: 0;
}

.search-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.search-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.search-input-container {
  margin-bottom: var(--spacing-8);
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: var(--spacing-4);
  width: 20px;
  height: 20px;
  fill: var(--text-tertiary);
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: var(--spacing-4) var(--spacing-4) var(--spacing-4) var(--spacing-12);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background-color: white;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

.search-input::placeholder {
  color: var(--text-tertiary);
}

.recent-conversations {
  flex: 1;
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-6) 0;
}

.conversations-list {
  display: flex;
  flex-direction: column;
}

.conversation-item {
  padding: var(--spacing-4) 0;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.conversation-item:hover {
  background-color: var(--gray-50);
  margin: 0 calc(-1 * var(--spacing-4));
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
  border-radius: var(--radius-md);
}

.conversation-item:last-child {
  border-bottom: none;
}

.conversation-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.conversation-title {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: var(--spacing-4);
}

.conversation-date {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin: 0;
  white-space: nowrap;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-page {
    padding: var(--spacing-6) var(--spacing-4);
  }
  
  .search-title {
    font-size: var(--font-size-xl);
  }
  
  .conversation-content {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-1);
  }
  
  .conversation-title {
    margin-right: 0;
  }
}
</style>
