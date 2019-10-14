import request from '@/utils/request'

export function fetchTypeList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// 删除类型
export function delType(id) {
  return request({
    url: '/admin/protocol/delete',
    method: 'post',
    data: { id }
  })
}

// 创建类型
export function createType(data) {
  return request({
    url: '/admin/protocol/add',
    method: 'post',
    data
  })
}
