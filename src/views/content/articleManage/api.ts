// 用户角色 接口
const serve = window.sysConfig.serves.business + '/articles'
export const { getList, getOne, del, save } = $sdk.baseApi(serve)

const { get, post, put, del: dele } = $sdk.request
export const getStatus = () => get(`${serve}/getStatus`)
