import request from '@/plugin/axios'

// export function queryEnvPage (accountname, billingcycle, product, page, length) {
//   return request({
//     url: '/api/cloud/query_bill_overview?accountname=' + accountname + '&billingcycle=' + billingcycle + '&product=' + product + '&page=' + page + '&length=' + length,
//     method: 'get'
//   })
// }

export function queryPnProblem (data) {
  return request({
    url: 'pn_problem',
    method: 'post',
    data
  })
}
