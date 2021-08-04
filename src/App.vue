<template>
  <div class="container">
    <global-header :user="currentUser" />
    <loader v-if="isLoading" text="拼命加载中" background="rgba(0,0,0,.8)"/>
    <router-view></router-view>
    <global-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
import Loader from './components/Loader.vue'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    GlobalFooter,
    Loader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)

    return {
      currentUser,
      isLoading
    }
  }
})
</script>

<style>
</style>
