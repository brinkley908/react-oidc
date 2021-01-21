export function configureIdentityConfig(identityConfig){

    if(!!identityConfig) return identityConfig;

    return {
        authority: process.env.REACT_APP_OIDC_AUTHORITY, //(string): The URL of the OIDC provider.
        client_id: process.env.REACT_APP_OIDC_CLIENT_ID, //(string): Your client application's identifier as registered with the OIDC provider.
        redirect_uri: process.env.REACT_APP_OIDC_REDIRECT_URL, //The URI of your client application to receive a response from the OIDC provider.
        login: process.env.REACT_APP_OIDC_LOGIN,
        automaticSilentRenew: process.env.REACT_APP_OIDC_AUTOMATIC_SILENT_RENEW, //(boolean, default: false): Flag to indicate if there should be an automatic attempt to renew the access token prior to its expiration.
        loadUserInfo: process.env.REACT_APP_OIDC_LOAD_USER_INFO, //(boolean, default: true): Flag to control if additional identity data is loaded from the user info endpoint in order to populate the user's profile.
        silent_redirect_uri: process.env.REACT_APP_OIDC_SILENT_REDIRECT_URL, //(string): The URL for the page containing the code handling the silent renew.
        post_logout_redirect_uri: process.env.REACT_APP_OIDC_LOGOFF_REDIRECT_URL, // (string): The OIDC post-logout redirect URI.
        audience: process.env.REACT_APP_OIDC_AUDIENCE, //is there a way to specific the audience when making the jwt
        response_type: process.env.REACT_APP_OIDC_RESPONSE_TYPE, //(string, default: 'id_token'): The type of response desired from the OIDC provider.
        response_mode: process.env.REACT_APP_OIDC_RESPONSE_MODE,
        grantType: process.env.REACT_APP_OIDC_GRANT_TYPE,
        scope: process.env.REACT_APP_OIDC_SCOPE, //(string, default: 'openid'): The scope being requested from the OIDC provider.
        webAuthResponseType: process.env.REACT_APP_OIDC_WEB_AUTH_RESPONSE_TYPE,
        publicUrl: process.env.REACT_APP_OIDC_PUBLIC_URL
    }
    
}

export function configureMetaData(metaData){
    
    if(!!metaData) return metaData;

    return {
        issuer: process.env.REACT_APP_OIDC_ISSUER,
        jwks_uri: process.env.REACT_APP_OIDC_JWKS_URI,
        authorization_endpoint: process.env.REACT_APP_OIDC_AUTHORIZATION_ENDPOINT,
        token_endpoint: process.env.REACT_APP_OIDC_TOKEN_ENDPOINT,
        userinfo_endpoint: process.env.REACT_APP_OIDC_USER_INFO_ENDPOINT,
        end_session_endpoint: process.env.REACT_APP_OIDC_END_SESSION_ENDPOINT,
        check_session_iframe: process.env.REACT_APP_OIDC_CHECK_SESSION_IFRAME,
        revocation_endpoint: process.env.REACT_APP_OIDC_REVOCATION_ENDPOINT,
        introspection_endpoint: process.env.REACT_APP_OIDC_INTROPSPECTION_ENDPOINT
    }

}