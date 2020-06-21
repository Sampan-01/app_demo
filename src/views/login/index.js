import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { Row, Col, Form, Icon, Input, Button } from 'antd'
import './index.less'
import $ from 'jquery'
import { fetchCode, fetchLogin, fetchUserAuthList } from '@/api/login'
import { initialSelect } from '@/utils/CommonSelect'
import fetchJsonp from 'fetch-jsonp'

export class Login extends Component {
  static propTypes = {
    form: PropTypes.object,
    getAuth: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      validateCode: ''
    }
  }

  componentDidMount () {
    this.initCode()
  }

  initCode = async () => {
    const { code, results } = await fetchCode()
    if (code) {
      this.setState({ validateCode: results })
    }
  };
  handleSubmit = () => {
    this.props.getAuth(232)
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        // fetchLogin(fieldsValue).then(res => {
        //   console.log(res)
        // })
        // fetchJsonp('http://47.105.60.116:8002/api/user/login', {
        //   method: 'POST',
        //   mode: 'no-cors', //可以在这设置跨域
        //   headers: {
        //     'Content-Type': 'application/json;charset=utf-8'
        //   },
        //   body: fieldsValue
        // })
        //   .then(response => response.json())
        //   .then(json => {
        //     console.log('parsed json', json)
        //   })
        //   .catch(ex => {
        //     console.log('parsing failed', ex)
        //   })
        $.ajax({
          url: 'http://47.105.60.116:8002/api/user/login', //用作跨域的url
          body: fieldsValue,
          dataType: 'jsonp', //jsonp类型
          jsonp: 'callbacks', //测试项目一中的返回函数名
          success: data => {
            console.log(data)
          }
        })
        // const { code } = await fetchLogin(fieldsValue)
        // if (code) {
        //   this.initAuthList()
        // }
      }
    })
  };
  initAuthList = async () => {
    const { code, results } = await fetchUserAuthList()
    if (code) {
      this.props.getAuth(results)
    }
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { validateCode } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 20 }
      }
    }

    return (
      <DocumentTitle title="登录-畅游汽车后台管理系统">
        <div className="HorizontalLoginForm">
          <div className="form-box">
            <div className="form-logo"></div>
            <Form>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [ { required: true, message: '账号不能为空' } ]
                })(
                  <Input
                    size="large"
                    prefix={
                      <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } />
                    }
                    placeholder="请输入账号"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [ { required: true, message: '密码不能为空' } ]
                })(
                  <Input.Password
                    size="large"
                    prefix={
                      <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } } />
                    }
                    placeholder="请输入密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('validateCode', {
                  rules: [ { required: true, message: '验证码不能为空' } ]
                })(
                  <Row gutter={ 8 }>
                    <Col span={ 16 }>
                      <Input size="large" placeholder="请输入验证码" />
                    </Col>
                    <Col span={ 8 }>
                      <Button
                        size="large"
                        className="code-btn"
                        onClick={ this.initCode }
                      >
                        <img src={ validateCode } />
                      </Button>
                    </Col>
                    <Col span={ 24 }>点击图片刷新验证码</Col>
                  </Row>
                )}
              </Form.Item>
              {/* <Form.Item></Form.Item> */}
            </Form>
            <Button
              size="large"
              type="primary"
              className="login-btn"
              onClick={ this.handleSubmit }
            >
              登录
            </Button>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAuth: params => {
      dispatch({ type: 'GET_AUTH_LIST', payload: params })
    }
  }
}
export default connect(
  '',
  mapDispatchToProps
)(Form.create({ name: 'login' })(Login))
