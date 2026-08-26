import 'virtual:svg-icons-register'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export function registerElementPlusIcons(app) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component('ElIcon' + key, component)
  }
}
