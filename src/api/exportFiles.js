import request from '@/utils/request'

// 导出入库清单详情
export function exportInboundExcelByOrderId(params) {
  return request({
    url: '/storage-list/record/export',
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 导出常规出库记录报表
export function exportOutboundExcelByNormal(params) {
  return request({
    url: '/outboundDetail/record/export',
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 导出出库退料记录报表
export function exportOutboundReturnExcelByOrderId(params) {
  return request({
    url: '/return/warehouse/record/export',
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 导出项目出库记录报表
export function exportOutboundExcelByProject(params) {
  return request({
    url: '/outboundDetail/project/record/export',
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 导出归还或废料记录
export function exportReturnOrScrapExcel(params) {
  return request({
    url: '/materialMoveHouse/history/record/export',
    method: 'get',
    responseType: 'blob',
    params
  })
}
// 导出退库记录
export function exportReturnWarehouseExcel(params) {
  return request({
    url: '/out-warehouse-list/record/export',
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 导出项目汇总记录
export function exportProjectSummaryExcel(params) {
  return request({
    url: '/report-form/sum/export',
    method: 'get',
    responseType: 'blob',
    params
  })
}
