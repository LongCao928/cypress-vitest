import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/views/UseDemo.vue')
    },
    // access-deny
    {
      // axios intercptors.response.use() 响应拦截:根据接口返回指定字段判断，跳转至无权限页面
      path: '/access-deny',
      name: 'accessDeny',
      component: () => import('@/views/base/access-deny/AccessDeny.vue'),
      meta: {
        title: '无权访问'
      }
    },
    {
      path: '/not-found',
      name: 'notFound',
      component: () => import('@/views/base/not-found/NotFound.vue'),
      meta: {
        title: '404...'
      }
    }
  ]
})

router.beforeEach((to, form, next) => {
  console.log(to)
  if (to.meta) {
    document.title = to.meta.title ? `${to.meta.title}` : 'Vite App'
  }
  next()
})

export default router
