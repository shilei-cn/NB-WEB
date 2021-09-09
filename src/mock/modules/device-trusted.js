import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'id': '@increment',
    'startDeviceSn': '@id',
    'endDeviceSn': '@id',
    'typeName': '@name',
    'model': '@name',
    'capability': '@csentence',
    'createTime': '@datetime'
  }))
}

var typeList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  typeList.push(Mock.mock({
    'id': '@increment',
    'typeName': '@name',
    'model': '@name',
    'capability': '@csentence',
    'createTime': '@datetime'
  }))
}

// 获取角色列表
export function list () {
  return {
    isOpen: true,
    url: '/devicetrusted/pageList',
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

// 获取设备类型列表
export function listType () {
  return {
    isOpen: true,
    url: '/devicetype/typeList',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'typeList': typeList
    }
  }
}

// 获取角色列表, 根据当前用户
export function select () {
  return {
    isOpen: true,
    url: '/devicetrusted/pageList',
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
    url: '/devicetrusted/pageList',
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
    url: '/devicetrusted/save',
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
    url: '/devicetrusted/update',
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
    url: '/devicetrusted/del',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
