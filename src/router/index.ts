import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import store from '@/store/index'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import Signup from '@/views/Signup.vue'
import PostDetail from '@/views/PostDetail.vue'
import Component from '@/views/Component.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: {
        requiredlogin: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostDetail
    },
    {
      path: '/component',
      name: 'component',
      component: Component
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredlogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch((e) => {
        console.error(e)
        store.commit('logout')
        next('/login')
      })
    } else {
      if (requiredlogin) {
        next('/')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
  window.scrollTo(0, 0)
})

export default router
