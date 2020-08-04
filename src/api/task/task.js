import request from '@/plugin/axios'

export function QueryTaskSchedule (jobId, jobName, jobStatus) {
  return request({
    url: '/task/schedule_event?job_id=' + jobId + '&job_name=' + jobName + '&job_status=' + jobStatus,
    method: 'get'
  })
}

export function addTask (data) {
  return request({
    url: '/task/job_config/add',
    method: 'post',
    data
  })
}

export function deleteTaskById (data) {
  return request({
    url: '/task/job_config/del',
    method: 'post',
    data
  })
}

export function queryTaskConfigPage (taskId, jobId, status, page, limit) {
  return request({
    url: '/task/job_config?taskId=' + taskId + '&jobId=' + jobId + '&status=' + status + '&page=' + page + '&limit=' + limit,
    method: 'get'
  })
}

export function updateTask (data) {
  return request({
    url: '/task/job_config/update',
    method: 'put',
    data
  })
}
