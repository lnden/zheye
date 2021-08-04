import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
import App from './App.vue'

axios.defaults.baseURL = '/api'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, code: '123456789' }
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 2000)
  return config
})
axios.get('/columns', { params: { key: 'value' } }).then(res => {
  console.log(res)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
