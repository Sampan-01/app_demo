import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Form, Input, Select } from 'antd'
import { BaseModal } from '@/components/common'
import { modelRule } from './FormRule'
import { ToggleSelect } from '@/utils/CommonSelect'
import { fetchMarketAdd } from '@/api/market'
import { getAllTrade } from '@/utils/config'
const { Option } = Select

export class AddModalMarket extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    addMarket: PropTypes.bool,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      marketInfo: {
        distributor: '',
        tid: null,
        address: '',
        distributorName: '',
        telephone: null,
        state: 0
      },
      tradeList: []
    }
  }
  componentDidMount () {
    getAllTrade().then(res => {
      this.setState({ tradeList: res })
    })
  }
  handelModal = e => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const { code } = await fetchMarketAdd(fieldsValue)
        if (code) {
          this.props.handelModal(e)
        }
      }
    })
  };
  hideCancelModal = _ => {
    this.props.hideCancelModal()
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { marketInfo, tradeList } = this.state
    return (
      <BaseModal
        ModalTitle={ '添加商城' }
        ModalVisible={ this.props.addMarket }
        hideSuccessModal={ () => this.handelModal(true) }
        hideModal={ () => this.hideCancelModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 12 }>
              <Form.Item label="经销商名称">
                {getFieldDecorator('distributor', {
                  initialValue: marketInfo.distributor,
                  ...modelRule.distributor
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="所属车城">
                {getFieldDecorator('tid', {
                  initialValue: marketInfo.tid,
                  ...modelRule.carType
                })(
                  <Select>
                    {Object.values(tradeList).map(item => (
                      <Option label={ item.cname } value={ item.id } key={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: marketInfo.state,
                  ...modelRule.status
                })(
                  <Select>
                    {Object.values(ToggleSelect).map(item => (
                      <Option { ...item } key={ item.value }>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="地址">
                {getFieldDecorator('address', {
                  initialValue: marketInfo.address,
                  ...modelRule.address
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="经销商负责人姓名">
                {getFieldDecorator('distributorName', {
                  initialValue: marketInfo.distributorName,
                  ...modelRule.distributorName
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="手机号">
                {getFieldDecorator('telephone', {
                  initialValue: marketInfo.telephone,
                  ...modelRule.phone
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    )
  }
}

export default Form.create({})(AddModalMarket)
