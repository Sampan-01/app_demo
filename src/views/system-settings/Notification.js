import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Divider } from 'antd'
import { BaseTable } from '@/components/common'
import NoticeModal from './includes/NoticeModal'
import { notificationColumn } from './includes/TableColumn'
import NoticeSearch from './includes/NoticeSearch'

export class Notification extends Component {
  static propTypes = {};
  constructor (props) {
    super(props)
    this.state = {
      tableList: [ { name: 1 } ],
      noticeModal: false,
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionColumn = {
      title: '操作',
      align: 'center',
      width: 140,
      render: () => (
        <Fragment>
          <Button size="small" type="primary" onClick={ this.handelEdit }>
            编辑
          </Button>
          <Divider type="vertical" />
          <Button size="small" type="danger">
            删除
          </Button>
        </Fragment>
      )
    }
  }
  componentDidMount () {
    this.initNoticeList()
  }
  initNoticeList = () => {};
  handelEdit = () => {
    this.setState({
      noticeModal: true
    })
  };
  hideCancelModal = () => {
    this.setState({
      noticeModal: false
    })
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initNoticeList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initNoticeList()
      }
    )
  };
  render () {
    const { tableList, noticeModal, pageInfo } = this.state
    const columnList = [ ...notificationColumn, this.actionColumn ]
    return (
      <Fragment>
        <NoticeSearch handleSearch={ this.initNoticeList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {noticeModal && (
          <NoticeModal
            { ...{ noticeModal } }
            hideCancelModal={ this.hideCancelModal }
          />
        )}
      </Fragment>
    )
  }
}

export default Notification
