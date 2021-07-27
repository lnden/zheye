<template>
  <div>
    <basic /> 
    <reactive-bar /> 
    <life-cycle />
    <watch-bar />  
    X: {{x}} -- Y: {{y}}
  </div>
</template>

<script lang="ts">
import basic from './components/basic.vue'
import reactiveBar from './components/reactive.vue'
import lifeCycle from './components/lifeCycle.vue'
import watchBar from './components/watch.vue'
import useMousePosition from './hooks/useMousePosition'

export default {
  name: 'App',
  components: {
    basic,
    reactiveBar,
    lifeCycle,
    watchBar
  },
  setup() {
    const { x, y } = useMousePosition()
    return {
      x, y
    }
  }
};
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
