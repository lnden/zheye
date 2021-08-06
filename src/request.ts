
import axios from 'axios'
import store from './store'

axios.defaults.baseURL = '/api'

axios.interceptors.request.use(config => {
  // config.params = { ...config.params, code: '123456789' }
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})

axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 500)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})

// axios.get('/columns', { params: { key: 'value' } }).then(res => {
//   console.log(res)
// })
