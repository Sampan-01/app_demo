import React, { PureComponent, Fragment } from 'react'
import { PropTypes } from 'prop-types'
import screenFull from 'screenfull'
import { connect } from 'react-redux'
import { Menu, Dropdown, Icon, Form, Input } from 'antd'
import { withRouter } from 'react-router-dom'
import { signOut } from '@/lib/tools'
import { fetchLogOut } from '@/api/login'
// import history from '@/lib/history'
import UpdatePwd from './UpdatePwd'

class BaseTop extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    history: PropTypes.object,
    updatePwdModal: PropTypes.bool,
    setAuth: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      fullscreenIconType: 'fullscreen',
      updatePwdModal: false
    }
  }
  componentDidMount () {
    screenFull.onchange(() => {
      const fullscreenIconType = screenFull.isFullscreen ?
        'fullscreen-exit' :
        'fullscreen'
      this.setState({
        fullscreenIconType
      })
    })
  }
  componentWillUnMount () {
    screenFull.off('change')
  }
  screenFullToggle = () => {
    if (screenFull.enabled) {
      screenFull.toggle()
    }
  };

  handleMenuClick = ({ key }) => {
    switch (key) {
      case 'editPwd':
        this.setState({
          updatePwdModal: true
        })
        break
      default:
        this.logOut()
        break
    }
  };
  logOut = async () => {
    this.props.setAuth()
    const { code } = await fetchLogOut()
    if (code) {
      this.setAuth()
      signOut()
      setTimeout(() => {
        // history.push('/login')
        this.props.history.push('/login')
      }, 300)
    }
  };

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.updatePwdModal) prevProps.form.resetFields()
  }

  handelModal = () => {
    this.setState({
      updatePwdModal: false
    })
  };
  render () {
    const menu = (
      <Menu onClick={ this.handleMenuClick }>
        <Menu.Item key="editPwd">修改密码</Menu.Item>
        <Menu.Item key="signOut">退出登录</Menu.Item>
      </Menu>
    )
    const { updatePwdModal } = this.state
    return (
      <Fragment>
        <div className="header-title">
          {/* <img src={ Logo } /> */}
          <p></p>
          <span>畅游汽车后台管理系统</span>
        </div>
        <div className="header-right">
          <Icon
            className="fullscreen-icon"
            size={ 20 }
            type={ this.state.fullscreenIconType }
            onClick={ () => this.screenFullToggle() }
          />
          <Dropdown
            overlay={ menu }
            placement="bottomCenter"
            overlayStyle={ { top: 66 } }
          >
            <a className="ant-dropdown-link" href="javascript:void(0)">
              欢迎admin登陆 <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        {updatePwdModal && (
          <UpdatePwd { ...{ updatePwdModal } } handelModal={ this.handelModal } />
        )}
      </Fragment>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setAuth: () => {
      dispatch({ type: 'LOG_OUT', payload: [] })
    }
  }
}
export default connect(
  '',
  mapDispatchToProps
)(withRouter(BaseTop))
