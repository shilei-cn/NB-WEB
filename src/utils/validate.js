/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 验证是否两位小数
*/
export function validatePrecision (value) {
  return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)
}

/**
 * 验证是否整数
*/
export function isInteger (rule, value, callback) {
  if (value === 0) {
    callback()
    return
  }
  setTimeout(() => {
    const re = /^[0-9]*[1-9][0-9]*$/
    const rsCheck = re.test(value)
    if (!rsCheck) {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  }, 0)
}

/**
 * 验证是否是[1-100]的小数,即不可以等于0
*/
export function isBtnOneToHundred (rule, value, callback) {
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入整数，值为[1,100]'))
    } else {
      if (value < 1 || value > 100) {
        callback(new Error('请输入整数，值为[1,100]'))
      } else {
        callback()
      }
    }
  }, 100)
}
