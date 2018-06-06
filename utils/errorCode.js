var errorCode = {
  "100": "获取用户信息失败",
  "101": "查询我的关注信息失败",
  "102": "查询我的粉丝信息失败",
  "103": "查询我的粉丝信息失败"
}

var errorCodeFind = function (code) {
  return errorCode[code]
}

module.exports = errorCodeFind