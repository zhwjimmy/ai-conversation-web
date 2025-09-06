<template>
  <div class="chat-area">
    <!-- 消息列表 -->
    <div class="messages-container" ref="messagesContainer">
      <div v-if="messages.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        </div>
        <h3 class="empty-title">开始新的对话</h3>
        <p class="empty-description">向 AI 助手提问，开始您的智能对话体验</p>
      </div>
      
      <div v-else class="messages-list">
        <MessageBubble
          v-for="message in messages"
          :key="message.id"
          :message="message"
          @regenerate="regenerateMessage"
          @edit="editMessage"
          @copy="copyMessage"
        />
      </div>
    </div>
    
  </div>
</template>

<script>
import { ref, nextTick, watch, defineExpose, onUnmounted } from 'vue'
import MessageBubble from './MessageBubble.vue'

export default {
  name: 'ChatArea',
  components: {
    MessageBubble
  },
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  },
  emits: ['regenerate-message', 'edit-message', 'copy-message'],
  setup(props, { emit }) {
    const messagesContainer = ref(null)
    
    // 自动滚动到底部
    const scrollToBottom = (smooth = true) => {
      nextTick(() => {
        try {
          if (messagesContainer.value && messagesContainer.value.scrollTo) {
            messagesContainer.value.scrollTo({
              top: messagesContainer.value.scrollHeight,
              behavior: smooth ? 'smooth' : 'auto'
            })
          }
        } catch (error) {
          console.warn('滚动到底部失败:', error)
        }
      })
    }
    
    // 滚动到顶部
    const scrollToTop = (smooth = true) => {
      nextTick(() => {
        try {
          if (messagesContainer.value && messagesContainer.value.scrollTo) {
            messagesContainer.value.scrollTo({
              top: 0,
              behavior: smooth ? 'smooth' : 'auto'
            })
          }
        } catch (error) {
          console.warn('滚动到顶部失败:', error)
        }
      })
    }
    
    // 监听消息变化，自动滚动
    const stopWatcher = watch(() => props.messages, (newMessages) => {
      if (newMessages && newMessages.length > 0) {
        scrollToBottom()
      }
    }, { deep: true })
    
    // 组件销毁时清理
    onUnmounted(() => {
      try {
        stopWatcher()
      } catch (error) {
        console.warn('清理 watcher 失败:', error)
      }
    })
    
    
    // 重新生成消息
    const regenerateMessage = (messageId) => {
      emit('regenerate-message', messageId)
    }
    
    // 编辑消息
    const editMessage = (messageId) => {
      emit('edit-message', messageId)
    }
    
    // 复制消息
    const copyMessage = (messageId) => {
      emit('copy-message', messageId)
    }
    
    // 暴露方法给父组件
    defineExpose({
      scrollToBottom,
      scrollToTop
    })
    
    return {
      messagesContainer,
      regenerateMessage,
      editMessage,
      copyMessage
    }
  }
}
</script>

<style scoped>
.chat-area {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-primary);
  min-height: 0; /* 确保 flex 子元素可以收缩 */
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-8) 120px;
  scroll-behavior: smooth;
  min-height: 0; /* 确保可以滚动 */
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--text-secondary);
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin-bottom: var(--spacing-6);
  opacity: 0.5;
}

.empty-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.empty-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-2) 0;
}

.empty-description {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin: 0;
  max-width: 400px;
}

.messages-list {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

/* 滚动条样式 */
.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.messages-container::-webkit-scrollbar-thumb {
  background-color: var(--gray-300);
  border-radius: var(--radius-full);
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background-color: var(--gray-400);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .messages-container {
    padding: var(--spacing-6) var(--spacing-4);
  }
  
  .empty-icon {
    width: 60px;
    height: 60px;
    margin-bottom: var(--spacing-4);
  }
  
  .empty-title {
    font-size: var(--font-size-lg);
  }
  
  .empty-description {
    font-size: var(--font-size-sm);
  }
}
</style>
