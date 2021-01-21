import React, { Component } from 'react'
import { Route } from "react-router-dom";
import AuthService from './service/authService'

import styles from './styles.module.css'

const AuthContext = React.createContext({
  signinRedirectCallback: () => ({}),
  logout: () => ({}),
  signoutRedirectCallback: () => ({}),
  isAuthenticated: () => ({}),
  signinRedirect: () => ({}),
  signinSilentCallback: () => ({}),
  createSigninRequest: () => ({}),
  getAccessToken: () => ({}),
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

export const AuthRoute = ({ component, loadingComponent, ...rest }) => {

  const loading = !!loadingComponent 
                  ? loadingComponent 
                  : <span>loading...</span>

  const renderRoute = (Component) => (props) => (
      <AuthConsumer>
          {({ isAuthenticated, signinRedirect, getAccessToken }) => {
              const accessToken = getAccessToken();

              if (!!Component && isAuthenticated()) {
                  return <Component {...props} accessToken={accessToken} />;
              } else {
                  signinRedirect();
                  return  {loading};
              }
          }}
      </AuthConsumer>
  );

  return <Route {...rest} render={renderRoute(component)} />;
};
