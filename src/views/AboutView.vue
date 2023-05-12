<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <input type="text" v-model="val" />
      <span>{{ val }}</span>
      <input type="text" v-model="data.name" v-focus />
      <div>{{ data.name }}</div>
    </div>
    <div>Mouse position is at: {{ x }}, {{ y }}</div>
    <GlobalComponentA msg="about" @click-event="handleComClick">
      slot content
    </GlobalComponentA>

    <button @click="show = !show">Toggle</button>
    <Transition>
      <p v-if="show">hello</p>
    </Transition>

    <div style="margin: 20px 0;">
      <button @click="addItems" style="margin-right: 10px;">添加</button>
      <button @click="removeItems">删除</button>
    </div>
    <TransitionGroup name="list" tag="ul">
      <li v-for="item in items" :key="item">
        {{ item }}
      </li>
    </TransitionGroup>

    <div>
      <button @click="open = true">Open Modal</button>
    </div>
    <Teleport to="body">
      <div v-if="open" class="modal">
        <p>Hello from the modal!</p>
        <button @click="open = false">Close</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
// composition
import { ref, watch, watchEffect, reactive, onMounted, onUnmounted, h } from 'vue'
import { useMouse } from '../mixins/mouse'
// import { vFocus } from '@/directives/focu'
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

 function handleComClick(event: number) {
  console.log(event)
 }

//  指令
/* const vFocus = {
  mounted: (el) => el.focus()
} */

onMounted(() => {
  console.log('onMounted函数触发')
})

onUnmounted(() => {
  console.log('onUnmounted函数触发')
})

// 渲染函数 hyperscript(h)  createVnode()

const vnode = h(
  'div',
  'hello'
)

console.log(vnode)

const show = ref(false)

const items = reactive([1, 2, 3, 4, 5])

const addItems = () => {
  items.push(items.length + 1)
}

const removeItems = () => {
  items.pop()
}

const open = ref(false)
</script>

<style>
@media (min-width: 1024px) {
  /* .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-wrap: wrap; 
  }*/
  input {
    margin-right: 10px;
  }
}

/* 当一个 <Transition> 组件中的元素被插入或移除时，会发生下面那这些事情：
    1.Vue 会自动检测目标元素是否应用了 CSS 过渡或动画。如果是，则一些过渡 css 会在适当的时机被添加和移除。
    2.如果有作为监听器的 JavaScript 钩子，这些钩子函数会在适当时机被调用。
    3.如果没有探测到 CSS 过渡或动画、也没有提供 JavaScript 钩子，那么 DOM 的插入、删除操作将在浏览器的下一个动画帧后执行。
  
  一共有 6 个应用于进入与离开过渡效果的 CSS class。
  Enter：[v-enter-from/v-enter-to] v-enter-active
  Leave: [v-leave-from/v-leave-to] v-leave-from
  
  */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}


.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.modal {
  border-radius: 10px;
  box-shadow: 10px 5px 10px 5px rgba(97, 192, 53, 0.7);
  padding: 20px;
  background: #fff;
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  text-align: center;
}
</style>
