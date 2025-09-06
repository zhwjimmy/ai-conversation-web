<template>
  <div class="message-bubble" :class="messageClasses">
    <!-- 用户头像 -->
    <div v-if="message.type === 'user'" class="message-avatar">
      <div class="avatar user-avatar">
        <svg viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
    </div>
    
    <!-- AI 头像 -->
    <div v-else class="message-avatar">
      <div class="avatar ai-avatar">
        <svg viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    </div>
    
    <!-- 消息内容 -->
    <div class="message-content">
      <div class="message-header">
        <span class="message-author">{{ messageAuthor }}</span>
        <span class="message-time">{{ formatTime(message.timestamp) }}</span>
      </div>
      
      <div class="message-body">
        <!-- 文本内容 -->
        <div v-if="message.content" class="message-text" v-html="formatMessage(message.content)"></div>
        
        <!-- 图片内容 -->
        <div v-if="message.image" class="message-image">
          <img :src="message.image" :alt="message.imageAlt || '图片'" />
        </div>
        
        <!-- 加载状态 -->
        <div v-if="message.isLoading" class="message-loading">
          <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div v-if="message.type === 'ai' && !message.isLoading" class="message-actions">
        <button 
          class="action-button"
          @click="$emit('regenerate', message.id)"
          title="重新生成"
        >
          <svg viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
        </button>
        <button 
          class="action-button"
          @click="$emit('edit', message.id)"
          title="编辑"
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
        <button 
          class="action-button"
          @click="$emit('copy', message.id)"
          title="复制"
        >
          <svg viewBox="0 0 24 24">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'MessageBubble',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  emits: ['regenerate', 'edit', 'copy'],
  setup(props) {
    // 计算消息样式类
    const messageClasses = computed(() => ({
      'user-message': props.message.type === 'user',
      'ai-message': props.message.type === 'ai',
      'loading': props.message.isLoading
    }))
    
    // 计算消息作者
    const messageAuthor = computed(() => {
      return props.message.type === 'user' ? '您' : 'AI 助手'
    })
    
    // 格式化时间
    const formatTime = (timestamp) => {
      const time = new Date(timestamp)
      return time.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    // 格式化消息内容（支持简单的 Markdown）
    const formatMessage = (content) => {
      if (!content) return ''
      
      // 简单的 Markdown 处理
      return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>')
    }
    
    return {
      messageClasses,
      messageAuthor,
      formatTime,
      formatMessage
    }
  }
}
</script>

<style scoped>
.message-bubble {
  display: flex;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
}

.user-message {
  flex-direction: row-reverse;
}

.ai-message {
  flex-direction: row;
}

.message-avatar {
  flex-shrink: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.user-avatar {
  background-color: var(--primary-blue);
}

.ai-avatar {
  background-color: var(--primary-green);
}

.message-content {
  flex: 1;
  max-width: 70%;
  min-width: 0;
}

.user-message .message-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.ai-message .message-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.message-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-1);
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.user-message .message-header {
  flex-direction: row-reverse;
}

.message-author {
  font-weight: 500;
}

.message-body {
  position: relative;
}

.message-text {
  background-color: var(--gray-100);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-normal);
  color: var(--text-primary);
  word-wrap: break-word;
}

.user-message .message-text {
  background-color: var(--primary-blue);
  color: white;
  border-bottom-right-radius: var(--radius-sm);
}

.ai-message .message-text {
  background-color: var(--gray-100);
  color: var(--text-primary);
  border-bottom-left-radius: var(--radius-sm);
}

.message-text :deep(code) {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: var(--radius-sm);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
}

.user-message .message-text :deep(code) {
  background-color: rgba(255, 255, 255, 0.2);
}

.message-image {
  margin-top: var(--spacing-2);
}

.message-image img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.message-loading {
  background-color: var(--gray-100);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-lg);
  border-bottom-left-radius: var(--radius-sm);
}

.loading-dots {
  display: flex;
  gap: var(--spacing-1);
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background-color: var(--text-tertiary);
  border-radius: var(--radius-full);
  animation: loading 1.4s infinite ease-in-out;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loading {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.message-actions {
  display: flex;
  gap: var(--spacing-1);
  margin-top: var(--spacing-2);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.message-bubble:hover .message-actions {
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

.action-button svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .message-content {
    max-width: 85%;
  }
  
  .avatar {
    width: 32px;
    height: 32px;
  }
  
  .message-text {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
  }
  
  .message-actions {
    opacity: 1; /* 移动端始终显示操作按钮 */
  }
}
</style>
