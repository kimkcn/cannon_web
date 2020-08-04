import request from '@/plugin/axios'

export function addRule (data) {
  return request({
    url: '/gps/rule/add',
    method: 'post',
    data
  })
}

export function deleteRuleById (data) {
  return request({
    url: '/gps/rule/config/del',
    method: 'post',
    data
  })
}

export function queryRule (jobId, page, limit) {
  return request({
    url: '/gps/rule?&jobId=' + jobId + '&page=' + page + '&limit=' + limit,
    method: 'get'
  })
}

export function queryObjectInfoPage (taskId, page, limit) {
  return request({
    url: '/gps/object?taskId=' + taskId + '&page=' + page + '&limit=' + limit,
    method: 'get'
  })
}

export function queryMetricFieldPage (objectId, taskId, page, limit) {
  return request({
    url: '/gps/object/metric_field?objectId=' + objectId + '&taskId=' + taskId + '&page=' + page + '&limit=' + limit,
    method: 'get'
  })
}

export function updateRule (data) {
  return request({
    url: '/gps/rule/update',
    method: 'put',
    data
  })
}
