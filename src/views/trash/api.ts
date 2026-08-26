// 官网管理 - 故事管理
const storiesServe = window.sysConfig.serves.business + '/trash/stories'
export const {
  getList: getStoryList,
  getOne: getStoryOne,
  del: delStory,
  save: saveStory,
} = $sdk.baseApi(storiesServe)

// 官网管理 - 申请列表
const appliesServe = window.sysConfig.serves.business + '/trash/applies'
export const {
  getList: getApplyList,
  getOne: getApplyOne,
  del: delApply,
  save: saveApply,
} = $sdk.baseApi(appliesServe)

// 官网管理 - 站点配置
const configServe = window.sysConfig.serves.business + '/trash/config'
const { get, post } = $sdk.request
export const getSiteConfig = () => get(`${configServe}/get`)
export const saveSiteConfig = (data) => post(`${configServe}/save`, data)
