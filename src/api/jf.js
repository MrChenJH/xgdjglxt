import request from '@/utils/request'

export function Get( pageSize, pageIndex,jh) {
  return request({
    url: '/api/ActionIntegrals',
    method: 'get',
    params: { pageSize,pageIndex ,jh}
  })
} 

export function  Add(jksetting) {
    return request({
      url: '/api/ActionIntegrals',
      method: 'post',
      data: jksetting
    })
  } 

export function Update(name,jksetting) {
    return request({
      url: `/api/ActionIntegrals/${name}`,
      method: 'PUT',
      data: jksetting
    })
  }

  export function Del(ationName, ationType, jfType) {
    return request({
      url: `/api/ActionIntegrals`,
      method: 'DELETE',
      params: { ationName, ationType, jfType}
    })
  }