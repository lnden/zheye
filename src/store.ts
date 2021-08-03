import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps } from './testData'

interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}

export interface PostProps {
  title: string
  content: string
  id: number
  columnId: number,
  createdAt: string,
}

export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false, columnId: 1, name: 'Lily' }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'Tom' }
    },
    createPost (state, data) {
      state.columns = { ...state.columns, ...data }
    }
  }
})

export default store
