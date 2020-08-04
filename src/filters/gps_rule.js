
/**
 * 服务器登录类型
 * @param value
 * @returns {string}
 */

export function getLevelType (value) {
  switch (value) {
    case 1:
      return 'danger'
    case 2:
      return 'danger'
    case 3:
      return 'info'
    case 4:
      return 'info'
    default:
      return 'danger'
  }
}

export function getLevelText (value) {
  switch (value) {
    case 1:
      return '灾难'
    case 2:
      return '严重'
    case 3:
      return '警告'
    case 4:
      return '信息'
    default:
      return '未分类'
  }
}
