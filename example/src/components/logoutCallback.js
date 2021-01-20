
import React from "react";
import { AuthConsumer } from "@spekta/react-oidc";

export const LogoutCallback = () => (
    <AuthConsumer>
        {({ signoutRedirectCallback }) => {
            signoutRedirectCallback();
            return <span>loading</span>;
        }}
    </AuthConsumer>
);
