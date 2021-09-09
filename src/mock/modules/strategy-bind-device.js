// 生成数据列表
var dataList = [
  {
    "parentId": 0,
    "type": 1,
    "name": "测试商户1",
    "id": "1-1"
  },
  {
    "parentId": "1-1",
    "parentWalletId": "asdasd",
    "type": 2,
    "deviceTypeModel": "str",
    "deviceTypeName": "str",
    "deviceTypeId": 1,
    "name": "123456",
    "id": "1-2"
  },
  {
    "parentId": "1-1",
    "parentWalletId": "sdw",
    "type": 2,
    "deviceTypeModel": "str",
    "deviceTypeName": "str",
    "deviceTypeId": 1,
    "name": "12312123",
    "id": "2-2"
  },
  {
    "parentId": 0,
    "type": 1,
    "name": "str11",
    "id": "2-1"
  },
  {
    "parentId": 0,
    "type": 1,
    "name": "商户1",
    "id": "3-1"
  },
  {
    "parentId": 0,
    "type": 1,
    "name": "商户2",
    "id": "4-1"
  },
  {
    "parentId": 0,
    "type": 1,
    "name": "商户xx",
    "id": "5-1"
  },
  {
    "parentId": 0,
    "type": 1,
    "name": "test",
    "id": "6-1"
  },
  {
    "parentId": 0,
    "type": 1,
    "name": "test111",
    "id": "7-1"
  },
  {
    "parentId": 0,
    "type": 1,
    "name": "test113",
    "id": "8-1"
  },
  {
    "parentId": 0,
    "type": 1,
    "name": "test114",
    "id": "9-1"
  },
  {
    "parentId": 0,
    "type": 1,
    "name": "test115",
    "id": "10-1"
  },
  {
    "parentId": 0,
    "type": 1,
    "name": "商户xx111",
    "id": "11-1"
  },
  {
    "parentId": 0,
    "type": 1,
    "name": "商户xx1112",
    "id": "12-1"
  }
]

// 获取菜单列表
export function list () {
  return {
    // isOpen: false,
    url: '/strategydevice/getMerchantAndDeviceList',
    type: 'post',
    list: dataList
  }
}

// 获取上级菜单
export function select () {
  return {
    // isOpen: false,
    url: '/strategydevice/getMerchantAndDeviceList',
    type: 'post',
    list: dataList
  }
}

// 获取菜单信息
export function info () {
  return {
    // isOpen: false,
    url: '/strategydevice/getMerchantAndDeviceList',
    type: 'post',
    list: dataList
  }
}

// 添加菜单
export function add () {
  return {
    // isOpen: false,
    url: '/sys/menu/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改菜单
export function update () {
  return {
    // isOpen: false,
    url: '/sys/menu/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除菜单
export function del () {
  return {
    // isOpen: false,
    url: '/sys/menu/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
