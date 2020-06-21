export const adminColumn = [
  {
    title: '管理员ID',
    dataIndex: 'id'
  },
  {
    title: '管理员账号',
    dataIndex: 'account'
  },
  {
    title: '密码',
    dataIndex: 'password'
  },
  {
    title: '管理姓名',
    dataIndex: 'username'
  },
  {
    title: '状态',
    dataIndex: 'state'
  },
  {
    title: '权限',
    dataIndex: 'shiroName'
  }
]
export const ruleSetColumn = [
  {
    title: '权限名称',
    dataIndex: ''
  },
  {
    title: '状态',
    dataIndex: ''
  },
  {
    title: '权限内容',
    dataIndex: ''
  }
]
export const notificationColumn = [
  {
    title: '消息标题',
    dataIndex: 'name'
  },
  {
    title: '发送时间',
    dataIndex: ''
  },
  {
    title: '发送范围',
    dataIndex: ''
  },
  {
    title: '发送方式',
    dataIndex: ''
  }
]

export const depositColumn = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '保证金',
    dataIndex: 'state',
    render: (text, row) => (text === 0 ? '开启' : '关闭')
  },
  {
    title: '保证金范围',
    dataIndex: 'roundContent'
  }
]
