
<template>
  <div ref="div"
    @click="$emit('clickEvent', 26)"
  >
    {{ msg }}
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const div = ref(null)
defineProps(['msg'])
defineEmits(['clickEvent'])
</script>

<style lang="scss" scoped>
div {
  cursor: pointer;
}
</style>