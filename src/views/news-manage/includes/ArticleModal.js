import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Form, Col, Input, Icon, Modal, Button, Select } from 'antd'
import { BaseModal, BaseEditor } from '@/components/common'
import { fetchNewArticle } from '@/api/news'
import { articleRule } from './FormRule'

class ArticleModal extends Component {
  static propTypes = {
    form: PropTypes.object,
    articleModal: PropTypes.bool,
    articleTitle: PropTypes.string,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      articleInfo: {
        title: '',
        type: '',
        content: 'ddddd'
      }
    }
  }
  handelModal = e => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const { code } = await fetchNewArticle(fieldsValue)
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
    const { articleInfo } = this.state
    return (
      <BaseModal
        ModalTitle={ this.props.articleTitle }
        ModalVisible={ this.props.articleModal }
        hideSuccessModal={ () => this.handelModal(true) }
        hideModal={ () => this.hideCancelModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 12 }>
              <Form.Item label="文章标题">
                {getFieldDecorator('title', {
                  initialValue: articleInfo.title,
                  ...articleRule.title
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="分类">
                {getFieldDecorator('type', {
                  initialValue: articleInfo.type,
                  ...articleRule.type
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 24 }>
              <Form.Item label="内容">
                {getFieldDecorator('content', {
                  initialValue: articleInfo.content,
                  ...articleRule.content
                })(
                  <BaseEditor
                    tinymceId={ new Date().getTime() }
                    content={ articleInfo.content }
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    )
  }
}

export default Form.create({})(ArticleModal)
