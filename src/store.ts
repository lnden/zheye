import { createStore, Commit } from 'vuex'
import axios from 'axios'

export interface ResponseType<T > {
  code: number
  msg: string
  data: T
}

export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?: string
}

export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  avatar?: ImageProps
  description?: string
}

export interface ColumnProps {
  _id: string
  title: string
  description: string
  avatar?: ImageProps
}

export interface PostProps {
  _id?: string
  title: string
  excerpt?: string
  content: string
  image?: ImageProps | string
  column: string
  createdAt?: string
  author?: string
}

export interface GlobalErrorProps {
  status: boolean
  message?: string
}

interface ListProps<P> {
  [id: string]: P;
}

export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  loading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  pppp: { data: ListProps<PostProps>; loadedColumns: string[] };
  user: UserProps
}

const getAndCommit = async (url: string, mutationName:string, commit: Commit) => {
  const { data } = await axios.get(url)
  // await new Promise((resolve) => setTimeout(resolve, 3000))
  commit(mutationName, data)
  return data
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  try {
    const { data } = await axios.post(url, payload)
    commit(mutationName, data)
    return data
  } catch (error) {
    return Promise.reject(new Error('network issue'))
  }
}

const store = createStore<GlobalDataProps>({
  state: {
    error: {
      status: false,
      message: ''
    },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    pppp: { data: {}, loadedColumns: [] },
    user: { isLogin: false }
  },
  mutations: {
    // login (state) {
    //   state.user = { ...state.user, isLogin: true, name: 'Tom' }
    // },
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
    },
    login (state, rawData) {
      const token = rawData?.data?.token
      if (token) {
        state.token = token
        localStorage.setItem('token', token)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
      }
    },
    fetchCurrentUser (statem, rawData) {
      statem.user = {
        isLogin: true,
        ...rawData.data
      }
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    logout (state) {
      state.token = ''
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    },
    fetchPost (state, rawData) {
      state.pppp.data[rawData.data._id] = rawData.data
    }
  },
  actions: {
    async fetchColumns (context) {
      const { data } = await axios.get('/columns')
      context.commit('fetchColumns', data)
      return data
    },
    fetchColumn ({ commit }, cid) {
      return getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts ({ commit }, cid) {
      return getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    createPost ({ commit }, payload) {
      return postAndCommit('/posts', 'createPost', commit, payload)
    },
    fetchPost ({ state, commit }, id) {
      const currentPost = state.pppp.data[id]
      if (!currentPost || !currentPost.content) {
        return getAndCommit(`/posts/${id}`, 'fetchPost', commit)
      } else {
        return Promise.resolve({ data: currentPost })
      }
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    },
    getCurrentPost: (state) => (id: string) => {
      return state.pppp.data[id]
    }
  }
})

export default store
