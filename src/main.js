import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css'

// 创建 Vue 应用实例
const app = createApp(App)

// 全局配置
app.config.globalProperties.$appName = 'AI Conversation'

// 挂载应用
app.mount('#app')
