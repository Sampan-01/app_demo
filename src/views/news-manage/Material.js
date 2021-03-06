import React, { Component, Fragment } from 'react'
import { Button, Divider } from 'antd'
import { BaseTable } from '@/components/common'
import { materialColumn } from './includes/TableColumn'
import MaterialSearch from './includes/MaterialSearch'

class Material extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articleModal: false,
      articleTitle: '',
      tableList: [],
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionList = {
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 220,
      render: () => (
        <Fragment>
          <Button size="small" type="primary">
            编辑
          </Button>
          <Divider type="vertical" />
          <Button size="small">查看</Button>
          <Divider type="vertical" />
          <Button size="small" type="danger">
            删除
          </Button>
        </Fragment>
      )
    }
  }
  componentDidMount () {
    // this.initNewList()
  }
  initNewList = async (info = {}) => {
    const params = Object.assign(info, this.state.searchInfo)
    const { code, results } = await fetchNewList(params)
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
        this.initNewList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initNewList()
      }
    )
  };
  render () {
    const { tableList, articleModal, articleTitle, pageInfo } = this.state
    const columnList = [ ...materialColumn, this.actionList ]
    return (
      <Fragment>
        <MaterialSearch handelSearch={ this.initNewList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
      </Fragment>
    )
  }
}

export default Material
