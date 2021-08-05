<template>
  <div>
    我应该post详情页面
    <user-profile></user-profile>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import UserProfile from '@/components/UserProfile.vue'

export default defineComponent({
  name: 'post-detail',
  components: { UserProfile }
})
</script>

<style scoped>
</style>
