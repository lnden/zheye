<template>
  <div>
    <basic /> 
    <reactive-bar /> 
    <life-cycle />
    <watch-bar />  
    <h1 v-if="loading">Loading!....</h1>
    <!-- <img v-if="loaded" :src="result.message" > -->
    <img v-if="loaded" :src="result[0].url" >
    X: {{x}} -- Y: {{y}}
  </div>
</template>

<script lang="ts">
import basic from './components/basic.vue'
import reactiveBar from './components/reactive.vue'
import lifeCycle from './components/lifeCycle.vue'
import watchBar from './components/watch.vue'
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'

interface DogResult {
  message: string;
  status: string
}

interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number
}

import { defineComponent, watch } from 'vue'

export default  defineComponent({
  name: 'App',
  components: {
    basic,
    reactiveBar,
    lifeCycle,
    watchBar
  },
  props: {
    msg: {
      required: true,
      type: String
    }
  },
  setup(props,context) {
    console.log(props.msg)
    console.log(context)
    const { x, y } = useMousePosition()
    // const { result, loading, loaded } = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')
    // watch(result, () => {
    //   if (result.value) {
    //     console.log('value', result.value.message)
    //   }
    // })
    const { result, loading, loaded } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    watch(result, () => {
      if (result.value) {
        console.log('value', result.value[0].url)
      }
    })

    return {
      x, 
      y,
      result, 
      loading, 
      loaded 
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
