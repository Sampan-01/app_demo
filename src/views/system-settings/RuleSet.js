import React, { Component, Fragment } from 'react'
import { PropTypes } from 'prop-types'
import { Divider, Button } from 'antd'
import { BaseTable } from '@/components/common'
import AddRuleSetModal from './includes/AddRuleSetModal'
import { ruleSetColumn } from './includes/TableColumn'
import RuleSetSearch from './includes/RuleSetSearch'

export class RuleSet extends Component {
  static propTypes = {
    form: PropTypes.object,
    ruleSetModal: PropTypes.bool
  };
  constructor (props) {
    super(props)
    this.state = {
      ruleSetModal: false,
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
    if (prevProps.ruleSetModal) prevProps.form.resetFields()
  }
  componentDidMount () {
    this.initRuleList()
  }
  initRuleList = () => {};

  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initRuleList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initRuleList()
      }
    )
  };
  render () {
    const { tableList, ruleSetModal, adminTitle, pageInfo } = this.state
    const columnList = [ ...ruleSetColumn, ...this.actionList ]
    return (
      <Fragment>
        <RuleSetSearch handleSearch={ this.initRuleList }></RuleSetSearch>
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        ></BaseTable>
        {ruleSetModal && <AddRuleSetModal { ...{ ruleSetModal } } />}
      </Fragment>
    )
  }
}

export default RuleSet
