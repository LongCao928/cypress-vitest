
import { onMounted, onUnmounted } from 'vue'

// ReturnType
type TCallback = (e: any) => void

/* interface ICallback {
  (e: any): void
} */

export function useEventListener(target: Window | HTMLElement, event: string, callback: TCallback) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}