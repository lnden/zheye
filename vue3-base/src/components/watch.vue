<template>
  <div>
    <h1>watch</h1>
    <h3>{{count}}</h3>
    <h3>{{greetings}}</h3>
    <button @click="increase">+1</button>
    <button @click="updateGreeting">更新</button>
  </div>
</template>

<script lang="ts">
import {ref, reactive, toRefs, watch} from 'vue'

export default {
  setup() {
    const data = reactive({
      count: 0,
      increase: () => {data.count++}
    })

    const greetings = ref('');
    const updateGreeting = () => {
      greetings.value += ' Hello！'
    }
    watch(greetings, (newValue, oldValue) => {
      // console.log('oldValue', oldValue)
      // console.log('newValue', newValue)
      // document.title = 'updated' + greetings.value
    })

    // watch监听数组, data 是一个proxy对象，data.count丢失响应式，() => data.count可以获取里面的某个值
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log('oldValue', oldValue)
      console.log('newValue', newValue)
      document.title = 'updated' + greetings.value
    })

    const refData = toRefs(data)
    return {
      ...refData,
      greetings,
      updateGreeting
    }
  }
}
</script>

<style>

</style>