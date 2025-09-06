#!/bin/bash

# AI Conversation Web 启动脚本

echo "🚀 启动 AI Conversation Web 应用..."

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js (>= 16.0.0)"
    exit 1
fi

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm，请先安装 npm"
    exit 1
fi

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装项目依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
fi

# 启动开发服务器
echo "🌐 启动开发服务器..."
echo "📱 应用将在 http://localhost:3000 打开"
echo "🛑 按 Ctrl+C 停止服务器"
echo ""

npm run dev
