<template>
  <div class="message-bubble" :class="messageClasses">
    <!-- 用户消息：显示气泡 -->
    <div v-if="message.type === 'user'" class="user-message-content">
      <div class="message-text" v-html="displayContent"></div>
    </div>
    
    <!-- AI 消息：直接显示内容，无气泡 -->
    <div v-else class="ai-message-content">
      <div class="message-text" v-html="displayContent"></div>
      
      <!-- 操作按钮 -->
      <div v-if="!message.isLoading" class="message-actions">
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
      
      <!-- 加载状态 -->
      <div v-if="message.isLoading" class="message-loading">
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { renderFullMarkdown } from '../utils/markdownRenderer.js'

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
    const displayContent = ref('')
    const isRendering = ref(false)
    const isMounted = ref(true)
    
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
    
    // 简单格式化（用于用户消息）
    const simpleFormat = (content) => {
      if (!content) return ''
      return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>')
    }
    
    // 渲染消息内容
    const renderContent = async () => {
      if (!props.message.content) {
        if (isMounted.value) {
          displayContent.value = ''
        }
        return
      }
      
      // 如果是用户消息，使用简单格式化
      if (props.message.type === 'user') {
        if (isMounted.value) {
          displayContent.value = simpleFormat(props.message.content)
        }
        return
      }
      
      // 如果是 AI 消息，使用完整的 Markdown 渲染
      try {
        if (isMounted.value) {
          isRendering.value = true
        }
        console.log('开始渲染 AI 消息:', props.message.content.substring(0, 100) + '...')
        const rendered = await renderFullMarkdown(props.message.content)
        console.log('AI 消息渲染完成:', rendered.substring(0, 200) + '...')
        
        // 只有在组件仍然挂载时才更新响应式数据
        if (isMounted.value) {
          displayContent.value = rendered
        }
      } catch (error) {
        console.error('Markdown 渲染失败:', error)
        // 如果渲染失败，回退到简单格式化
        if (isMounted.value) {
          displayContent.value = simpleFormat(props.message.content)
        }
      } finally {
        if (isMounted.value) {
          isRendering.value = false
        }
      }
    }
    
    // 组件挂载时渲染内容
    onMounted(async () => {
      await renderContent()
    })
    
    // 监听消息内容变化
    const stopWatcher = watch(() => props.message.content, async () => {
      await renderContent()
    })
    
    // 组件销毁时清理
    onUnmounted(() => {
      try {
        isMounted.value = false
        stopWatcher()
      } catch (error) {
        console.warn('清理 MessageBubble watcher 失败:', error)
      }
    })
    
    return {
      messageClasses,
      messageAuthor,
      formatTime,
      displayContent,
      isRendering
    }
  }
}
</script>

<style scoped>
.message-bubble {
  margin-bottom: var(--spacing-6);
}

/* 用户消息样式 */
.user-message-content {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--spacing-4);
}

.user-message-content .message-text {
  background-color: #ffffff;
  color: var(--text-primary);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-lg);
  border-bottom-right-radius: var(--radius-sm);
  max-width: 80%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  word-wrap: break-word;
}

/* AI 消息样式 */
.ai-message-content {
  background-color: transparent;
  padding: var(--spacing-4) var(--spacing-5);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-4);
}

.ai-message-content .message-text {
  background-color: transparent;
  color: var(--text-primary);
  padding: 0;
  border-radius: 0;
  border: none;
  box-shadow: none;
  width: 100%;
  margin: 0;
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  word-wrap: break-word;
}

/* 操作按钮样式 */
.message-actions {
  display: flex;
  gap: var(--spacing-2);
  margin-top: var(--spacing-3);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.ai-message-content:hover .message-actions {
  opacity: 1;
}

.action-button {
  background: none;
  border: none;
  padding: var(--spacing-2);
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
}

.action-button svg {
  width: 16px;
  height: 16px;
}

/* 加载状态样式 */
.message-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-4);
}

