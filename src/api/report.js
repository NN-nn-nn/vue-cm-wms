import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

//  生产成本分析
export function productCost(data) {
  return request({
    url: '/report-form/find/production-cost-analysis',
    method: 'post',
    data
  })
}
