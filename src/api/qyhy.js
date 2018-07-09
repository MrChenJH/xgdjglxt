import request from '@/utils/request'


export function jyGet(ss,xx) {
  debugger
  return request({
    url: '/api/VipLevelQies',
    method: 'get',
    params: {ss,xx}
  })
} 

export function  jyAdd(jksetting) {
    return request({
      url: '/api/VipLevelQies',
      method: 'post',
      data: jksetting
    })
  } 

export function jyUpdate(lever, qy,jksetting) {
    return request({
      url: `/api/VipLevelQies`,
      method: 'PUT',
      params: {lever, qy},
      data: jksetting
    })
  }

  export function jyDel(v, s) {
    return request({
      url: `/api/VipLevelQies`,
      method: 'DELETE',
      params: {v, s}
    })
  }