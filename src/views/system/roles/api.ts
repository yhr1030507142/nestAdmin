// 用户角色 接口
const serve = window.sysConfig.serves.system + '/roles'
export const { getList, getOne, del, save } = $sdk.baseApi(serve)

const { get, post, put, del: dele } = $sdk.request
export const getLoginUserMenus = () => get(`${serve}/getLoginUserMenus`)

// 获取数据权限类型列表
export const getDataPermissionType = () => get(`${serve}/getDataPermissionType`)
