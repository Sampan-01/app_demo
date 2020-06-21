import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'
import { BaseTable } from '@/components/common'

import OrderRecordSearch from './includes/orderSearch'
import { orderColumnList } from './includes/TableColumn'
class OrderRecord extends Component {
  static propTypes = {};
  state = {
    expand: false,
    tableList: [],
    columnList: orderColumnList,
    pageInfo: {
      page: 1,
      size: 20,
      sizeCount: 0
    }
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
    const { columnList, tableList, pageInfo } = this.state
    return (
      <div>
        <OrderRecordSearch />
        <BaseTable
          { ...{ columnList, tableList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        ></BaseTable>
      </div>
    )
  }
}
export default OrderRecord
