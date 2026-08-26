// import { requestOpen } from '@/utils/request'
import request from '@/utils/request'
const { get, post, put, del: dele } = request
import type { pageQuery } from 'env'
const serve = window.sysConfig.serves.system + '/common'

export function baseApi(serve: string) {
  // 列表
  const getList = (data: pageQuery) => get(`${serve}/list`, data)

  // 详情
  const getOne = (id: string) => get(`${serve}/getOne/${id}`)

  // 删除
  const del = (id: string) => dele(`${serve}/del/${id}`)

  // 新增 / 修改
  const save = (data: object) => post(`${serve}/save`, data)

  const add = (data: object) => post(`${serve}/add`, data)

  const update = (data: object) => put(`${serve}/update`, data)

  // const save = (data: object, idKey: string = 'id') => (data[idKey] ? update(data) : add(data))

  return { getList, getOne, del, save, add, update }
}

import { decrypt, decryptObj } from '@/utils/encrypt'
export const upload = (data: { new (): FormData }) => post(`${serve}/upload`, data)

// 获取视频第一帧
export function getVideoPic(params) {
  return request({
    url: '/file/getVideoFirstImg/',
    params,
  })
}

/**
 * 下载网络连接文件
 * @param {*} params
{
  url=文件路径&
  name=文件名称，带后缀
}
 */
export function download(url, name) {
  return window.sysConfig.BASE_API + `/common/download/url?url=${url}&name=${name}`
}

/**
 * 上传文件
 * @param {*} data
{
  "dataURL": 本地文件(base64)
}
 */

// 省市区 级联数据
export function getProCityList(data) {
  return request({
    url: '/system/area/list',
    params: data,
  })
}

/**
 * 获取微信授权链接
 * @param {*} redirectUrl 回调跳转地址
 * @returns
 */
export function getWxRedirect(redirectUrl = location.href) {
  return request({
    url: '/auth/wxRedirect',
    method: 'get',
    params: {
      redirectUrl,
    },
  })
}

/**
 * 微信获取token接口
 * @param {*} code 是 code码 必填
 * @param {*} openId 否 微信用户ID 非必填
 * @returns
 */
export function wxLogin(code, openId) {
  return request({
    url: '/auth/wxLogin',
    method: 'get',
    params: {
      code,
      openId,
    },
  })
}

/**
 * 获取微信授权用户信息
 * @param {*} openId
 */
export function getWechatUserInfo() {
  return request({
    url: `/system/user/getWxInfo`,
  })
}

/**
 * 获取配置
 */
export function getConfig() {
  return request({
    url: `/system/config/getData `,
  }).then(({ data }) => {
    return { data: decryptObj(data, decrypt) }
  })
}
