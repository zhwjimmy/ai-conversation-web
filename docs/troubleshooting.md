# 故障排除指南

## 常见问题及解决方案

### 1. 项目启动问题

#### 问题：`npm install` 失败
**错误信息：**
```
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /path/to/package.json
```

**解决方案：**
1. 确保在项目根目录下运行命令
2. 检查 `package.json` 文件是否存在
3. 清理 npm 缓存：`npm cache clean --force`
4. 删除 `node_modules` 和 `package-lock.json`，重新安装

#### 问题：Node.js 版本不兼容
**错误信息：**
```
error: The engine "node" is incompatible with this module
```

**解决方案：**
1. 检查 Node.js 版本：`node --version`
2. 安装 Node.js >= 16.0.0
3. 使用 nvm 管理 Node.js 版本：
   ```bash
   nvm install 18
   nvm use 18
   ```

#### 问题：端口被占用
**错误信息：**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**解决方案：**
1. 查找占用端口的进程：`lsof -i :3000`
2. 终止进程：`kill -9 <PID>`
3. 或者修改端口：在 `vite.config.js` 中修改 `server.port`

### 2. 开发环境问题

#### 问题：热重载不工作
**症状：** 修改代码后页面不自动刷新

**解决方案：**
1. 检查文件监听限制：
   ```bash
   # macOS/Linux
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```
2. 重启开发服务器
3. 检查防火墙设置

#### 问题：Vue DevTools 不显示
**症状：** 浏览器中看不到 Vue DevTools

**解决方案：**
1. 安装 Vue DevTools 浏览器扩展
2. 确保在开发模式下运行
3. 检查扩展是否启用

### 3. 构建问题

#### 问题：构建失败
**错误信息：**
```
Error: Build failed with errors
```

**解决方案：**
1. 检查代码语法错误
2. 运行 `npm run build` 查看详细错误信息
3. 确保所有依赖都已安装
4. 检查 `vite.config.js` 配置

#### 问题：构建文件过大
**症状：** 构建后的文件体积过大

**解决方案：**
1. 启用代码分割：
   ```javascript
   // vite.config.js
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['vue'],
             utils: ['axios']
           }
         }
       }
     }
   })
   ```
2. 使用动态导入：
   ```javascript
   const Component = () => import('./Component.vue')
   ```

### 4. 组件问题

#### 问题：组件不渲染
**症状：** 组件在页面中不显示

**解决方案：**
1. 检查组件是否正确导入：
   ```javascript
   import ComponentName from './ComponentName.vue'
   ```
2. 检查组件是否在 `components` 中注册
3. 检查模板中的组件名是否正确
4. 查看浏览器控制台错误信息

#### 问题：数据不更新
**症状：** 修改数据后界面不更新

**解决方案：**
1. 确保使用响应式数据：
   ```javascript
   import { ref, reactive } from 'vue'
   
   const count = ref(0)  // 基本类型
   const user = reactive({ name: 'John' })  // 对象
   ```
2. 检查数据是否在 `setup()` 中返回
3. 确保模板中的数据绑定语法正确

#### 问题：事件不触发
**症状：** 点击按钮等操作无响应

**解决方案：**
1. 检查事件绑定语法：
   ```vue
   <button @click="handleClick">点击</button>
   ```
2. 确保事件处理函数已定义
3. 检查 `emits` 声明（子组件向父组件发送事件）

### 5. 样式问题

#### 问题：样式不生效
**症状：** CSS 样式没有应用到元素上

**解决方案：**
1. 检查 CSS 选择器是否正确
2. 确认是否使用了 `scoped` 样式
3. 检查 CSS 变量是否正确定义
4. 使用浏览器开发者工具检查样式

#### 问题：响应式布局问题
**症状：** 在不同设备上显示异常

**解决方案：**
1. 检查媒体查询是否正确
2. 确认使用了相对单位（rem、em、%）
3. 测试不同屏幕尺寸
4. 使用浏览器开发者工具的设备模拟器

### 6. 网络请求问题

#### 问题：API 请求失败
**错误信息：**
```
Network Error
CORS policy
```

**解决方案：**
1. 检查 API 地址是否正确
2. 配置 CORS 策略
3. 检查网络连接
4. 使用代理配置：
   ```javascript
   // vite.config.js
   export default defineConfig({
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:8080',
           changeOrigin: true
         }
       }
     }
   })
   ```

#### 问题：请求超时
**解决方案：**
1. 增加超时时间：
   ```javascript
   const api = axios.create({
     timeout: 10000  // 10秒
   })
   ```
2. 添加重试机制
3. 检查服务器响应时间

### 7. 性能问题

#### 问题：页面加载缓慢
**解决方案：**
1. 启用代码分割
2. 使用懒加载：
   ```javascript
   const LazyComponent = defineAsyncComponent(() => import('./LazyComponent.vue'))
   ```
3. 优化图片大小和格式
4. 使用 CDN 加速

#### 问题：内存泄漏
**症状：** 长时间使用后页面变慢

**解决方案：**
1. 正确清理事件监听器
2. 使用 `onUnmounted` 清理资源
3. 避免在全局作用域创建大量对象
4. 使用浏览器开发者工具的内存分析

### 8. 浏览器兼容性问题

#### 问题：在某些浏览器中不工作
**解决方案：**
1. 检查浏览器支持情况
2. 使用 Babel 转译 ES6+ 代码
3. 添加 polyfill：
   ```bash
   npm install @babel/polyfill
   ```
4. 检查 CSS 兼容性

### 9. 调试技巧

#### 使用 Vue DevTools
1. 安装浏览器扩展
2. 在组件面板中查看组件状态
3. 使用时间旅行调试功能
4. 检查组件间的数据流

#### 使用浏览器开发者工具
1. **Console**：查看日志和错误
2. **Network**：监控网络请求
3. **Elements**：检查 DOM 结构
4. **Performance**：分析性能问题
5. **Memory**：检查内存使用

#### 添加调试代码
```javascript
// 在组件中添加调试信息
import { onMounted, watch } from 'vue'

onMounted(() => {
  console.log('组件已挂载')
})

watch(data, (newVal, oldVal) => {
  console.log('数据变化:', oldVal, '->', newVal)
})
```

### 10. 获取帮助

如果遇到其他问题：

1. **查看官方文档**：
   - [Vue.js 官方文档](https://cn.vuejs.org/)
   - [Vite 官方文档](https://vitejs.dev/)

2. **搜索解决方案**：
   - 在 [Stack Overflow](https://stackoverflow.com/) 搜索错误信息
   - 查看 [Vue.js GitHub Issues](https://github.com/vuejs/core/issues)

3. **社区支持**：
   - [Vue.js 官方论坛](https://forum.vuejs.org/)
   - [Vue.js Discord](https://discord.gg/vue)

4. **项目相关**：
   - 查看项目的 GitHub Issues
   - 提交新的 Issue 描述问题

### 11. 预防措施

为了避免常见问题：

1. **保持依赖更新**：
   ```bash
   npm audit
   npm update
   ```

2. **使用 TypeScript**：
   ```bash
   npm install -D typescript @vue/tsconfig
   ```

3. **添加 ESLint 和 Prettier**：
   ```bash
   npm install -D eslint prettier @vue/eslint-config-prettier
   ```

4. **编写测试**：
   ```bash
   npm install -D vitest @vue/test-utils
   ```

5. **定期备份代码**

记住：大多数问题都有解决方案，保持耐心，逐步排查问题根源。
