<template>
  <div class="login-page mx-auto w-25 vh-100">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form  @form-submit="onFormSubmit">
      <div class="mb-3">
          <label class="form-label">邮箱地址</label>
          <validate-input
            :rules="emailRules"
            v-model="emailVal"
            placeholder="请输入邮箱地址"
            type="text"
            ref="inputRef"
          ></validate-input>
        </div>
          <div class="mb-3">
          <label class="form-label">密码</label>
          <validate-input
            :rules="passwordRules"
            v-model="passwordVal"
            placeholder="请输入密码"
            type="password"
          ></validate-input>
        </div>
        <template #submit>
          <span class="btn btn-danger">Submit</span>
        </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import createMessage from '@/utils/createMessage'

export default defineComponent({
  name: 'login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    const store = useStore()

    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]

    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(() => {
          createMessage('登录成功 2秒后跳转首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }).catch(e => {
          console.log(e)
        })
      }
    }
    return {
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>
