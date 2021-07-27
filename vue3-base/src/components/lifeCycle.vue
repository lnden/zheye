<template>
  <h1>生命周期</h1>
  <h1>{{counter}}</h1>
  <button @click="handleChange">更新</button>
</template>

<script lang="ts">
import {ref, onMounted, onUpdated, onRenderTriggered} from 'vue'
export default {
  setup() {
    const counter = ref(0)
    const handleChange = () => {
      counter.value++
    }
    onMounted(() => {
      console.log('mounted')
    })
    onUpdated(() => {
      console.log('onUpdate')
    })

    onRenderTriggered((e) => {
      console.log(e)
    })
    
    return {
      handleChange,
      counter
    }
  }
}
</script>

<style>

</style>