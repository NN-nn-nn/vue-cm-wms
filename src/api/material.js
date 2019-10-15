import request from '@/utils/request'

export function fetchTypeList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
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

// 删除类型
export function delType(id) {
  return request({
    url: '/admin/protocol/delete',
    method: 'post',
    data: { id }
  })
}

export function fetchClassList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// 创建种类
export function createClass(data) {
  return request({
    url: '/admin/protocol/add',
    method: 'post',
    data
  })
}

// 修改种类
export function updateClass(data) {
  return request({
    url: '/admin/protocol/edit',
    method: 'post',
    data
  })
}

// 删除类型
export function delClass(id) {
  return request({
    url: '/admin/protocol/delete',
    method: 'post',
    data: { id }
  })
}

export function fetchMaterialList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// 创建种类
export function createMaterial(data) {
  return request({
    url: '/admin/protocol/add',
    method: 'post',
    data
  })
}

// 修改种类
export function updateMaterial(data) {
  return request({
    url: '/admin/protocol/edit',
    method: 'post',
    data
  })
}

// 删除类型
export function delMaterial(id) {
  return request({
    url: '/admin/protocol/delete',
    method: 'post',
    data: { id }
  })
}
