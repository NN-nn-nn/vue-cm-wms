import request from '@/utils/request'

// 获取物料名称
export function fetchTypeList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// 创建物料名称
export function createType(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

// 删除物料名称
export function delType(id) {
  return request({
    url: '/article/create',
    method: 'post',
    data: { id }
  })
}

// 获取物料种类列表
export function fetchClassList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// 创建物料种类
export function createClass(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

// 修改物料种类
export function updateClass(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

// 删除物料种类
export function delClass(id) {
  return request({
    url: '/article/create',
    method: 'post',
    data: { id }
  })
}

// 获取物料材质列表
export function fetchMaterialList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// 新增物料材质
export function createMaterial(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

// 修改物料材质
export function updateMaterial(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

// 删除物料材质
export function delMaterial(id) {
  return request({
    url: '/article/create',
    method: 'post',
    data: { id }
  })
}
