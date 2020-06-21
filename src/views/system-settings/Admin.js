import React, { Component, Fragment } from 'react'
import { PropTypes } from 'prop-types'
import { Divider, Button } from 'antd'
import { BaseTable } from '@/components/common'
import AdminSearch from './includes/AdminSearch'
import AddAdminModal from './includes/AddAdminModal'
import { adminColumn } from './includes/TableColumn'
class Admin extends Component {
  static propTypes = {
    form: PropTypes.object,
    adminModal: PropTypes.bool
  };
  constructor (props) {
    super(props)
    this.state = {
      adminModal: false,
      adminTitle: '',
      tableList: [ { name: '11' } ],
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionList = [
      {
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: 220,
        render: (text, record) => (
          <span>
            <Button type="primary" size="small" onClick={ this.handelEdit }>
              编辑
            </Button>
            <Divider type="vertical" />
            <Button type="primary" size="small">
              禁用
            </Button>
            <Divider type="vertical" />
            <Button type="danger" size="small">
              删除
            </Button>
          </span>
        )
      }
    ]
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.adminModal) prevProps.form.resetFields()
  }
  componentDidMount () {
    this.initAdminList()
  }

  initAdminList = () => {};

  handelEdit = () => {
    this.setState({
      adminModal: true,
      adminTitle: '编辑管理员'
    })
  };
  handelSuccessModal = () => {
    this.setState({
      adminModal: true
    })
  };

  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        // this.distributorList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        // this.distributorList()
      }
    )
  };
  render () {
    const { tableList, adminModal, adminTitle, pageInfo } = this.state
    const columnList = [ ...adminColumn, ...this.actionList ]
    return (
      <Fragment>
        <AdminSearch handleSearch={ this.initAdminList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        ></BaseTable>
        {adminModal && (
          <AddAdminModal
            { ...{ adminModal, adminTitle } }
            handelSuccessModal={ this.handelSuccessModal }
            hideCancelModal={ () =>
              this.setState({
                adminModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Admin
