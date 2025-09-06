<template>
  <div class="input-area">
    <div class="input-container">
      <!-- 图片预览 -->
      <div v-if="imagePreview" class="image-preview">
        <img :src="imagePreview" alt="预览图片" />
        <button class="remove-image" @click="removeImage">
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      
      <div class="input-wrapper">
        <!-- 文本输入框 -->
        <textarea
          ref="textareaRef"
          v-model="messageText"
          class="message-input"
          :placeholder="placeholder"
          rows="1"
          @keydown="handleKeydown"
          @input="adjustTextareaHeight"
          @paste="handlePaste"
        ></textarea>
        
        <!-- 操作按钮 -->
        <div class="input-actions">
          <!-- 图片上传按钮 -->
          <button 
            class="action-button upload-button"
            @click="triggerFileUpload"
            title="上传图片"
          >
            <svg viewBox="0 0 24 24">
              <path d="M19 7v2.99s-1.99.01-2 0V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3h2v3c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7c0-1.1.9-2-2-2s-2 .9-2 2v10c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V7c0-1.1-.9-2-2-2z"/>
            </svg>
          </button>
          
          <!-- 发送按钮 -->
          <button 
            class="action-button send-button"
            :disabled="!canSend"
            @click="sendMessage"
            title="发送消息"
          >
            <svg viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 隐藏的文件输入 -->
      <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        style="display: none"
        @change="handleFileSelect"
      />
    </div>
    
    <!-- 输入提示 -->
    <div class="input-hint">
      <p>按 Enter 发送，Shift + Enter 换行</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, nextTick, onMounted } from 'vue'

export default {
  name: 'InputArea',
  emits: ['send-message', 'upload-image'],
  setup(props, { emit }) {
    const textareaRef = ref(null)
    const fileInputRef = ref(null)
    const messageText = ref('')
    const imagePreview = ref('')
    const selectedFile = ref(null)
    
    // 计算属性
    const canSend = computed(() => {
      return messageText.value.trim().length > 0 || selectedFile.value
    })
    
    const placeholder = computed(() => {
      return selectedFile.value ? '添加消息内容（可选）' : '输入消息...'
    })
    
    // 调整文本域高度
    const adjustTextareaHeight = () => {
      nextTick(() => {
        if (textareaRef.value) {
          textareaRef.value.style.height = 'auto'
          const scrollHeight = textareaRef.value.scrollHeight
          const maxHeight = 120 // 最大高度
          textareaRef.value.style.height = Math.min(scrollHeight, maxHeight) + 'px'
        }
      })
    }
    
    // 处理键盘事件
    const handleKeydown = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        sendMessage()
      }
    }
    
    // 处理粘贴事件
    const handlePaste = (event) => {
      const items = event.clipboardData?.items
      if (items) {
        for (let item of items) {
          if (item.type.indexOf('image') !== -1) {
            const file = item.getAsFile()
            if (file) {
              handleImageFile(file)
            }
            break
          }
        }
      }
    }
    
    // 触发文件上传
    const triggerFileUpload = () => {
      fileInputRef.value?.click()
    }
    
    // 处理文件选择
    const handleFileSelect = (event) => {
      const file = event.target.files?.[0]
      if (file) {
        handleImageFile(file)
      }
    }
    
    // 处理图片文件
    const handleImageFile = (file) => {
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件')
        return
      }
      
      // 检查文件大小（5MB）
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过 5MB')
        return
      }
      
      selectedFile.value = file
      
      // 创建预览
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value = e.target.result
      }
      reader.readAsDataURL(file)
    }
    
    // 移除图片
    const removeImage = () => {
      selectedFile.value = null
      imagePreview.value = ''
      if (fileInputRef.value) {
        fileInputRef.value.value = ''
      }
    }
    
    // 发送消息
    const sendMessage = () => {
      if (!canSend.value) return
      
      const message = {
        text: messageText.value.trim(),
        image: selectedFile.value
      }
      
      emit('send-message', message)
      
      // 清空输入
      messageText.value = ''
      removeImage()
      adjustTextareaHeight()
      
      // 聚焦输入框
      nextTick(() => {
        textareaRef.value?.focus()
      })
    }
    
    // 组件挂载后聚焦输入框
    onMounted(() => {
      textareaRef.value?.focus()
    })
    
    return {
      textareaRef,
      fileInputRef,
      messageText,
      imagePreview,
      selectedFile,
      canSend,
      placeholder,
      adjustTextareaHeight,
      handleKeydown,
      handlePaste,
      triggerFileUpload,
      handleFileSelect,
      removeImage,
      sendMessage
    }
  }
}
</script>

<style scoped>
.input-area {
  padding: var(--spacing-6);
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  flex-shrink: 0; /* 防止输入区域被压缩 */
}

.input-container {
  max-width: 100%;
  margin: 0 auto;
}

.image-preview {
  position: relative;
  margin-bottom: var(--spacing-3);
  display: inline-block;
}

.image-preview img {
  max-width: 200px;
  max-height: 200px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.remove-image {
  position: absolute;
  top: var(--spacing-1);
  right: var(--spacing-1);
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: var(--radius-full);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.remove-image:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.remove-image svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-2);
  padding: var(--spacing-4);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  transition: border-color 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.input-wrapper:focus-within {
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 1px var(--primary-blue);
}

.message-input {
  flex: 1;
  min-height: 24px;
  max-height: 120px;
  background: none;
  border: none;
  outline: none;
  resize: none;
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--text-primary);
}

.message-input::placeholder {
  color: var(--text-tertiary);
}

.input-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
}

.action-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.upload-button {
  background-color: transparent;
  color: var(--text-tertiary);
}

.upload-button:hover {
  background-color: var(--gray-200);
  color: var(--text-primary);
}

.send-button {
  background-color: var(--primary-blue);
  color: white;
}

.send-button:hover:not(:disabled) {
  background-color: var(--primary-hover);
}

.send-button:disabled {
  background-color: var(--gray-300);
  color: var(--text-tertiary);
  cursor: not-allowed;
}

.action-button svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.input-hint {
  margin-top: var(--spacing-2);
  text-align: center;
}

.input-hint p {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .input-area {
    padding: var(--spacing-3) var(--spacing-4);
  }
  
  .input-wrapper {
    padding: var(--spacing-2);
  }
  
  .action-button {
    width: 36px;
    height: 36px;
  }
  
  .action-button svg {
    width: 18px;
    height: 18px;
  }
  
  .image-preview img {
    max-width: 150px;
    max-height: 150px;
  }
}
</style>
