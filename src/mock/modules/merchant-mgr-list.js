import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'id': '@increment',
    'name': '@name',
    'englishName': '@name',
    'merchantCode': '@name',
    'businessCertificateTypeCode': '@name',
    'businessCertificateSn': '@name',
    'businessCertificateStartTime': '@name',
    'businessCertificateEndTime': '@name',
    'industryTypeCode': '@name',
    'legalPersonName': '@name',
    'legalPersonIdType': '@name',
    'legalpersonIdNo': '@name',
    'legalPersonIdStartTime': '@name',
    'legalPersonIdEndTime': '@name',
    'chargePersonName': '@name',
    'chargePersonIdType': '@name',
    'chargePersonIdNo': '@name',
    'chargePersonIdStartTime': '@name',
    'chargePersonIdEndTime': '@name',
    'address': '@name',
    'postcode': '@name',
    'contactPersonName': '@name',
    'contactPersonMobie': '@name',
    'contactPersonTelephone': '@name',
    'customerServiceTelephone': '@name',
    'email': '@name',
    'homePageUrl': '@name',
    'logoImage': '@name',
    'parentWalletId': '@name',
    'businessRegistrationSn': '@name',
    'taxRegistrationSn': '@name',
    'registeredCapital': '@name',
    'legalPersonIdTypeList': '@name'
  }))
}

// 获取角色列表
export function list () {
  return {
    isOpen: true,
    url: '/merchant/pageList',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': dataList
      }
    }
  }
}

// 获取角色列表, 根据当前用户
export function select () {
  return {
    isOpen: true,
    url: '/merchant/pageList',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': dataList
      }
    }
  }
}

// 获取角色信息
export function info () {
  return {
    isOpen: true,
    url: '/merchant/pageList',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': dataList
      }
    }
  }
}

// 添加角色
export function add () {
  return {
    // isOpen: false,
    url: '/merchant/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改角色
export function update () {
  return {
    // isOpen: false,
    url: '/merchant/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除角色
export function del () {
  return {
    // isOpen: false,
    url: '/merchant/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
