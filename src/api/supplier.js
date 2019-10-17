import request from '@/utils/request'

/**
 * 查看某分类的供应商简单信息
 * @param {string/number} baseType 基础分类
 * @author duhh
 */
export function fetchListByBaseType(baseType) {
  return request({
    url: '/supplier/find/list-simple',
    method: 'get',
    params: { classification: baseType }
  })
}

// 创建供应商
export function save(data) {
  return request({
    url: '/supplier/save',
    method: 'post',
    data
  })
}

// 更新
export function update(data) {
  return request({
    url: '/supplier/update',
    method: 'put',
    data
  })
}

// 查询供应商列表
export function list(query) {
  return request({
    url: '/supplier/find/page-list',
    method: 'get',
    params: query
  })
}

//  供应商详情
export function detail(query) {
  return request({
    url: '/supplier/find/get',
    method: 'get',
    params: query
  })
}

// 通过id删除
export function delItem(data) {
  return request({
    url: '/supplier/delete?id=' + data.id,
    method: 'delete'
  })
}

// 省市区
export function getProvice(query) {
  return request({
    url: '/states/list-chinese-state',
    method: 'get',
    params: query
  })
}
