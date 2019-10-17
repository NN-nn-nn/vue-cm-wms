import request from '@/utils/request'

// 查询每年项目入库汇总信息
export function fetchProjectGroupByYear(params) {
  return request({
    url: '/storage-list/find/sum-info',
    method: 'get',
    params
  })
}
