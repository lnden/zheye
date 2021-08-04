import { createStore, Commit } from 'vuex'
import axios from 'axios'

interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}

interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
}

export interface ColumnProps {
  _id: string
  title: string
  description: string
  avatar?: ImageProps
}

export interface PostProps {
  _id: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps
  column: string
  createdAt: string
}

export interface GlobalDataProps {
  loading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const getAndCommit = async (url: string, mutationName:string, commit: Commit) => {
  const { data } = await axios.get(url)
  // await new Promise((resolve) => setTimeout(resolve, 3000))
  commit(mutationName, data)
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false, columnId: 1, name: 'Lily' }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'Tom' }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  actions: {
    async fetchColumns (context) {
      const { data } = await axios.get('/columns')
      context.commit('fetchColumns', data)
    },
    fetchColumn ({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    async fetchPosts ({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    }
  },
  getters: {
    biggerColumnsLen (state) {
      return state.columns.filter(c => c._id > '2').length
    },
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  }
})

export default store
