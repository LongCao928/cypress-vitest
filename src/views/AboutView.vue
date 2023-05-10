<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <input type="text" v-model="val">
      <span>{{ val }}</span>
      <input type="text" v-model="data.name" />
      <div>{{ data.name }}</div>
    </div>
    <div>Mouse position is at: {{ x }}, {{ y }}</div>
  </div>
</template>

<script setup lang="ts">
// composition
import { ref, watch, watchEffect, reactive } from 'vue'
import { useMouse } from '../mixins/mouse'
const { x, y } = useMouse()
interface IData {
  name: string
}
const val = ref('')
const data = reactive<IData>({
  name: ''
})

/* watch(val, (newVal, oldVal) => {
  console.log(newVal, oldVal)
}, { immediate: true }) */

/* watchEffect(() => {
  console.log('触发了watchEffect')
  console.log(val.value)
}) */

watch(() => data.name, (newVal, oldVal) => {
  console.log(`newVal: ${newVal}, oldVal: ${oldVal}`)
})

watchEffect(() => {
  console.log('触发了watchEffect')
  console.log(data.name)
})

/** watch 与 watchEffect 区别
 * 1. watch 默认懒执行，仅当数据源变化时才会执行回调。可通过 { immediate: true } 更改。
 * 2. watch 需要明确执行监听的数据源，watchEffect 会自动追踪所有访问到的响应式属性。
 * 相同点：都可以监听响应式数据并执行回调。
 */

</script>

<style>
@media (min-width: 1024px) {
  .about {
    /* min-height: 100vh;
    display: flex;
    align-items: center;
    flex-wrap: wrap; */
  }
  input {
    margin-right: 10px;
  }
}
</style>
