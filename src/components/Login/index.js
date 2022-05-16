import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', errorShow: false}

  onUserChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  getLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({errorShow: true, errorMsg})
  }

  render() {
    const {username, password, errorShow, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-con">
        <div className="form-bg">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <form onSubmit={this.getLogin} className="form-con">
            <label htmlFor="name">USERNAME</label>
            <input
              value={username}
              onChange={this.onUserChange}
              id="name"
              placeholder="Username"
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              value={password}
              onChange={this.onPasswordChange}
              id="password"
              placeholder="Password"
              type="password"
            />
            <button className="login-btn" type="submit">
              Login
            </button>
            {errorShow && <p className="error">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
