<template>
  <div class="row">
    <div class="col-3 mb-4" v-for="column in columnList" :key="column.id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img class="rounded-circle border border-light w-25 h-25 my-3" :src="column.avatar" :alt="column.title">
          <h5 class="card-title">{{column.title}}</h5>
          <p class="card-text text-left">{{column.description}}</p>
          <!-- <router-link class="btn btn-outline-primary" :to="{name: 'column', params: {id: column.id}}">进入专栏</router-link> -->
          <router-link class="btn btn-outline-primary" :to="`/column/${column.id}`">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType, computed } from 'vue'

export interface ColumnProps {
  id: number
  title: string
  avatar?: string
  description: string
}

export default defineComponent({
  name: 'column-list',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require('@/assets/column.webp')
        }
        return column
      })
    })

    return {
      columnList
    }
  }
})
</script>

<style>

</style>
