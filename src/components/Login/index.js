import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isLoginFailure: false, errorMsg: ''}

  getUserName = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailure = error => {
    this.setState({isLoginFailure: true, errorMsg: error})
  }

  onLoginClick = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userData = {
      username,
      password,
    }
    const loginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(loginApi, options)
    const data = await response.json()

    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label className="label-element" htmlFor="username">
          USERNAME
        </label>
        <input
          onChange={this.getUserName}
          value={username}
          placeholder="Username"
          className="input-element"
          id="username"
          type="text"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label className="label-element" htmlFor="password">
          PASSWORD
        </label>
        <input
          onChange={this.getPassword}
          value={password}
          placeholder="Password"
          className="input-element"
          id="password"
          type="password"
        />
      </div>
    )
  }

  render() {
    const {isLoginFailure, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-route-container">
        <div className="login-card">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.onLoginClick} className="form-container">
            {this.renderUserName()}
            {this.renderPassword()}
            <button className="login-btn" type="submit">
              Login
            </button>
            {isLoginFailure && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
