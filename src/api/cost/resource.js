import request from '@/plugin/axios'

// export function queryEnvPage (accountname, billingcycle, product, page, length) {
//   return request({
//     url: '/api/cloud/query_bill_overview?accountname=' + accountname + '&billingcycle=' + billingcycle + '&product=' + product + '&page=' + page + '&length=' + length,
//     method: 'get'
//   })
// }

export function QueryResourcePackage (packagename, packageid, status, deducttype, supportproduct) {
  return request({
    url: '/cost/query_resource_package?package_name=' + packagename + '&package_id=' + packageid + '&status=' + status + '&deduct_type=' + deducttype + '&support_product=' + supportproduct,
    method: 'get'
  })
}
