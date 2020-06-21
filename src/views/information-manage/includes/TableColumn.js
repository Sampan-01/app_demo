import React, { Fragment } from 'react'
import { ValidSelect } from '@/utils/CommonSelect'

function bState (rows) {
  let str = null
  ValidSelect.filter(item => {
    if (item.value === rows) {
      str = item.label
    }
  })
  return str
}
function vType (row) {}

export const brandColumn = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '状态',
    dataIndex: 'bState',
    render: (row, data) => bState(row)
  },
  {
    title: '关键字',
    dataIndex: 'bBrandKeyword'
  },
  {
    title: '品牌（英文）',
    dataIndex: 'bEname'
  },
  {
    title: '品牌（中文）',
    dataIndex: 'bCname'
  },
  {
    title: '首字母',
    dataIndex: 'bAcronym'
  },
  {
    title: '排序编号',
    dataIndex: 'sortNum'
  }
]
export const seriesColumn = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '状态',
    dataIndex: 'aState',
    render: (row, data) => bState(row)
  },
  {
    title: '关键字',
    dataIndex: 'aKeyword'
  },
  {
    title: '品牌',
    dataIndex: 'bname'
  },
  {
    title: '车系（中）',
    dataIndex: 'aCname'
  },
  {
    title: '车系（英）',
    dataIndex: 'aEname'
  },
  {
    title: '排序编号',
    dataIndex: 'sortNum'
  }
]
export const modelColumn = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '状态',
    dataIndex: 'vstate'
  },
  {
    title: '类型（国内外）',
    dataIndex: 'vtype',
    render: (row, data) => vType(row)
  },
  {
    title: '车辆数量',
    dataIndex: ''
  },
  {
    title: '车名（英）',
    dataIndex: 'vtypeEname'
  },
  {
    title: '车名（中）',
    dataIndex: 'vtypeCname'
  },
  {
    title: '品牌车系',
    dataIndex: 'bname'
  },
  {
    title: '车原地',
    dataIndex: 'vsource'
  },
  {
    title: '简称',
    dataIndex: 'vabbreviation'
  },
  {
    title: '年款',
    dataIndex: 'vannual'
  },
  {
    title: '最低价',
    dataIndex: ''
  },
  {
    title: '最高价',
    dataIndex: ''
  },
  {
    title: 'APP图片（大图）',
    dataIndex: 'vappImage'
  },
  {
    title: '排序编号',
    dataIndex: 'sortNum'
  }
]
export const ruleColumn = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '状态',
    dataIndex: 'state',
    render: (row, data) => bState(row)
  },
  {
    title: '车规名称',
    dataIndex: 'gaugeName'
  },
  {
    title: '排序编号',
    dataIndex: 'sortNum'
  }
]
