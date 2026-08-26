const { get, post, put, del: dele } = $sdk.request

// 首页 接口
const serve = window.sysConfig.serves.system + '/common'

// 首页指标数据
export const getIndexCountData = () => get(`${serve}/getIndexCountData`)
