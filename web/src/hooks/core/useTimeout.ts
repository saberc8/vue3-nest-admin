import { ref } from 'vue'
import { tryOnUnmounted } from '@vueuse/core'
import { isFunction } from '@/utils/is'

export function useTimeoutFn(handle: Fn<any>, wait: number) {
  if (!isFunction(handle)) {
    throw new Error('handle is not Function!')
  }
  const { readyRef, stop, start } = useTimeoutRef(wait)
  handle()
  return { readyRef, stop, start }
}

export function useTimeoutRef(wait: number) {
  const readyRef = ref(false)

  let timer: TimeoutHandle
  function stop(): void {
    readyRef.value = false
    timer && window.clearTimeout(timer)
  }
  function start(): void {
    stop()
    timer = setTimeout(() => {
      readyRef.value = true
    }, wait)
  }

  start()

  tryOnUnmounted(stop)

  return { readyRef, stop, start }
}
