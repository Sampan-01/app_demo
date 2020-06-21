import React, { Component, PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row, Form, Col, Button, Select, Divider } from 'antd'
import { BaseTable } from '@/components/common'
import { fetchDepositList } from '@/api/system'
import { isEmpty } from '@/lib/utils'
import { depositColumn } from './includes/TableColumn'
import AddCashModal from './includes/AddCashModal'
import CashSearch from './includes/CashSearch'

const { Option } = Select
const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 16 }
  }
}
const style = {
  align: {
    textAlign: 'left'
  },
  reset: {
    marginRight: 6,
    marginTop: 4
  }
}

class CashDeposit extends Component {
  static propTypes = {
    form: PropTypes.object,
    cashModal: PropTypes.bool
  };
  constructor (props) {
    super(props)
    this.state = {
      cashModal: false,
      tableList: [ { name: '' } ],
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionList = {
      title: '操作',
      align: 'center',
      width: 200,
      fixed: 'right',
      render: () => (
        <div>
          <Button size="small" type="primary" onClick={ this.handelEdit }>
            编辑
          </Button>
          <Divider type="vertical" />
          <Button size="small" type="primary">
            禁用
          </Button>
          <Divider type="vertical" />
          <Button size="small" type="primary">
            删除
          </Button>
        </div>
      )
    }
  }
  componentDidMount () {
    this.initDepositList()
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.cashModal) prevProps.form.resetFields()
  }
  initDepositList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchDepositList(params)
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
  handelEdit = () => {
    this.setState({
      cashModal: true
    })
  };

  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initDepositList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initDepositList()
      }
    )
  };
  render () {
    const { tableList, pageInfo, cashModal } = this.state
    const columnList = [ ...depositColumn, this.actionList ]
    return (
      <Fragment>
        <CashSearch handelSearch={ this.initDepositList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {cashModal && (
          <AddCashModal
            { ...{ cashModal } }
            handelSuccessModal={ this.initDepositList }
            hideCancelModal={ () =>
              this.setState({
                cashModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default CashDeposit
