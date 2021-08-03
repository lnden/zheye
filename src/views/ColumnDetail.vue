<template>
  <div class="column-detail-page w75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle w-100">
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
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
// import { testData, testPosts } from '../testData'
import PostList from '../components/PostList.vue'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'column-detail',
  components: { PostList },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = +route.params.id
    // const column = testData.find(c => c.id === currentId)
    // const column = computed(() => store.state.columns.find(c => c.id === currentId))
    const column = computed(() => store.getters.getColumnById(currentId))

    // const list = testPosts.filter(post => post.columnId === currentId)
    // const list = computed(() => store.state.posts.filter(post => post.columnId === currentId))
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
