<template>
  <div class="dropdown" ref="dropdonwnRef">
    <a class="btn btn-outline-light my-2 dropdown-toggle" href="#" @click.prevent="handleToggle">{{title}}</a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

export default defineComponent({
  name: 'dropdown',
  props: {
    title: {
      type: String,
      require: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const dropdonwnRef = ref<null | HTMLElement>(null)

    const handleToggle = () => {
      isOpen.value = !isOpen.value
    }

    const isClickOutside = useClickOutside(dropdonwnRef)

    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      handleToggle,
      dropdonwnRef //* template name
    }
  }
})
</script>
