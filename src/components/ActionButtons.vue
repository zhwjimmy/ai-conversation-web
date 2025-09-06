<template>
  <div class="action-buttons">
    <button 
      v-for="action in actions" 
      :key="action.id"
      class="action-button"
      :class="action.class"
      :disabled="action.disabled"
      @click="handleAction(action)"
      :title="action.title"
    >
      <svg v-if="action.icon" class="icon" viewBox="0 0 24 24">
        <path :d="action.icon" />
      </svg>
      <span v-if="action.label" class="label">{{ action.label }}</span>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ActionButtons',
  props: {
    type: {
      type: String,
      default: 'message', // 'message', 'conversation', 'toolbar'
      validator: (value) => ['message', 'conversation', 'toolbar'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    customActions: {
      type: Array,
      default: () => []
    }
  },
  emits: ['action-click'],
  setup(props, { emit }) {
    // 默认操作配置
    const defaultActions = {
      message: [
        {
          id: 'regenerate',
          label: '重新生成',
          icon: 'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z',
          class: 'regenerate-button',
          title: '重新生成回复'
        },
        {
          id: 'edit',
          label: '编辑',
          icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
          class: 'edit-button',
          title: '编辑消息'
        },
        {
          id: 'copy',
          label: '复制',
          icon: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
          class: 'copy-button',
          title: '复制到剪贴板'
        }
      ],
      conversation: [
        {
          id: 'share',
          label: '分享',
          icon: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z',
          class: 'share-button',
          title: '分享对话'
        },
        {
          id: 'export',
          label: '导出',
          icon: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
          class: 'export-button',
          title: '导出对话'
        },
        {
          id: 'delete',
          label: '删除',
          icon: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
          class: 'delete-button',
          title: '删除对话'
        }
      ],
      toolbar: [
        {
          id: 'settings',
          label: '设置',
          icon: 'M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z',
          class: 'settings-button',
          title: '应用设置'
        },
        {
          id: 'help',
          label: '帮助',
          icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z',
          class: 'help-button',
          title: '帮助和支持'
        }
      ]
    }
    
    // 计算当前操作列表
    const actions = computed(() => {
      if (props.customActions.length > 0) {
        return props.customActions
      }
      return defaultActions[props.type] || []
    })
    
    // 处理操作点击
    const handleAction = (action) => {
      if (action.disabled) return
      
      emit('action-click', {
        type: props.type,
        action: action.id,
        data: action
      })
    }
    
    return {
      actions,
      handleAction
    }
  }
}
</script>

<style scoped>
.action-buttons {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
}

.action-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-2);
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover:not(:disabled) {
  background-color: var(--gray-50);
  border-color: var(--border-hover);
  color: var(--text-primary);
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-button .icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.action-button .label {
  font-weight: 500;
}

/* 特定按钮样式 */
.regenerate-button:hover:not(:disabled) {
  background-color: rgba(52, 168, 83, 0.1);
  border-color: var(--primary-green);
  color: var(--primary-green);
}

.edit-button:hover:not(:disabled) {
  background-color: rgba(66, 133, 244, 0.1);
  border-color: var(--primary-blue);
  color: var(--primary-blue);
}

.copy-button:hover:not(:disabled) {
  background-color: rgba(251, 188, 4, 0.1);
  border-color: var(--primary-yellow);
  color: var(--primary-yellow);
}

.share-button:hover:not(:disabled) {
  background-color: rgba(66, 133, 244, 0.1);
  border-color: var(--primary-blue);
  color: var(--primary-blue);
}

.export-button:hover:not(:disabled) {
  background-color: rgba(52, 168, 83, 0.1);
  border-color: var(--primary-green);
  color: var(--primary-green);
}

.delete-button:hover:not(:disabled) {
  background-color: rgba(234, 67, 53, 0.1);
  border-color: var(--primary-red);
  color: var(--primary-red);
}

.settings-button:hover:not(:disabled) {
  background-color: rgba(102, 102, 102, 0.1);
  border-color: var(--gray-600);
  color: var(--gray-600);
}

.help-button:hover:not(:disabled) {
  background-color: rgba(66, 133, 244, 0.1);
  border-color: var(--primary-blue);
  color: var(--primary-blue);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .action-button .label {
    display: none;
  }
  
  .action-button {
    padding: var(--spacing-1);
    min-width: 32px;
    justify-content: center;
  }
}
</style>
