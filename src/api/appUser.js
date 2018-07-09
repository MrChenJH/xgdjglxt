import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/api/UserApp/UserApp',
    method: 'get',
    params: {
      username,
      password
    }
  })
}