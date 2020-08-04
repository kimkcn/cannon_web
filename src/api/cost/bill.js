import request from '@/plugin/axios'

// export function queryEnvPage (accountname, billingcycle, product, page, length) {
//   return request({
//     url: '/api/cloud/query_bill_overview?accountname=' + accountname + '&billingcycle=' + billingcycle + '&product=' + product + '&page=' + page + '&length=' + length,
//     method: 'get'
//   })
// }

export function queryBillOverview (costitemid, billingcycle, product) {
  return request({
    url: '/cost/query_bill_overview?cost_item_id=' + costitemid + '&billing_cycle=' + billingcycle + '&product=' + product,
    method: 'get'
  })
}

export function queryItemCost (costitemid, month) {
  return request({
    url: '/cost/query_item_cost?cost_item_id=' + costitemid + '&month=' + month,
    method: 'get'
  })
}

export function queryMonthCost () {
  return request({
    url: '/cost/query_month_cost',
    method: 'get'
  })
}

export function queryMonthCostRange () {
  return request({
    url: '/cost/query_month_cost_range',
    method: 'get'
  })
}

export function queryAccountBalance () {
  return request({
    url: '/cost/query_balance',
    method: 'get'
  })
}
