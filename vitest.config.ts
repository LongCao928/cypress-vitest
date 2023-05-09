import { fileURLToPath } from 'node:url'
/** fileURLToPath()
 * 参数<url | string>：保存文件URL字符串或要转换为路径的对象。
 * 返回<string>: 返回一个表示 fully-resolved 文件路径的字符串。
 * const url = require('url')
 * url.fileURLToPath()
 */
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,  // 扩展 vite 选项
  defineConfig({
    test: {
      // environment 默认值 node。构建 Web 端应用程序，可以使用 jsdom 或 happy-dom 这种类似浏览器的环境来替代 Node.js。
      environment: 'jsdom', // 指定测试环境
      // include 默认值 ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
      include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], // 匹配包含测试文件的 glob 规则
      // configDefaults: vitest 默认选项
      // exclude 默认值 ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*']
      exclude: [...configDefaults.exclude, 'e2e/*'], // 匹配排除测试文件的 glob 规则
      root: fileURLToPath(new URL('./', import.meta.url)),  // 项目根目录。import.meta.url 表示模块的绝对 URL。
      // 对依赖关系进行内联或外联的处理
      deps: {
        external: ['**/node_modules/**', '**/dist/**']
      },
      // 自定义测试运行程序的路径
      // runner: '',
      // 运行 vitest bench 时使用的选项
      benchmark: {
        include: ['**/*.{bench,benchmark}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: ['node_modules', 'dist', '.idea', '.git', '.cache']
      },
      // 在测试内部运行时定义自定义别名。它们将与来自 resolve.alias 的别名合并。
      alias: {},
      globals: false, // 默认情况下，vitest 不显式提供全局 API。
      testTimeout: 5000, // 测试的默认超时时间
      hookTimeout: 10000, // 钩子的默认超时时间
    }
  })
)

// vitest 读取项目根目录的 vite.config.ts 文件以匹配插件并设置为 vite 应用程序。
// 可以使用以下不同配置进行测试：
// 1. 创建 vitest.config.ts ，优先级更高
// 2. 将 --config 选项传递给 CLI, 例如 vitest --config ./path/to/vitest.config.ts
// 3. 在 defineConfig 中使用 process.env.VITEST 或 mode 属性（默认值是 test）在 vite.config.ts 中有条件的应用不同的配置。
