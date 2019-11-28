import request from '@/utils/request'

// 获取物料名称
export function fetchPriceShowDetail(query) {
  return request({
    url: '/costing-config/get',
    method: 'get',
    params: query
  })
}

// 创建物料名称
export function updatePriceShowDetail(data) {
  return request({
    url: '/costing-config/update',
    method: 'put',
    data
  })
}
