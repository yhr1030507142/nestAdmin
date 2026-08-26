// 日志 接口
const serve = window.sysConfig.serves.system + '/systemLog'

const { get, post, put, del: dele } = $sdk.request

export const getOne = (data) => get(`${serve}`, data)
export const del = (id: string) => dele(`${serve}`)
