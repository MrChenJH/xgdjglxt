import request from '@/utils/request'

export function Get( pageSize, pageIndex,project) {
  return request({
    url: '/api/PlanLibraries',
    method: 'get',
    params: { pageSize,pageIndex ,project}
  })
} 

export function  Add(jksetting) {
    return request({
      url: '/api/PlanLibraries',
      method: 'post',
      data: jksetting
    })
  } 

export function Update(name,jksetting) {
    return request({
      url: `/api/PlanLibraries/${name}`,
      method: 'PUT',
      data: jksetting
    })
  }

  export function Del(name) {
    return request({
      url: `/api/PlanLibraries/${name}`,
      method: 'DELETE'
    })
  }