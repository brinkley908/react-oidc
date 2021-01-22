# @spekta/react-oidc

> This extends oidc-client for easy to use authorisation

[![NPM](https://img.shields.io/npm/v/@spekta/react-oidc.svg)](https://www.npmjs.com/package/@spekta/react-oidc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @spekta/react-oidc
```

## Usage with .env

If AuthProvider is used without authority configuration parameters .env variables are assumed.

```jsx
import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@spekta/react-oidc";
import { Callback } from "./components/callBack";
import { Logout } from "./components/logout";
import { LogoutCallback } from "./components/logoutCallback";
import { Register } from "./components/register";
import { SilentRenew } from "./components/silentRenew";
import { PublicPage } from "./components/publicPage";
import { PrivatePage } from "./components/privatePage";
import { PrivateRoute } from "./routes/privateRoute";

import '@spekta/react-oidc/dist/index.css'

export default class App extends Component {
  render() {
      return (
          <AuthProvider logger={console} >
              <BrowserRouter basename={"/"} >
                <Switch>
                  <Route exact={true} path="/signin-oidc" component={Callback} />
                  <Route exact={true} path="/logout" component={Logout} />
                  <Route exact={true} path="/logout/callback" component={LogoutCallback} />
                  <Route exact={true} path="/register" component={Register} />
                  <Route exact={true} path="/silentrenew" component={SilentRenew} />
                  <PrivateRoute path="/dashboard" component={PrivatePage} />
                  <Route path="/" component={PublicPage} />
              </Switch>
            </BrowserRouter>
          </AuthProvider>
      );
  }
}
```

## .env
```jsx
REACT_APP_OIDC_AUTHORITY=https://localhost:44395
REACT_APP_OIDC_CLIENT_ID=example
REACT_APP_OIDC_REDIRECT_URL=http://localhost:3000/signin-oidc
REACT_APP_OIDC_LOGIN=https://localhost:44395/account/login
REACT_APP_OIDC_PUBLIC_URL=http://localhost:3000
REACT_APP_OIDC_SILENT_REDIRECT_URL=http://localhost:3000/silentrenew
REACT_APP_OIDC_LOGOFF_REDIRECT_URL=http://localhost:3000/logout
REACT_APP_OIDC_AUTOMATIC_SILENT_RENEW=true
REACT_APP_OIDC_LOAD_USER_INFO=true
REACT_APP_OIDC_RESPONSE_TYPE=code
REACT_APP_OIDC_RESPONSE_MODE=fragment
REACT_APP_OIDC_GRANT_TYPE=pasword
REACT_APP_OIDC_SCOPE=openid profile email roles dataEventRecords offline_access
REACT_APP_OIDC_WEB_AUTH_RESPONSE_TYPE=code
REACT_APP_OIDC_AUDIENCE=https://example.com

REACT_APP_OIDC_ISSUER=https://localhost:44395/
REACT_APP_OIDC_JWKS_URI=https://localhost:44395/.well-known/jwks
REACT_APP_OIDC_AUTHORIZATION_ENDPOINT=https://localhost:44395/connect/authorize
REACT_APP_OIDC_TOKEN_ENDPOINT=https://localhost:44395/connect/token
REACT_APP_OIDC_USER_INFO_ENDPOINT=https://localhost:44395/connect/userinfo
REACT_APP_OIDC_END_SESSION_ENDPOINT=https://localhost:44395/connect/endsession
REACT_APP_OIDC_CHECK_SESSION_IFRAME=https://localhost:44395/connect/checksession
REACT_APP_OIDC_REVOCATION_ENDPOINT=https://localhost:44395/connect/revocation
REACT_APP_OIDC_INTROPSPECTION_ENDPOINT=https://localhost:44395/connect/itrospect
```

## Usage with configuration parameters
Authority configuration parameters can be passed to the AuthProvider component. These can also contain environment variables

```jsx
import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { AuthProvider, AuthRoute } from "@spekta/react-oidc";
import { Callback } from "./components/callBack";
import { Logout } from "./components/logout";
import { LogoutCallback } from "./components/logoutCallback";
import { Register } from "./components/register";
import { SilentRenew } from "./components/silentRenew";
import { PublicPage } from "./components/publicPage";
import { PrivatePage } from "./components/privatePage";
import { PrivateRoute } from "./routes/privateRoute";
import { IDENTITY_CONFIG, METADATA_OIDC } from "./config/oidcConfig";

import '@spekta/react-oidc/dist/index.css'

export default class App extends Component {
  render() {
      return (
          <AuthProvider logger={console} identityConfig={IDENTITY_CONFIG} metaData={METADATA_OIDC} >
              <BrowserRouter basename={"/"} >
                <Switch>
                  <Route exact={true} path="/signin-oidc" component={Callback} />
                  <Route exact={true} path="/logout" component={Logout} />
                  <Route exact={true} path="/logout/callback" component={LogoutCallback} />
                  <Route exact={true} path="/register" component={Register} />
                  <Route exact={true} path="/silentrenew" component={SilentRenew} />
                  <PrivateRoute path="/dashboard" component={PrivatePage} />
                  <Route path="/" component={PublicPage} />
              </Switch>
            </BrowserRouter>
          </AuthProvider>
      );
  }
}
```

## Configuration Structure Example
```jsx
export const IDENTITY_CONFIG = {
    authority: "https://authority.com", //(string): The URL of the OIDC provider.
    client_id: "client-portal", //(string): Your client application's identifier as registered with the OIDC provider.
    redirect_uri: process.env.REACT_APP_OIDC_REDIRECT_URL, //The URI of your client application to receive a response from the OIDC provider.
    login: "https://authority.com/account/login",
    automaticSilentRenew: process.env.REACT_APP_OIDC_AUTOMATIC_SILENT_RENEW, //(boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
    loadUserInfo: process.env.REACT_APP_OIDC_LOAD_USER_INFO, //(boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
    silent_redirect_uri: process.env.REACT_APP_OIDC_SILENT_REDIRECT_URL, //(string): The URL for the page containing the code handling the silent renew.
    post_logout_redirect_uri: process.env.REACT_APP_OIDC_LOGOFF_REDIRECT_URL, // (string): The OIDC post-logout redirect URI.
    //audience: process.env.REACT_APP_OIDC_AUDIENCE, //is there a way to specific the audience when making the jwt
    response_type: "code", //(string, default: 'id_token'): The type of response desired from the OIDC provider.
    response_mode: "fragment",
    //grantType: process.env.REACT_APP_OIDC_GRANT_TYPE,
    scope: "openid roles", //(string, default: 'openid'): The scope being requested from the OIDC provider.
    webAuthResponseType: process.env.REACT_APP_OIDC_WEB_AUTH_RESPONSE_TYPE,
    publicUrl: "https:/MyWebsite.com"
};

export const METADATA_OIDC = {
    issuer: "https://authority.com/",
    jwks_uri: "https://authority.com/.well-known/jwks",
    authorization_endpoint:"https://authority.com/connect/authorize",
    token_endpoint: "https://authority.com/connect/token",
    userinfo_endpoint: "https://authority.com/connect/userinfo",
    end_session_endpoint: "https://authority.com/connect/endsession",
    check_session_iframe: "https://authority.com/connect/checksession",
    revocation_endpoint: "https://authority.com/connect/revocation",
    introspection_endpoint: "https://authority.com/connect/introspect"
};
```

## AuthRoute
AuthRoute is similar to  ./routes/privateRoute in the example code. It passes the access token as parameter to its component attribute.

```jsx
...
import { AuthProvider, AuthRoute } from "@spekta/react-oidc";
import { MyLoader } from "./components/loaders"
...

export default class App extends Component {
  render() {
      return (
          <AuthProvider logger={console} identityConfig={IDENTITY_CONFIG} metaData={METADATA_OIDC} >
              <BrowserRouter basename={"/"} >
                <Switch>
                  <Route exact={true} path="/signin-oidc" component={Callback} />
                  <Route exact={true} path="/logout" component={Logout} />
                  <Route exact={true} path="/logout/callback" component={LogoutCallback} />
                  <Route exact={true} path="/register" component={Register} />
                  <Route exact={true} path="/silentrenew" component={SilentRenew} />
                  <AuthRoute path="/dashboard" component={PrivatePage} loadingComponent={MyLoader} />
                  <Route path="/" component={PublicPage} />
              </Switch>
            </BrowserRouter>
          </AuthProvider>
      );
  }
}

export const PrivatePage = (props) => {

    const bearerToken = props.accessToken;

    return (
        <div id="profile-partial-service">
            <div>Private page</div>
            <WebServiceComponent acessToken={bearerToken} />
        </div>
    );
};

```
## AuthContext Methods

```jsx
signinRedirectCallback()
logout()
signoutRedirectCallback()
isAuthenticated()
signinRedirect()
signinSilentCallback()
createSigninRequest()
getAccessToken()
getUserManager()

export const PrivateRoute = ({ component, ...rest }) => {
    const renderRoute = (Component) => (props) => (
        <AuthConsumer>
            {({ isAuthenticated, signinRedirect }) => {
                
                if (!!Component && isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    signinRedirect();
                    return <span>Loading...</span>;
                }
            }}
        </AuthConsumer>
    );

    return <Route {...rest} render={renderRoute(component)} />;
};



```
