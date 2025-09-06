import { marked } from 'marked'
import hljs from 'highlight.js'

// 配置 marked
marked.setOptions({
    breaks: true, // 支持换行
    gfm: true, // 支持 GitHub Flavored Markdown
    sanitize: false, // 允许 HTML（需要谨慎处理）
    smartLists: true,
    smartypants: true,
    headerIds: false, // 不生成标题 ID
    mangle: false // 不混淆邮箱地址
})

// 配置 highlight.js
hljs.configure({
    languages: ['javascript', 'typescript', 'python', 'java', 'cpp', 'c', 'css', 'html', 'json', 'xml', 'bash', 'sql', 'markdown', 'yaml', 'dockerfile']
})

/**
 * 渲染 Markdown 文本为 HTML
 * @param {string} markdownText - Markdown 文本
 * @returns {string} 渲染后的 HTML
 */
export function renderMarkdown(markdownText) {
    if (!markdownText) return ''

    try {
        // 预处理 Markdown 文本
        let processedText = preprocessMarkdown(markdownText)

        // 使用 marked 将 Markdown 转换为 HTML
        const html = marked.parse(processedText)

        // 对代码块进行高亮处理
        const highlightedHtml = highlightCodeBlocks(html)

        return highlightedHtml
    } catch (error) {
        console.error('Markdown 渲染错误:', error)
        return markdownText // 如果渲染失败，返回原始文本
    }
}

/**
 * 预处理 Markdown 文本
 * @param {string} text - 原始 Markdown 文本
 * @returns {string} 处理后的文本
 */
function preprocessMarkdown(text) {
    // 确保标题前后有适当的空行
    text = text.replace(/([^\n])\n(#{1,6}\s)/g, '$1\n\n$2')
    text = text.replace(/(#{1,6}\s[^\n]+)\n([^\n#])/g, '$1\n\n$2')

    // 确保列表前后有适当的空行
    text = text.replace(/([^\n])\n([-*+]\s)/g, '$1\n\n$2')
    text = text.replace(/([-*+]\s[^\n]+)\n([^\n-*+])/g, '$1\n\n$2')

    // 确保代码块前后有适当的空行
    text = text.replace(/([^\n])\n(```)/g, '$1\n\n$2')
    text = text.replace(/(```[^\n]*\n[\s\S]*?```)\n([^\n])/g, '$1\n\n$2')

    // 确保数学公式前后有适当的空行
    text = text.replace(/([^\n])\n(\$\$)/g, '$1\n\n$2')
    text = text.replace(/(\$\$[^\n]*\n[\s\S]*?\$\$)\n([^\n])/g, '$1\n\n$2')

    return text
}

/**
 * 对 HTML 中的代码块进行语法高亮
 * @param {string} html - 包含代码块的 HTML
 * @returns {string} 高亮后的 HTML
 */
function highlightCodeBlocks(html) {
    // 创建临时 DOM 元素来解析 HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html

    // 查找所有代码块
    const codeBlocks = tempDiv.querySelectorAll('pre code')

    codeBlocks.forEach(block => {
        try {
            // 获取代码内容
            const code = block.textContent

            // 尝试检测语言
            const language = detectLanguage(block.className, code)

            // 进行语法高亮
            const highlighted = hljs.highlight(code, { language }).value

            // 替换内容
            block.innerHTML = highlighted

            // 添加语言类名
            if (language) {
                block.className = `hljs language-${language}`
            } else {
                block.className = 'hljs'
            }
        } catch (error) {
            console.warn('代码高亮失败:', error)
            // 如果高亮失败，保持原样
        }
    })

    return tempDiv.innerHTML
}

/**
 * 检测代码语言
 * @param {string} className - 代码块的类名
 * @param {string} code - 代码内容
 * @returns {string} 检测到的语言
 */
function detectLanguage(className, code) {
    // 从类名中提取语言
    const classMatch = className.match(/language-(\w+)/)
    if (classMatch) {
        return classMatch[1]
    }

    // 从代码内容推断语言
    const firstLine = code.split('\n')[0].trim()

    // 常见的语言标识
    const languageHints = {
        '#!/bin/bash': 'bash',
        '#!/usr/bin/env python': 'python',
        '#!/usr/bin/env node': 'javascript',
        'import ': 'javascript',
        'from ': 'python',
        'def ': 'python',
        'function ': 'javascript',
        'class ': 'javascript',
        'public class': 'java',
        '#include': 'cpp',
        'SELECT': 'sql',
        'CREATE': 'sql',
        'INSERT': 'sql',
        'UPDATE': 'sql',
        'DELETE': 'sql'
    }

    for (const [hint, language] of Object.entries(languageHints)) {
        if (firstLine.includes(hint)) {
            return language
        }
    }

    return 'text' // 默认语言
}

/**
 * 初始化 MathJax（如果页面中有数学公式）
 * @param {string} html - 包含数学公式的 HTML
 * @returns {Promise<string>} 处理后的 HTML
 */
export async function renderMathJax(html) {
    // 检查是否包含数学公式
    if (!html.includes('$') && !html.includes('\\(') && !html.includes('\\[')) {
        return html
    }

    // 动态加载 MathJax
    if (typeof window !== 'undefined' && !window.MathJax) {
        await loadMathJax()
    }

    // 如果 MathJax 可用，进行渲染
    if (window.MathJax) {
        try {
            // 创建临时元素
            const tempDiv = document.createElement('div')
            tempDiv.innerHTML = html

            // 使用 MathJax 渲染数学公式
            await window.MathJax.typesetPromise([tempDiv])

            return tempDiv.innerHTML
        } catch (error) {
            console.warn('MathJax 渲染失败:', error)
            return html
        }
    }

    return html
}

/**
 * 动态加载 MathJax
 */
function loadMathJax() {
    return new Promise((resolve, reject) => {
        if (window.MathJax) {
            resolve()
            return
        }

        // 直接加载 MathJax，不使用 polyfill
        const mathJaxScript = document.createElement('script')
        mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
        mathJaxScript.onload = () => {
            window.MathJax = {
                tex: {
                    inlineMath: [['$', '$'], ['\\(', '\\)']],
                    displayMath: [['$$', '$$'], ['\\[', '\\]']]
                },
                options: {
                    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
                }
            }
            resolve()
        }
        mathJaxScript.onerror = (error) => {
            console.warn('MathJax 加载失败，将跳过数学公式渲染:', error)
            resolve() // 即使失败也继续，不影响其他功能
        }
        document.head.appendChild(mathJaxScript)
    })
}

/**
 * 完整的 Markdown 渲染函数（包含代码高亮，暂时禁用数学公式）
 * @param {string} markdownText - Markdown 文本
 * @returns {Promise<string>} 完全渲染后的 HTML
 */
export async function renderFullMarkdown(markdownText) {
    if (!markdownText) return ''

    try {
        console.log('开始渲染 Markdown:', markdownText.substring(0, 100) + '...')

        // 1. 渲染 Markdown
        const html = renderMarkdown(markdownText)
        console.log('Markdown 渲染结果:', html.substring(0, 200) + '...')

        // 2. 暂时跳过数学公式渲染，避免网络问题
        // const finalHtml = await renderMathJax(html)
        const finalHtml = html
        console.log('最终渲染结果:', finalHtml.substring(0, 200) + '...')

        return finalHtml
    } catch (error) {
        console.error('完整 Markdown 渲染错误:', error)
        return markdownText
    }
}
