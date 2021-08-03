<template>
  <div class="container">
    <global-header :user="user" />
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
         ></validate-input>
        {{emailVal}}
      </div>
        <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          :rules="passwordRules"
          v-model="passwordVal"
          placeholder="请输入密码"
          type="password"
         ></validate-input>
        {{passwordVal}}
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
    <column-list :list="list" />
    <global-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'

const currentUser: UserProps = {
  isLogin: false,
  name: 'Lily'
}

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar:
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4131746241,2477555401&fm=11&gp=0.jpg'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是test2专栏，有一段非常有意思的简介，可以更新一下哦'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是test4专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar:
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4131746241,2477555401&fm=11&gp=0.jpg'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是test4专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar:
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4131746241,2477555401&fm=11&gp=0.jpg'
  },
  {
    id: 5,
    title: 'test5的专栏',
    description: '这是test5专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar:
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4131746241,2477555401&fm=11&gp=0.jpg'
  }
]

const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    GlobalFooter,
    ValidateInput,
    ValidateForm
  },
  setup () {
    const inputRef = ref<any>()
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'can not be empty'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = 'should be valid email'
      } else {
        emailRef.error = false
        emailRef.message = ''
      }
    }

    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]

    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      { type: 'password', message: '请输入正确的密码格式' }
    ]

    const onFormSubmit = (result: boolean) => {
      console.log('result', inputRef.value.validateInput())
      console.log('1234', result)
    }

    return {
      list: testData,
      user: currentUser,
      emailRef,
      validateEmail,
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

<style>
</style>
