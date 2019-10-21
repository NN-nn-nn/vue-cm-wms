/**
 * 仓库接口
 */
import request from '@/utils/request'

// 获取物料名称
export function fetchList(query) {
  return request({
    url: '/storage-list/find/list',
    method: 'get',
    params: query
  })
}

// 获取物料名称
export function fetchDetailList(query) {
  return request({
    url: '/storage-list/get',
    method: 'get',
    params: query
  })
}

// 入库办理
export function createInboundList(data) {
  return request({
    url: '/storage-list/save',
    method: 'post',
    data
  })
}

// 审核入库清单
export function verifyInboundList(data) {
  return request({
    url: '/storage-list/check',
    method: 'put',
    data
  })
}

