
import { ref, unref, isRef, watchEffect, type Ref } from 'vue'

/* interface IError {
  [key: string]: any
  message?: string
} */

export function useFetch(url: string) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => {
      console.log(res)
      return res.json()
    })
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}

// 每次 URl 改变时都重新请求
export function useFetchWatch(url: Ref<string>) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // 请求之前重设状态
    data.value = null
    error.value = null
    // unref(url) 若 url 确实是一个 ref，它的 .value 会被返回; 否则，maybeRef 会被原样返回
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    // 若输入的 UEL 是一个 ref，那么启动一个响应式的请求
    watchEffect(doFetch)
  } else {
    doFetch()
  }

  return { data, error }
}