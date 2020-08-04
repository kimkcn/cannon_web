
/**
 * 服务器登录类型
 * @param value
 * @returns {string}
 */

export function getRenewInstanceStatusType (value) {
  switch (value) {
    case 'Expired':
      return 'info'
    case 'Normal':
      return 'success'
    default:
      return 'info'
  }
}

export function getRenewInstanceStatusText (value) {
  switch (value) {
    case 'Creating':
      return '创建中'
    case 'Expired':
      return '已过期'
    case 'Normal':
      return '正常'
    default:
      return '未定义'
  }
}

export function getRenewStatusText (value) {
  switch (value) {
    case 'ManualRenewal':
      return '手工续费'
    case 'AutoRenewal':
      return '自动续费'
    case 'NotRenewal':
      return '不续费'
    default:
      return '未定义'
  }
}

export function getSubscriptionTypeText (value) {
  switch (value) {
    case 'Subscription':
      return '包年包月'
    case 'PayAsYouGo':
      return '按量付费'
    default:
      return '未定义'
  }
}

