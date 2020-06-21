import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import { Form, Input } from 'antd'
import { BaseModal } from '@/components/common'

class UpdatePwd extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    updatePwdModal: PropTypes.bool,
    handelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      pwd: 222
    }
  }

  handelModal = () => {
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        this.props.handelModal()
      }
    })
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 16 }
      }
    }
    const { updatePwdModal } = this.props
    return (
      <BaseModal
        ModalTitle={ '修改密码' }
        ModalVisible={ updatePwdModal }
        hideSuccessModal={ () => this.handelModal() }
        hideModal={ () =>
          this.setState({
            updatePwdModal: false
          })
        }
      >
        <Form layout={ 'horizontal' } { ...formItemLayout }>
          <Form.Item label="旧密码">
            {getFieldDecorator('oldPwd', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '密码不能为空'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="新密码">
            {getFieldDecorator('newPwd', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '密码不能为空'
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="再次输入新密码">
            {getFieldDecorator('assignPwd', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '密码不能为空'
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
        </Form>
      </BaseModal>
    )
  }
}
export default Form.create({})(UpdatePwd)
