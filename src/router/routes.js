/* Layout */
import { useUserStore } from '../stores/user'
import { useMenusStore } from '../stores/menus'
import { RouterView } from 'vue-router'
import { h } from 'vue'
import Layout from '@/layout/index.vue'
const routerView = {
  render: () => h(RouterView),
}
/**
 * Note: 路由配置项
 *
 * isHidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 开发环境路由
let devRoutes = []
if (process.env.NODE_ENV === 'development') {
  devRoutes = [
    {
      path: '/dev',
      component: Layout,
      redirect: '/menus',
      meta: { title: '开发菜单' },
      children: [
        {
          path: '/menus',
          component: () => import('@/views/system/menus'),
        },
      ],
    },
    {
      path: '/trash',
      component: Layout,
      redirect: '/trash/stories',
      meta: { title: '官网管理', icon: 'website' },
      children: [
        {
          path: '/trash/config',
          component: () => import('@/views/trash/config/index.vue'),
          meta: { title: '站点配置' },
        },
        {
          path: '/trash/stories',
          component: () => import('@/views/trash/stories/index.vue'),
          meta: { title: '故事管理' },
        },
        {
          path: '/trash/applies',
          component: () => import('@/views/trash/applies/index.vue'),
          meta: { title: '申请列表' },
        },
      ],
    },
  ]
}

// 公共路由
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/layout/visitor'),
    isHidden: true,
    children: [
      {
        path: '/login',
        component: () => import('@/views/system/login'),
      },
      {
        path: '/register',
        component: () => import('@/views/system/login/register'),
      },
      {
        path: '/forgetPassword',
        component: () => import('@/views/system/login/register'),
        meta: {
          isOpen: true,
          title: '忘记密码',
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    isHidden: true,
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/users/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/system/error/404'),
    isHidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/system/error/401'),
    isHidden: true,
  },
  ...devRoutes,
]

import { getLoginUserMenus } from '@/views/system/roles/api'
export function getUserRoutes(router) {
  // 向后端请求路由数据
  return getLoginUserMenus().then(({ data }) => {
    if (!data?.length) {
      ElMessageBox.confirm('您的角色菜单权限不足，请联系管理员', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        useUserStore().logout()
      })
      return Promise.reject()
    }
    const userRoutes = transRouter(data)
    console.log(userRoutes)
    useMenusStore().addRoutes = userRoutes
    useMenusStore().routes = userRoutes.concat(constantRoutes)
    useMenusStore().topbarRouters = useMenusStore().routes.filter((e) => !e.isHidden)
    // // 设置首页重定向
    router.getRoutes().find((e) => e.path == '/').redirect = userRoutes[0].path
    userRoutes.forEach((e) => router.addRoute(e))
    router.addRoute({ path: '/:path(.*)*', redirect: '/404', isHidden: true })

    return userRoutes
  })
}

// // 遍历后台传来的路由字符串，转换为组件对象
let level = 0
function transRouter(routesData, parentPath) {
  level++
  let res = routesData.filter((route) => {
    route.meta = route.meta || {}
    route.isHidden = route.isHidden == 1
    route.meta.title = route.name
    route.meta.icon = route.icon
    route.meta.isHidden = route.isHidden

    if (parentPath) {
      let path = route.path
      route.path = /^(\/|http)/.test(path) ? path : parentPath + '/' + path
    } else {
      // 设置，顶级菜单必须是/开头
      route.path = route.path.startsWith('/') ? route.path : '/' + route.path
    }

    route.name = route.component?.replace(/\//g, '-')

    if (route.type === 'catalog') {
      // 设置目录路由重定向到首个子路由
      if (route.children?.length) {
        let firstChildPath = route.children[0].path
        route.redirect = firstChildPath.startsWith('/') ? firstChildPath : route.path + '/' + firstChildPath
      }
      if (level == 1) {
        route.component = Layout
      } else {
        route.component = routerView
      }
    } else {
      route.component = loadView(route)
    }
    let children = route.children
    if (children && children.length) {
      route.children = transRouter(route.children, route.path)
    }
    return true
  })
  level--
  return res
}

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('../views/**/*.vue')
export const loadView = (route) => {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === route.component) {
      res = modules[path]

      // 为需要单独使用的路由命名，避免使用绝对路径跳转
      let routeNames = {
        // 组件路径: route name
        'systemMonitor/loginLog/index': 'loginLog', //
        'systemMonitor/onlineUser/index': 'onlineUser', //
      }
      routeNames[route.component] && (route.name = routeNames[route.component])

      break
    }
  }
  return (
    res || {
      render: () => '待开发',
    }
  )
}
