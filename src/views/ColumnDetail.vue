<template>
  <div class="column-detail-page w-75 mx-auto h-100">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.url" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '@/components/PostList.vue'
import { GlobalDataProps, ColumnProps } from '@/store'
import { generateFitUrl } from '@/utils/helper'

export default defineComponent({
  name: 'column-detail',
  components: { PostList },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = route.params.id
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })

    const column = computed(() => {
      const currentId = route.params.id
      const selectColumn = store.getters.getColumnById(currentId) as ColumnProps | undefined
      if (selectColumn) {
        generateFitUrl(selectColumn)
      }
      return selectColumn
    })

    const list = computed(() => store.getters.getPostsByCid(currentId))

    return {
      column,
      list
    }
  }
})
</script>

<style>

</style>
