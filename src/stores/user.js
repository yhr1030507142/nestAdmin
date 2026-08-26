// import { useUserStore } from '@/stores/user'
// let userStore = useUserStore()
import { getUserInfo, logout } from '@/views/system/login/api'
import { getToken, setToken, removeToken } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    avatar: new URL('@/assets/image/profile.jpg', import.meta.url).href,
    roles: [],
    permissions: [],
    configParamInfo: {},
  }),
  actions: {
    // 获取用户信息
    getUserInfo() {
      return getUserInfo().then(({ data: user = {} }) => {
        this.id = user.id
        this.name = user.name
        this.avatar = window.sysConfig.BASE_API + '/static/' + user.avatar || this.avatar
        this.roles = user.roles || []
        this.permissions = user.permissions || []
        this.configParamInfo = user.configParamInfo
        return user
      })
    },

    // 退出系统
    logout() {
      this.roles = []
      this.permissions = []

      // removeToken()
      return logout()
        .then(() => {
          removeToken()
          location.href = window.sysConfig.BASE_URL
        })
        .catch((error) => {
          reject(error)
        })
      location.href = window.sysConfig.BASE_URL
    },
  },
})
