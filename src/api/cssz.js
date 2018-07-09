import request from '@/utils/request'

export function Get( pageSize, pageIndex) {
  return request({
    url: '/api/Params',
    method: 'get',
    params: { pageSize,pageIndex }
  })
} 

export function  Add(jksetting) {
    return request({
      url: '/api/Params',
      method: 'post',
      data: jksetting
    })
  } 

export function Update(name,value,jksetting) {
    return request({
      url: `/api/Params/${name}/${value}`,
      method: 'PUT',
      data: jksetting
    })
  }

  export function Del(name) {
    return request({
      url: `/api/Params/${name}`,
      method: 'DELETE'
    })
  }