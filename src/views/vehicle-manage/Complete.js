import React, { Component, Fragment } from 'react'
import { Button, Divider } from 'antd'
import CompleteSearch from './includes/CompleteSearch'
import AddCompleteModal from './includes/AddCompleteModal'
import { BaseTable } from '@/components/common'
import { completeColumn } from './includes/TableColumn'
import { fetchCarAllList, fetchEditStatus } from '@/api/vehicle'
import moment from 'moment'
class Complete extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editInfo: {},
      completeModal: false,
      completeTitle: '',
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
      width: 140,
      render: (row, data) => (
        <Fragment>
          <Button
            size="small"
            type="primary"
            onClick={ () => this.hendelEdit(row) }
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            size="small"
            type="primary"
            onClick={ () => this.handelStatus(row) }
          >
            {row.status === 1 ? '屏蔽' : '生效'}
          </Button>
        </Fragment>
      )
    }
  }
  componentDidMount () {
    this.initCompleteList()
  }
  initCompleteList = async (info = {}) => {
    console.log(info)
    const dateRecord = info.dateRecord
    info.createDateLeft =
      dateRecord && dateRecord.length > 0 ?
        moment(dateRecord[ 0 ]).format('YYYY-MM-DD') :
        ''
    info.createDateRight =
      dateRecord && dateRecord.length > 0 ?
        moment(dateRecord[ 1 ]).format('YYYY-MM-DD') :
        ''
    const params = Object.assign(info, this.state.pageInfo)
    delete params.dateRecord
    const { code, results } = await fetchCarAllList(params)
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
  hendelEdit = row => {
    this.setState({
      editInfo: row,
      completeModal: true,
      completeTitle: '编辑'
    })
  };
  // 屏蔽状态
  handelStatus = async row => {
    const { code } = await fetchEditStatus({ id: row.id, status: row.status })
    if (code) {
      this.initCompleteList()
    }
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initCompleteList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initCompleteList()
      }
    )
  };
  render () {
    const { tableList, pageInfo, completeTitle, editInfo } = this.state
    const columnList = [ ...completeColumn, this.actionList ]
    return (
      <Fragment>
        <CompleteSearch handelSearch={ this.initCompleteList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {this.state.completeModal && (
          <AddCompleteModal
            editInfo={ editInfo }
            completeTitle={ completeTitle }
            completeModal={ this.state.completeModal }
            handelModal={ type => this.handelModal(type) }
            hideCancelModal={ _ =>
              this.setState({
                completeModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Complete
