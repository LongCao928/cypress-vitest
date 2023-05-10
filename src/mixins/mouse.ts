import { ref } from 'vue' // , onMounted, onUnmounted
import { useEventListener } from './event'

// 组合式函数名以 use 开头

export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  /* function update(event: MouseEvent) {
    // 组合式函数可以随时更改其状态
    x.value = event.pageX
    y.value = event.pageY
  } */
  // 一个组合式函数也可以挂靠在所属组件的生命周期上来启动和卸载副作用。
  /* onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update)) */

  useEventListener(window, 'mousemove', (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}