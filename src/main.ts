import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import GlobalComponentA from './components/GlobalComponentA.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 全局注册组件
app.component('GlobalComponentA', GlobalComponentA)

// 全局注册指令
app.directive('focus', {
  mounted: (el) => el.focus()
})

app.mount('#app')
