// 用户角色 接口
const serve = window.sysConfig.serves.system + '/configs'
export const { getList, save } = $sdk.baseApi(serve)
