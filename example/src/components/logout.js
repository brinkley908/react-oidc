import React from "react";
import { AuthConsumer } from "@spekta/react-oidc";

export const Logout = () => (
    <AuthConsumer>
        {({ logout }) => {
            logout();
            return <span>loading</span>;
        }}
    </AuthConsumer>
);