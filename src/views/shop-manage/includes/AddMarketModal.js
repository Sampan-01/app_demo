import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Row, Col, Form, Input, Select } from 'antd'
import { BaseModal } from '@/components/common'
import { marketRule } from './FormRule'
import { ValidSelect } from '@/utils/CommonSelect'
import { getAllTrade, getDistSelectAll } from '@/utils/config'
import { fetchSalesmanAdd } from '@/api/shop'
const { Option } = Select

export class AddMarketModal extends Component {
  static propTypes = {
    editInfo: PropTypes.array,
    markTitle: PropTypes.bool,
    form: PropTypes.object,
    marketModal: PropTypes.bool,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      tradeList: [],
      distList: [],
      marketModal: this.props.marketModal,
      marketInfo: {
        id: '',
        tid: '',
        did: '',
        name: '',
        telephone: '',
        state: 1
      }
    }
  }
  componentDidMount () {
    console.log(this.props.editInfo)
    if (this.props.editInfo) {
      this.setState({
        marketInfo: this.props.editInfo
      })
    }
    getAllTrade().then(res => {
      this.setState({ tradeList: res })
    })
    getDistSelectAll().then(res => {
      this.setState({ distList: res })
    })
  }

  handelModal = e => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const { code } = await fetchSalesmanAdd(fieldsValue)
        if (code) {
          this.props.handelModal(e)
        }
      }
    })
  };
  hideCancelModal = () => {
    this.props.hideCancelModal()
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { marketInfo, tradeList, distList } = this.state
    return (
      <BaseModal
        ModalTitle={ this.props.markTitle }
        ModalVisible={ this.state.marketModal }
        hideSuccessModal={ () => this.handelModal(true) }
        hideModal={ () => this.hideCancelModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 12 }>
              <Form.Item label="所属车城">
                {getFieldDecorator('tid', {
                  initialValue: marketInfo.tid,
                  ...marketRule.tid
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
              <Form.Item label="所属经销商">
                {getFieldDecorator('did', {
                  initialValue: marketInfo.did,
                  ...marketRule.did
                })(
                  <Select>
                    {Object.values(distList).map(item => (
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
                  ...marketRule.state
                })(
                  <Select>
                    {Object.values(ValidSelect).map(item => (
                      <Option { ...item } key={ item.value }>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="业务员姓名">
                {getFieldDecorator('name', {
                  initialValue: marketInfo.name,
                  ...marketRule.name
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="手机号">
                {getFieldDecorator('telephone', {
                  initialValue: marketInfo.telephone,
                  ...marketRule.telephone
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    )
  }
}

export default Form.create({})(AddMarketModal)
