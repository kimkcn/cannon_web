
/**
 * 服务器登录类型
 * @param value
 * @returns {string}
 */

export function getCostItemIdText (value) {
  switch (value) {
    case 1:
      return '阿里云-主账号'
    case 2:
      return '阿里云-买手账号'
    case 3:
      return '腾讯云账号'
    case 4:
      return 'AWS账号'
    default:
      return '未定义'
  }
}

export function getResourceStatusType (value) {
  switch (value) {
    case 'Expired':
      return 'info'
    case 'Available':
      return 'success'
    case 'Useup':
      return 'info'
    default:
      return 'danger'
  }
}

export function getResourceStatusText (value) {
  switch (value) {
    case 'Useup':
      return '已用尽'
    case 'Expired':
      return '已失效'
    case 'Available':
      return '有效'
    default:
      return '未定义'
  }
}

export function getResourceTypeText (value) {
  switch (value) {
    case 'DeadlineAcc':
      return '总量递减型'
    case 'PeriodMonthlyAcc':
      return '包月周期型'
    case 'Absolute':
      return '总量恒定型'
    default:
      return '未定义'
  }
}
