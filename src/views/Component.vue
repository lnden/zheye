<template>
  <div class="component-wrap vh-100">
    <div class="card mb-4">
      <h3 class="card-header">Upload 上传组件</h3>
      <div class="card-body">
          <Upload />
      </div>
    </div>
    <div class="card">
      <h3 class="card-header">Message 消息组件</h3>
      <div class="card-body">
          <Message
            message="測試"
            type="error"
            v-if="status"
            @close-message="handleClose"/>
            <button class="btn btn-primary" @click="handleOpne">Open Message</button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import Upload from './Upload.vue'
import Message from '@/components/Message.vue'

export default defineComponent({
  name: 'components',
  components: { Upload, Message },
  setup () {
    const status = ref(false)
    const handleOpne = () => {
      status.value = true
    }
    const handleClose = () => {
      status.value = false
      console.log('弹框被关闭了')
    }

    return {
      handleClose,
      status,
      handleOpne
    }
  }
})
</script>

<style scoped>
</style>
