import request from '@/plugin/axios'

// export function queryEnvPage (accountname, billingcycle, product, page, length) {
//   return request({
//     url: '/api/cloud/query_bill_overview?accountname=' + accountname + '&billingcycle=' + billingcycle + '&product=' + product + '&page=' + page + '&length=' + length,
//     method: 'get'
//   })
// }

export function QueryProductRenew (costitemid, instanceid, productcode, status, page, limit) {
  return request({
    url: 'cost/query_product_renew?cost_item_id=' + costitemid + '&instance_id=' + instanceid + '&product_code=' + productcode + '&status=' + status + '&page=' + page + '&limit=' + limit,
    method: 'get'
  })
}
