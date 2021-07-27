<template>
  <div>
      <h1>reactive</h1>
      <h3>{{counter}}</h3>
      <h3>{{double}}</h3>
      <button @click="increase">+1</button>
    </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from 'vue'

interface DataProps {
  counter: number
  double: number
  increase: () => void
}
export default {
  name: 'reactive',
  setup() {
    const data: DataProps = reactive({
      counter: 0,
      increase: () => {
        data.counter++
      },
      double: computed(() => data.counter * 2)
    })

    const refData = toRefs(data)
    return {
      ...refData
    }
  }
};
</script>