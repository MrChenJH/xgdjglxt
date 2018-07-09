import request from '@/utils/request'


export function jyGet(ationName, ationType, jfType) {
  return request({
    url: '/api/QyIntelgrals',
    method: 'get',
    params: {ationName, ationType, jfType}
  })
} 

export function  jyAdd(jksetting) {
    return request({
      url: '/api/QyIntelgrals',
      method: 'post',
      data: jksetting
    })
  } 

export function jyUpdate(ationName, ationType, jfType,jksetting) {
    return request({
      url: `/api/QyIntelgrals`,
      method: 'PUT',
      params: {ationName, ationType, jfType},
      data: jksetting
    })
  }

  export function jyDel(ationName, ationType, jfType,ssQy) {
    return request({
      url: `/api/QyIntelgrals`,
      method: 'DELETE',
      params: {ationName, ationType, jfType,ssQy}
    })
  }