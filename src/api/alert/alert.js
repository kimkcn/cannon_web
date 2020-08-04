import request from '@/plugin/axios'

// export function queryEnvPage (accountname, billingcycle, product, page, length) {
//   return request({
//     url: '/api/cloud/query_bill_overview?accountname=' + accountname + '&billingcycle=' + billingcycle + '&product=' + product + '&page=' + page + '&length=' + length,
//     method: 'get'
//   })
// }

export function QueryAlertDetail (alertfrom, product, level, status, page, limit) {
  return request({
    url: 'alert?alertfrom=' + alertfrom + '&product=' + product + '&level=' + level + '&status=' + status + '&page=' + page + '&limit=' + limit,
    method: 'get'
  })
}
