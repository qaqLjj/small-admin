import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'api/getList',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/add',
    method: 'post',
    data
  })
}
