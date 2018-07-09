import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: `/api/Users/${username}/${password}`,
    method: 'get'
   
  })
}
