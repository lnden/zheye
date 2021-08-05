<template>
  <div class="home-page">
    <uploader
      action="/upload"
      :beforeUpload="beforeUpload"
      @file-uploaded="onFileUploaded"
    >
      <h3 style="cursor: pointer">点击上传</h3>
      <template #loading>
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading ... </span>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500">
      </template>
    </uploader>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p><a href="#" class="btn btn-primary my-2">开始写文章</a></p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import ColumnList from '@/components/ColumnList.vue'
import { GlobalDataProps, ResponseType, ImageProps } from '../store'
import Uploader from '@/components/Uploader.vue'
import createMessage from '@/components/createMessage'

export default defineComponent({
  name: 'home',
  components: { ColumnList, Uploader },
  setup () {
    // 拿到store对象
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns)
    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        createMessage('上传图片只能是 JPG 格式!', 'error')
      }
      return isJPG
    }

    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      createMessage(`上传图片ID ${rawData.data._id}`, 'success')
    }

    return {
      list,
      beforeUpload,
      onFileUploaded
    }
  }
})
</script>
