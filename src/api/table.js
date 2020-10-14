import request from '@/utils/request'

// @get
export function getList(params) {
  return request({
    url: 'api/getList',
    method: 'get',
    params
  })
}

// @post
export function add(data) {
  return request({
    url: 'api/add',
    method: 'post',
    data
  })
}
