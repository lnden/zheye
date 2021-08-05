<template>
  <div class="row">
    <div class="col-3 mb-4" v-for="column in columnList" :key="column._id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img class="rounded-circle border border-light my-3" :src="column.avatar && column.avatar.url" :alt="column.title">
          <h5 class="card-title">{{column.title}}</h5>
          <p class="card-text text-left">{{column.description}}</p>
          <!-- <router-link class="btn btn-outline-primary" :to="{name: 'column', params: {id: column.id}}">进入专栏</router-link> -->
          <router-link class="btn btn-outline-primary" :to="`/column/${column._id}`">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType, computed } from 'vue'
import { ColumnProps } from '../store'

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
          column.avatar = {
            url: require('@/assets/column.jpg')
          }
        } else {
          column.avatar.url = column.avatar.url + '?x-oss-process=image/resize,m-pad,h_50,w_50'
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

<style scoped>
  .card-body img {
    width: 50px;
    height: 50px;
  }
</style>
