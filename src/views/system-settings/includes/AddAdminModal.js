import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { BaseModal } from '@/components/common'
import { Row, Col, Form, Input, Select } from 'antd'
import { adminRule } from './FromRule'
import { fetchUserAdd } from '@/api/system'
const { Option } = Select

class AddAdminModal extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    adminModal: PropTypes.bool,
    adminTitle: PropTypes.string,
    handelSuccessModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      adminInfo: {
        username: '',
        account: '',
        password: '',
        state: 0,
        sid: null
      }
    }
  }
  handelSuccess = e => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const { code } = await fetchUserAdd(fieldsValue)
        if (code) {
          this.props.handelSuccessModal(e)
        }
      }
    })
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { adminInfo } = this.state
    return (
      <BaseModal
        ModalTitle={ this.props.adminTitle }
        ModalVisible={ this.props.adminModal }
        hideSuccessModal={ () => this.handelSuccess(true) }
        hideModal={ () => this.props.hideCancelModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 8 }>
              <Form.Item label="账号">
                {getFieldDecorator('account', {
                  initialValue: adminInfo.account,
                  ...adminRule.account
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  initialValue: adminInfo.password,
                  ...adminRule.password
                })(<Input.Password />)}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="姓名">
                {getFieldDecorator('username', {
                  initialValue: adminInfo.username,
                  ...adminRule.username
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="权限">
                {getFieldDecorator('sid', {
                  initialValue: adminInfo.sid,
                  ...adminRule.sid
                })(
                  <Select>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: adminInfo.state,
                  ...adminRule.state
                })(
                  <Select>
                    <Option value={ 0 }>开启</Option>
                    <Option value={ 1 }>禁用</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    )
  }
}

export default Form.create({})(AddAdminModal)
