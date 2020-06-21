import React, { Component, Fragment } from 'react'
import { Button } from 'antd'
import { BaseTable } from '@/components/common'
import { modelColumn } from './includes/TableColumn.js'
import ModelSearch from './includes/ModelSearch'
import { fetchVehicle } from '@/api/info'

export class VehicleModel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableList: [],
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionColumn = {
      title: '操作',
      width: 120,
      align: 'center',
      render: () => (
        <Fragment>
          <Button size="small">编辑</Button>
          <Button size="small">删除</Button>
        </Fragment>
      )
    }
  }
  componentDidMount () {
    this.initModelList()
  }
  initModelList = async (info = {}) => {
    const params = Object.assign(info, this.pageInfo)
    const { code, results } = await fetchVehicle(params)
    if (code) {
      const pageInfo = {
        page: results.page,
        size: results.size,
        sizeCount: results.sizeCount
      }
      this.setState({
        tableList: results.data,
        pageInfo: pageInfo
      })
    }
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initModelList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initModelList()
      }
    )
  };
  render () {
    const { tableList, pageInfo } = this.state
    const columnList = [ ...modelColumn, this.actionColumn ]
    return (
      <Fragment>
        <ModelSearch handelSearch={ this.initModelList } />
        <BaseTable
          { ...{ pageInfo, columnList, tableList } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
      </Fragment>
    )
  }
}

export default VehicleModel
