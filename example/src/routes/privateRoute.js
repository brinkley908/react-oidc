import React from "react";
import { Route } from "react-router-dom";
import { AuthConsumer } from "@spekta/react-oidc";

export const PrivateRoute = ({ component, ...rest }) => {
    const renderFn = (Component) => (props) => (
        <AuthConsumer>
            

            {({ isAuthenticated, signinRedirect, getToken }) => {
                
                if (!!Component && isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    signinRedirect();
                    return <span>{ getToken() }</span>;
                }
            }}
        </AuthConsumer>
    );

    return <Route {...rest} render={renderFn(component)} />;
};
