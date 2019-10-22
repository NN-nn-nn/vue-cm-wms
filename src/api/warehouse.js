/**
 * 仓库接口
 */
import request from '@/utils/request'

// 获取物料池
export function fetchMaterialPool(query) {
  return request({
    url: '/materialPool/actions/query',
    method: 'get',
    params: query
  })
}

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

// 出库办理
export function createOutbound(data) {
  return request({
    url: '/outboundDetail/save',
    method: 'post',
    data
  })
}

// 获取出库单
export function fetchOutboundOrder(query) {
  return request({
    url: '/outboundDetail/actions/query',
    method: 'get',
    params: query
  })
}

// 修改出库单
export function updateOutboundOrderItem(data) {
  return request({
    url: '/outboundDetail/update',
    method: 'put',
    data
  })
}

// 修改出库单
export function deleteOrderItem(id) {
  return request({
    url: '/outboundDetail/delete',
    method: 'delete',
    params: { id }
  })
}

// 出库办理
export function createOutboundOrder(params) {
  return request({
    url: '/outbound/save',
    method: 'post',
    params
  })
}

// 物料搬家
export function materialMove(params, data) {
  return request({
    url: '/materialPool/moveHouse',
    method: 'post',
    params,
    data
  })
}
