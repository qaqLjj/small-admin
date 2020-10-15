import request from '@/utils/request'

export function getStudentList(data) {
  return request({
    url: 'http://127.0.0.1:8080/student/search',
    method: 'post',
    data
  })
}

// @post
export function getStudentById(params) {
  return request({
    url: 'http://localhost:8080/student/searchById',
    method: 'get',
    params
  })
}

// @post
export function deleteStudent(params) {
  return request({
    url: 'http://localhost:8080/student/delete',
    method: 'delete',
    params
  })
}

// @post
export function addStudent(data) {
  return request({
    url: 'http://localhost:8080/student/insert',
    method: 'post',
    data
  })
}

// @post
export function addVision(data) {
  return request({
    url: 'http://localhost:8080/vision/insert',
    method: 'post',
    data
  })
}
