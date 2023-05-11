
<template>
  <!-- <GlobalComponentA msg="demo"></GlobalComponentA> -->
  <div>
    Load post id:
    <button v-for="i in 5" @click="id = i" :key="i">{{ i }}</button>
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div v-else-if="data">
      Data loaded:
      <pre>{{ data }}</pre>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetchWatch } from '@/mixins/fetch' // useFetch
const baseURL = 'https://jsonplaceholder.typicode.com/todos/'
const id = ref(1)
const url = computed((): string => baseURL + id.value)
// const url = ref('https://jsonplaceholder.typicode.com/todos/1')
// useFetch(url)
// const url = 'http://jsonplaceholder.typicode.com/todos'
const { data, error } = useFetchWatch(url)
</script>

<style scoped>
button {
  width: 50px;
  height: 30px;
}
</style>