.loading-dots {
  display: flex;
  gap: var(--spacing-1);
}

.loading-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--text-secondary);
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

/* 内联代码样式 */
.message-text :deep(code:not(.hljs)) {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: var(--radius-sm);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
}

.user-message .message-text :deep(code:not(.hljs)) {
  background-color: rgba(255, 255, 255, 0.2);
}

/* 代码块样式 */
.message-text :deep(pre) {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  margin: var(--spacing-3) 0;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  line-height: 1.5;
}

.message-text :deep(pre code) {
  background: none;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
  color: inherit;
}

/* 代码高亮主题 */
.message-text :deep(.hljs) {
  background: #f8f9fa;
  color: #333;
}

.message-text :deep(.hljs-comment),
.message-text :deep(.hljs-quote) {
  color: #6a737d;
  font-style: italic;
}

.message-text :deep(.hljs-keyword),
.message-text :deep(.hljs-selector-tag),
.message-text :deep(.hljs-subst) {
  color: #d73a49;
  font-weight: bold;
}

.message-text :deep(.hljs-number),
.message-text :deep(.hljs-literal),
.message-text :deep(.hljs-variable),
.message-text :deep(.hljs-template-variable),
.message-text :deep(.hljs-tag .hljs-attr) {
  color: #005cc5;
}

.message-text :deep(.hljs-string),
.message-text :deep(.hljs-doctag) {
  color: #032f62;
}

.message-text :deep(.hljs-title),
.message-text :deep(.hljs-section),
.message-text :deep(.hljs-selector-id) {
  color: #6f42c1;
  font-weight: bold;
}

.message-text :deep(.hljs-type),
.message-text :deep(.hljs-class .hljs-title) {
  color: #d73a49;
  font-weight: bold;
}

.message-text :deep(.hljs-tag),
.message-text :deep(.hljs-name),
.message-text :deep(.hljs-attribute) {
  color: #22863a;
  font-weight: normal;
}

.message-text :deep(.hljs-regexp),
.message-text :deep(.hljs-link) {
  color: #032f62;
}

.message-text :deep(.hljs-symbol),
.message-text :deep(.hljs-bullet) {
  color: #e36209;
}

.message-text :deep(.hljs-built_in),
.message-text :deep(.hljs-builtin-name) {
  color: #005cc5;
}

.message-text :deep(.hljs-meta) {
  color: #6a737d;
}

.message-text :deep(.hljs-deletion) {
  background: #ffeef0;
}

.message-text :deep(.hljs-addition) {
  background: #f0fff4;
}

.message-text :deep(.hljs-emphasis) {
  font-style: italic;
}

.message-text :deep(.hljs-strong) {
  font-weight: bold;
}

/* AI 消息的 Markdown 样式 */
.ai-message .message-text :deep(h1),
.ai-message .message-text :deep(h2),
.ai-message .message-text :deep(h3),
.ai-message .message-text :deep(h4),
.ai-message .message-text :deep(h5),
.ai-message .message-text :deep(h6) {
  font-weight: 600;
  margin: var(--spacing-4) 0 var(--spacing-2) 0;
  color: var(--text-primary);
}

.ai-message .message-text :deep(h1) { font-size: 1.5em; }
.ai-message .message-text :deep(h2) { font-size: 1.3em; }
.ai-message .message-text :deep(h3) { font-size: 1.1em; }

.ai-message .message-text :deep(p) {
  margin: var(--spacing-2) 0;
  line-height: 1.6;
}

.ai-message .message-text :deep(ul),
.ai-message .message-text :deep(ol) {
  margin: var(--spacing-2) 0;
  padding-left: var(--spacing-6);
}

.ai-message .message-text :deep(li) {
  margin: var(--spacing-1) 0;
  line-height: 1.5;
}

.ai-message .message-text :deep(strong) {
  font-weight: 600;
  color: var(--text-primary);
}

.ai-message .message-text :deep(em) {
  font-style: italic;
}

.ai-message .message-text :deep(code) {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  color: #d63384;
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
