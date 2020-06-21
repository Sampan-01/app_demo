import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Row, Form, Col, Input, Button, Checkbox, Select } from 'antd'
import { BaseModal, BaseEditor } from '@/components/common'
import { Editor } from '@tinymce/tinymce-react'

const optionsWithDisabled = [
  { label: '应用推送', value: 'Apple' },
  { label: '短信通知', value: 'Pear' }
]

class NoticeModal extends Component {
  static propTypes = {
    form: PropTypes.object,
    noticeModal: PropTypes.bool,
    hideCancelModal: PropTypes.func
  };
  handelModal = () => {};
  hideCancelModal = () => {
    this.props.hideCancelModal()
  };
  getContent = () => {};
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <BaseModal
          ModalTitle="消息发送"
          ModalVisible={ this.props.noticeModal }
          hideSuccessModal={ () => this.handelModal(true) }
          hideModal={ () => this.hideCancelModal() }
        >
          <Form layout={ 'vertical' }>
            <Row gutter={ 20 }>
              <Col span={ 8 }>
                <Form.Item label="标题">
                  {getFieldDecorator('Shop', { initialValue: '1' })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="发送范围">
                  {getFieldDecorator('Shop', { initialValue: 2 })(
                    <Input type="textarea" />
                  )}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="状态">
                  {getFieldDecorator('Shop', { initialValue: [ 'Apple' ] })(
                    <Checkbox.Group options={ optionsWithDisabled } />
                  )}
                </Form.Item>
              </Col>
              <Col span={ 24 }>
                <Form.Item label="内容">
                  {getFieldDecorator('Shop', {})(
                    <BaseEditor
                      tinymceId={ new Date().getTime() }
                      content="232323"
                      getContent={ content => this.getContent(content) }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {/* <Editor value="lll" /> */}
        </BaseModal>
      </div>
    )
  }
}

export default Form.create({})(NoticeModal)
