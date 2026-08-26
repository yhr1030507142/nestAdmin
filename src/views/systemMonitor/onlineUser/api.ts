const { get, post, put, del: dele } = $sdk.request

// 接口
const serve = '/auth'

export const getList = (data) => get(`${serve}/getOnlineUsers`, data)
export const quit = (data) => post(`${serve}/quit`, data)
