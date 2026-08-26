// 用户角色 接口
const serve = window.sysConfig.serves.system + '/notices'
export const { getList, getOne, del, save } = $sdk.baseApi(serve)
