import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import CountUp from 'react-countup'

import './index.less'

const dashboardList = [
  {
    title: '车城数量',
    end: 1200,
    icon: require('../../assets/images/home/ic_number_of_horsemen_nor@2x.png'),
    desc: '家',
    duration: 1.75
  },
  {
    title: '经销商数量',
    end: 1200,
    icon: require('../../assets/images/home/ic_dealer_nor@2x.png'),
    desc: '家',
    duration: 2.75
  },
  {
    title: '车辆数量',
    end: 1200,
    icon: require('../../assets/images/home/ic_number_of_horsemen_nor_car@2x.png'),
    desc: '辆',
    duration: 3.75
  },
  {
    title: '交易数量',
    end: 1200,
    icon: require('../../assets/images/home/ic_number_of_transaction_nor@2x.png'),
    desc: '辆',
    duration: 4.75
  }
]
export class DashBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dashboardList
    }
  }

  render () {
    const prefix = 'dashboard'
    const CardList = props => {
      return (
        <Col className={ `${ prefix }-row` } span={ 12 }>
          <Card hoverable={ true }>
            <div className={ `${ prefix }-row-card` }>
              <div className={ `${ prefix }-row-icon` }>
                <img src={ props.icon } />
              </div>
              <div className={ `${ prefix }-row-count-box` }>
                <CountUp
                  delay={ 1 }
                  separator=","
                  decimal=","
                  decimals={ 3 }
                  start={ 1 }
                  className={ `${ prefix }-row-count-box-up` }
                  { ...props }
                />
                <span className={ `${ prefix }-row-count-box-desc` }>
                  {props.desc}
                </span>
                <div className={ `${ prefix }-row-count-box-title` }>
                  {props.title}{' '}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      )
    }
    return (
      <div className={ `${ prefix }` }>
        <Row gutter={ 24 } className={ `${ prefix }-example` }>
          {this.state.dashboardList.map(item => {
            return <CardList { ...item } key={ item.duration } />
          })}
        </Row>
      </div>
    )
  }
}

export default DashBoard
