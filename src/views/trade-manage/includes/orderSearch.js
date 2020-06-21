import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button, Icon, DatePicker, Select } from 'antd'
import { PropTypes } from 'prop-types'

const { RangePicker } = DatePicker
const { Option } = Select

export class OrderRecordSearch extends PureComponent {
  static propTypes = {
    form:PropTypes.array
  }
  state = {
    expand: false
  };
  handleSearch = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
    })
  };
  onChange (date, dateString) {
    console.log(date, dateString)
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 16 }
      }
    }
    return (
      <div>
        <Form
          { ...formItemLayout }
          layout="inline"
          className="ant-search-form"
          onSubmit={ this.handleSearch }
        >
          <Row gutter={ 10 }>
            <Col span={ 6 }>
              <Form.Item label="ID">
                {getFieldDecorator('id')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="买家信息">
                {getFieldDecorator('id')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="卖家信息">
                {getFieldDecorator('id')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="创建时间">
                {getFieldDecorator('id')(
                  <RangePicker onChange={ this.onChange } />
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="下单状态">
                {getFieldDecorator('id', {
                  initialValue: 'all'
                })(
                  <Select defaultValue="all" onChange={ this.onChange }>
                    <Option value="all" key="all">
                      全部
                    </Option>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="平台/车城">
                {getFieldDecorator('id')(
                  <Select defaultValue="all" onChange={ this.onChange }>
                    <Option value="all">全部</Option>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="经销商">
                {getFieldDecorator('id')(
                  <Select defaultValue="all" onChange={ this.onChange }>
                    <Option value="all">全部</Option>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="业务员">
                {getFieldDecorator('id')(
                  <Select defaultValue="all" onChange={ this.onChange }>
                    <Option value="all">全部</Option>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={ 24 } style={ { textAlign: 'right' } }>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button style={ { marginLeft: 8 } } onClick={ this.handleReset }>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create({})(OrderRecordSearch)
