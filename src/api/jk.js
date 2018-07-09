import request from '@/utils/request'

export function Get( pageSize, pageIndex) {
  return request({
    url: '/api/JkSettings',
    method: 'get',
    params: { pageSize,pageIndex }
  })
} 

export function  Add(jksetting) {
    return request({
      url: '/api/JkSettings',
      method: 'post',
      data: jksetting
    })
  } 

export function Update(name,jksetting) {
    return request({
      url: `/api/JkSettings/${name}`,
      method: 'PUT',
      data: jksetting
    })
  }

  export function Del(name) {
    return request({
      url: `/api/JkSettings/${name}`,
      method: 'DELETE'
    })
  }