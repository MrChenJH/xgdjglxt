import { login } from '@/api/login'

import {SetYh,SetYhxx,removeYhxx,removeYh} from '@/utils/tool'

const user = {
  state: {

    name: '',
    avatar: ''
 
  },

  mutations: {
    
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      SetYh(username)
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
           
          console.log(response.token)
          SetYhxx(response.data)
        
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

  

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        removeYhxx()
        removeYh()

        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeYhxx()
        removeYh()

        resolve()
      })
    }
  }
}

export default user
