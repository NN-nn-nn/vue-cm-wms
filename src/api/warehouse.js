/**
 * 仓库接口
 */
import request from '@/utils/request'

// 获取物料池
export function fetchMaterialPool(params) {
  return request({
    url: '/materialPool/actions/query',
    method: 'get',
    params
  })
}

// 获取物料名称
export function fetchList(params) {
  return request({
    url: '/storage-list/find/list',
    method: 'get',
    params
  })
}

// 获取物料名称
export function fetchListByRoles(params) {
  return request({
    url: '/storage-list/warehouse/find/list',
    method: 'get',
    params
  })
}

// 获取物料名称
export function fetchDetailList(params) {
  return request({
    url: '/storage-list/get',
    method: 'get',
    params
  })
}

// 获取物料名称
export function fetchDetailListByRoles(params) {
  return request({
    url: 'storage-list/warehouse/get',
    method: 'get',
    params
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
export function fetchOutboundOrder(params) {
  return request({
    url: '/outboundDetail/actions/query',
    method: 'get',
    params
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
export function materialMove(data) {
  return request({
    url: '/materialPool/moveHouse',
    method: 'post',
    data
  })
}

// 获取出库单
export function fetchOutboundRecordByNormal(params) {
  return request({
    url: '/outboundDetail/record/list',
    method: 'get',
    params
  })
}

// 获取出库记录（常规）（价格是否显示）
export function fetchOutboundRecordDetailByNormalAndRoles(params) {
  return request({
    url: '/outboundDetail/record/details',
    method: 'get',
    params
  })
}

// 获取出库记录（项目）（价格是否显示）
export function fetchOutboundRecordDetailByProjectRoles(params) {
  return request({
    url: '/outboundDetail/project/record/details',
    method: 'get',
    params
  })
}

// 获取废料/归还甲方日期列表
export function fetchReturnOrScrapMateDateList(params) {
  return request({
    url: '/materialMoveHouse/history/record/list',
    method: 'get',
    params
  })
}

// 获取废料/归还甲方详情
export function fetchReturnOrScrapMateDetail(params) {
  return request({
    url: '/materialMoveHouse/history/record/details',
    method: 'get',
    params
  })
}

// 退库办理
export function createReturnList(data) {
  return request({
    url: '/out-warehouse-list/save',
    method: 'post',
    data
  })
}

// 分页查询退库清单
export function fetchReturnList(params) {
  return request({
    url: '/out-warehouse-list/find/list',
    method: 'get',
    params
  })
}

// 分页查询退库清单(是否显示价格)
export function fetchReturnListByRoles(params) {
  return request({
    url: '/out-warehouse-list/warehouse/find/list',
    method: 'get',
    params
  })
}

// 查询退库清单详情
export function fetchReturnDetailList(params) {
  return request({
    url: '/out-warehouse-list/get',
    method: 'get',
    params
  })
}

// 查询退库清单详情(是否显示价格)
export function fetchReturnDetailListByRoles(params) {
  return request({
    url: '/out-warehouse-list/warehouse/get',
    method: 'get',
    params
  })
}

// 审核退库清单
export function verifyReturnList(data) {
  return request({
    url: '/out-warehouse-list/check',
    method: 'put',
    data
  })
}

