import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'http://127.0.0.1:8080/student/search',
    method: 'post',
    data
  })
}

// @post
export function add(data) {
  return request({
    url: 'http://localhost:8080/student/add',
    method: 'post',
    data
  })
}
