import request from '@/plugin/axios'

export function QuerySslExpireDate (domainname, ismatch, page, limit) {
  return request({
    url: 'gps/showssl?domain_name=' + domainname + '&match_status=' + ismatch + '&page=' + page + '&limit=' + limit,
    method: 'get'
  })
}
