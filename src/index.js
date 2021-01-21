import React, { Component } from 'react'
import AuthService from './service/authService'

import styles from './styles.module.css'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

const AuthContext = React.createContext({
  signinRedirectCallback: () => ({}),
  logout: () => ({}),
  signoutRedirectCallback: () => ({}),
  isAuthenticated: () => ({}),
  signinRedirect: () => ({}),
  signinSilentCallback: () => ({}),
  createSigninRequest: () => ({}),
  getToken: () => ({}),
  getUserManager: () => ({})
})

export const AuthConsumer = AuthContext.Consumer

export class AuthProvider extends Component {
  authService

  constructor(props) {
    super(props)
    this.authService = new AuthService(
      props.identityConfig,
      props.metaData,
      props.localStore === undefined ? true : props.localStore,
      props.logger
    )
  }

  render() {
    return (
      <AuthContext.Provider value={this.authService}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
