import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import '@/style/index.less'
import history from '@/lib/history'

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    isLogin: PropTypes.bool,
    history: PropTypes.object
  };
  componentDidMount () {
    if (!this.props.isLogin) {
      setTimeout(() => {
        this.props.history.push('/login')
      }, 300)
    }
  }

  componentDidUpdate () {
    if (!this.props.isLogin) {
      setTimeout(() => {
        this.props.history.push('/login')
      }, 300)
    }
  }
  render () {
    return this.props.children
  }
}

export default withRouter(App)
