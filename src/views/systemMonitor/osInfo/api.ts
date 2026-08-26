const { get, post, put, del: dele } = $sdk.request

// 接口
const serve = window.sysConfig.serves.system + '/common'

export const getOsInfo = (data) => get(`${serve}/getOsInfo`, data)
