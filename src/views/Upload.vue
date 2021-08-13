<template>
  <div class="upload-wrap">
    <uploader
      action="/upload"
      :beforeUpload="beforeUpload"
      @file-uploaded="onFileUploaded"
    >
      <button class="btn btn-primary" style="cursor: pointer">点击上传</button>
      <template #loading>
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading ... </span>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500">
      </template>
    </uploader>
    <hr>
    <input  class="btn btn-primary"  type="file" name="file" @change.prevent="handleFileChange"/>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import axios from 'axios'
import { ResponseType, ImageProps } from '@/store'
import Uploader from '@/components/Uploader.vue'
import createMessage from '@/utils/createMessage'

export default defineComponent({
  name: 'upload',
  components: { Uploader },
  setup () {
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

    const handleFileChange = (e:Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadFile = files[0]
        const formData = new FormData()
        formData.append(uploadFile.name, uploadFile)
        axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
        })
      }
    }

    return {
      beforeUpload,
      onFileUploaded,
      handleFileChange
    }
  }
})
</script>

<style scoped>
  .upload-wrap {
    min-height: 100%;
  }
</style>
