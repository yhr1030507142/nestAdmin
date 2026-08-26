<template>
  <div v-if="!route.meta?.isHidden && !route?.isHidden">
    <app-link v-if="isLeafMeu(route)" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
      <el-menu-item v-if="onlyOneChild.meta" :index="resolvePath(onlyOneChild.path)">
        <div class="menu-title" :style="{ padding: `0px ${15 * level}px` }">
          <svg-icon :icon="route.meta.icon" class="mr10" />
          {{ onlyOneChild.meta.title }}
        </div>
      </el-menu-item>
    </app-link>

    <el-sub-menu v-else :index="resolvePath(route.path)">
      <template #title>
        <div class="menu-title" :style="{ padding: `0px ${15 * level}px` }" v-if="route.meta">
          <svg-icon :icon="route.meta.icon" class="mr10" />
          {{ route.meta.title }}
        </div>
      </template>
      <SidebarItem
        v-for="item in route.children"
        :key="item.path"
        :isNest="true"
        :level="~~level + 1"
        :route="item"
        :basePath="resolvePath(item.path)"
        class="nest-menu" />
    </el-sub-menu>
  </div>
</template>

<script>
import path from 'path-browserify'
import { isExternal } from '@/utils/validate'
import AppLink from './Link'
// import FixiOSBug from './FixiOSBug'

export default {
  components: { AppLink },
  // mixins: [FixiOSBug],
  props: {
    // route object
    route: {
      type: Object,
      required: true,
    },
    level: {
      type: [String, Number],
      default: 1,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(route) {
      // 菜单叶子，无子路由的
      if (!route.children) {
        this.onlyOneChild = { ...route, path: '' }
        return true
      }

      const showingChildren = route.children.filter((item) => {
        if (item.isHidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      // if (showingChildren.length === 1) {
      //   return true
      // }

      // 菜单目录，无子路由的 ；或者有子路由的，且子路由全部不显示的，显示父级
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...route, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    isLeafMeu(item) {
      let bol = this.hasOneShowingChild(item) && (!item.alwaysShow || this.onlyOneChild.noShowingChildren)
      if (!bol) {
        this.$emit('openeds', this.resolvePath(item.path))
      }
      return bol
    },
    resolvePath(routePath, routeQuery) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      if (/^\//.test(routePath)) {
        return routePath
      }
      if (routeQuery) {
        let query = JSON.parse(routeQuery)
        return { path: path.resolve(this.basePath, routePath), query: query }
      }
      return path.resolve(this.basePath, routePath)
    },
  },
}
</script>
