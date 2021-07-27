<template>
  <div>
    <h1>ref computed</h1>
    <h3>{{count}}</h3>
    <h3>{{double}}</h3>
    <button @click="increase">+1</button>
  </div>
</template>

<script lang="ts">

import { ref, computed } from 'vue'

export default {
  name: 'basic',
  setup() {
    const count = ref(0)
    const double = computed(() => {
      return count.value*2
    })
    const increase = () => {
      count.value++
    }
    return {
      count,
      increase,
      double
    }
  }
};
</script>