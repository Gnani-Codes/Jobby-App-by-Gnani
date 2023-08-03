import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class Login extends Component {
  state = {
    inputUsername: '',
    inputPassword: '',
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      inputUsername: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      inputPassword: event.target.value,
    })
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onFailure = msg => {
    this.setState({errorMsg: msg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {inputUsername, inputPassword} = this.state
    console.log(inputUsername, inputPassword)
    const userDetails = {
      username: inputUsername,
      password: inputPassword,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({errorMsg: ''})

      this.onSuccess(data.jwt_token)
    } else if (data.status_code === 400) {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <Header />
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo-img"
            />
            <div className="label-input-container">
              <label htmlFor="username" className="label-element">
                Username
              </label>
              <input
                type="username"
                id="username"
                className="input-element"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="Password" className="label-element">
                Password
              </label>
              <input
                type="password"
                id="Password"
                className="input-element"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="form-login-btn">
              Login
            </button>
            <p className="form-error-msg">{errorMsg}</p>
          </form>
        </div>
      </>
    )
  }
}

export default Login
