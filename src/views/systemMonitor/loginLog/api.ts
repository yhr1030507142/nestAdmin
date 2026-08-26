// 登录日志 接口
const serve = window.sysConfig.serves.system + '/loginLogs'
export const { getList, getOne, del, save } = $sdk.baseApi(serve)

const { get, post, put, del: dele } = $sdk.request

// 获取用户访问量折线图
export const getVisitedNumChart = (data) => get(`${serve}/getVisitedNumChart`, data)

// 获取用户地区分布
export const getUserAreaList = (data) => get(`${serve}/getUserAreaList`, data)

// 获取用户国家分布
export const getUserCountryList = (data) => get(`${serve}/getUserCountryList`, data)
