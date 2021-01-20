import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "@spekta/react-oidc";
import { Callback } from "./components/callback";
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
          <AuthProvider>
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


