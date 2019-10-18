import request from '@/utils/request'

// 获取物料定额列表
export function qutoList(query) {
  return request({
    url: '/material-quota/find/list',
    method: 'get',
    params: query
  })
}

// 删除定额 通过id
export function deleteQuto(query) {
  return request({
    url: '/material-quota/delete',
    method: 'delete',
    params: query
  })
}

// 保存物料定额
export function saveQuto(data) {
  return request({
    url: '/material-quota/save',
    method: 'post',
    data
  })
}

// 修改物料定额
export function updateQuto(data) {
  return request({
    url: '/material-quota/update',
    method: 'put',
    data
  })
}
