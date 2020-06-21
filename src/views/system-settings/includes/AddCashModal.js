import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { BaseModal } from '@/components/common'
import { Row, Col, Form, Input, Select, Button, Icon } from 'antd'
import { cashRule } from './FromRule'
import { fetchDepositAdd } from '@/api/system'
let id = 0

class AddCashModal extends Component {
  static propTypes = {
    form: PropTypes.object,
    cashModal: PropTypes.bool,
    handelSuccessModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      cashInfo: {
        name: '',
        state: ''
      }
    }
  }
  componentDidMount () {
    this.add()
  }

  handelSuccess = e => {
    const { getFieldsValue } = this.props.form
    console.log(getFieldsValue())
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const { code } = await fetchDepositAdd(fieldsValue)
        if (code) {
          this.props.handelSuccessModal(e)
        }
      }
    })
  };
  remove = k => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    if (keys.length === 1) {
      return
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    })
  };

  add = () => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(id++)
    form.setFieldsValue({
      keys: nextKeys
    })
    const cashInfo = {}
    cashInfo[ `around${ id++ }` ] = ''
    cashInfo[ `around${ id++ }End` ] = ''
    cashInfo[ `around${ id++ }Dollar` ] = ''
    this.setState({
      cashInfo
    })
  };
  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { cashInfo } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 20 }
      }
    }
    getFieldDecorator('keys', { initialValue: [] })
    const keys = getFieldValue('keys')
    console.log(keys)
    const formItems = keys.map((k, index) => (
      <Fragment>
        <Col span={ 16 }>
          <Col span={ 12 }>
            <Form.Item
              { ...formItemLayout }
              label={ `范围${ index + 1 }` }
              key={ `around${ index + 1 }` }
              required={ false }
            >
              {getFieldDecorator(`around${ index + 1 }`, {
                initialValue: cashInfo[ `around${ index + 1 }` ],
                validateTrigger: [ 'onChange', 'onBlur' ],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '起始范围不能为空'
                  }
                ]
              })(
                <Fragment>
                  <Input min={ 0 } style={ { width: '94%' } } />
                  <span>元</span>
                </Fragment>
              )}
            </Form.Item>
          </Col>
          <Col span={ 12 }>
            <Form.Item key={ `around${ index + 1 }End` } required={ false }>
              {getFieldDecorator(`around${ index + 1 }End`, {
                initialValue: cashInfo[ `around${ index + 1 }End` ],
                validateTrigger: [ 'onChange', 'onBlur' ],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '结束范围不能为空'
                  }
                ]
              })(
                <Fragment>
                  <Input min={ 0 } style={ { width: '94%' } } />
                  <span>元</span>
                </Fragment>
              )}
            </Form.Item>
          </Col>
        </Col>
        <Col span={ 6 }>
          <Form.Item
            { ...formItemLayout }
            label="保证金"
            key={ `around${ index + 1 }Dollar` }
            required={ false }
          >
            {getFieldDecorator(`around${ index + 1 }Dollar`, {
              initialValue: cashInfo[ `around${ index + 1 }Dollar` ],
              validateTrigger: [ 'onChange', 'onBlur' ],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: '保证金不能为空'
                }
              ]
            })(
              <Fragment>
                <Input style={ { width: '92%' } } />
                <span>元</span>
              </Fragment>
            )}
          </Form.Item>
        </Col>
        <Col span={ 2 }>
          <Button
            shape="circle"
            size="small"
            icon="plus"
            type="primary"
            onClick={ this.add }
          />
          {index + 1 > 1 ? (
            <Button
              shape="circle"
              size="small"
              icon="minus"
              style={ { marginLeft: 4 } }
              onClick={ () => this.remove(k) }
            />
          ) : null}
        </Col>
      </Fragment>
    ))
    return (
      <BaseModal
        ModalWidth={ 1200 }
        ModalTitle={ 'this.props.adminTitle' }
        ModalVisible={ this.props.cashModal }
        hideSuccessModal={ this.handelSuccess }
        hideModal={ () => this.props.hideCancelModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 8 }>
              <Form.Item label="保证金组名称">
                {getFieldDecorator('name', {
                  initialValue: cashInfo.name,
                  ...cashRule.name
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: cashInfo.state,
                  ...cashRule.state
                })(
                  <Select>
                    <Option value={ 0 }>开启</Option>
                    <Option value={ 1 }>禁用</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            {/* <Col span={ 8 }>
              <Form.Item>
                <Button
                  type="primary"
                  style={ { marginTop: 28 } }
                  onClick={ this.add }
                >
                  <Icon type="plus" /> 增加范围
                </Button>
              </Form.Item>
            </Col> */}
          </Row>
          <Row gutter={ 20 }>{formItems}</Row>
        </Form>
      </BaseModal>
    )
  }
}

export default Form.create({})(AddCashModal)
