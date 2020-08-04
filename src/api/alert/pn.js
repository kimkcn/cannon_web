import request from '@/plugin/axios'

// export function queryEnvPage (accountname, billingcycle, product, page, length) {
//   return request({
//     url: '/api/cloud/query_bill_overview?accountname=' + accountname + '&billingcycle=' + billingcycle + '&product=' + product + '&page=' + page + '&length=' + length,
//     method: 'get'
//   })
// }

export function queryPnProblemRange (data) {
  return request({
    url: 'pn/pn_delay_problem',
    method: 'post',
    data
  })
}