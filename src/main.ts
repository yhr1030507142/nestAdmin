import './config.js'
import 'normalize.css/normalize.css'

import { useDark } from '@vueuse/core'
useDark()

import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
const app = createApp(App)

import 'element-plus/theme-chalk/dark/css-vars.css'

import '@/styles/index.scss'
import '@/styles/tailwindcss.css'

// 全局方法挂载
import { SDK, $sdk } from './utils/sdk'
declare module 'vue' {
  interface ComponentCustomProperties {
    $sdk: SDK
  }
}
Object.assign(app.config.globalProperties, { $sdk }, { sysConfig: window.sysConfig })

import { registerElementPlusIcons } from '@/components/base/BaIcon'
registerElementPlusIcons(app)

// 全局异步组件挂载，
const components = import.meta.glob('./components/**/*.vue')
for (const c in components) {
  // console.log(c.match(/\/([^\/]+)\.vue$/)[1])
  app.component(c.match(/\/([^\/]+)(\/index)?\.vue$/)[1], defineAsyncComponent(components[c]))
}

import router from './router'
import stores, { store } from '@/stores'
app.use(store)
app.use(router)
app.config.globalProperties.$store = stores()

app.mount('#app')

console.log(`
  _______                   __       _____       .___      .__
  \\      \\   ____   _______/  |_    /  _  \\    __| _/_____ |__| ____
  /   |   \\_/ __ \\ /  ___/\\   __\\  /  /_\\  \\  / __ |/     \\|  |/    \\
 /    |    \\  ___/ \\___ \\  |  |   /    |    \\/ /_/ |  Y Y  \\  |   |  \\
 \\____|__  /\\___  >____  > |__|   \\____|__  /\\____ |__|_|  /__|___|  /
         \\/     \\/     \\/                 \\/      \\/     \\/        \\/
 `)
