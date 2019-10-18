/**
 * 仓库接口
 */
import request from '@/utils/request'

export function createInboundList(data) {
  return request({
    url: '/storage-list/save',
    method: 'post',
    data
  })
}
