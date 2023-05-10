<template>
  <div class="container-fixed">
    <div class="error-bg"></div>
    <div class="error-tip">抱歉，您访问的页面出错了</div>
    <div class="error-btn-wrap">
      <button @click="goHome">返回首页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function goHome() {
  router.push({ name: 'home'})
}

</script>

<style scoped>
  .error-bg {
    width: 536px;
    height: 261px;
    background: url('./images/404@2x.png') center center no-repeat;
    background-size: 100% 100%;
    margin: 18vh auto 0;
  }

  .error-tip {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    font-style: italic;
    margin-top: 50px;
  }

  .error-btn-wrap {
    margin-top: 30px;
    text-align: center;
  }
</style>
