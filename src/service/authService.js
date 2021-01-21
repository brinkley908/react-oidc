import { UserManager, WebStorageStateStore, Log } from 'oidc-client';
import {configureIdentityConfig, configureMetaData}  from '../utils/config';

export default class AuthService {
    UserManager;
    localStore;
    identityConfig;

    constructor(identityConfig, metaData, localStore, logger){
  
        identityConfig = configureIdentityConfig(identityConfig);

        metaData = configureMetaData(metaData);

        this.localStore = localStore;

        this.identityConfig = identityConfig;

        const store = this.localStore? localStorage : sessionStorage;

        this.UserManager = new UserManager({
            ...identityConfig,

            userStore: new WebStorageStateStore({
                store: store
            }),

            metadata: {...metaData}

        });

        if(logger){
            Log.logger = logger;
            Log.level = Log.DEBUG;
        }

        this.UserManager.events.addUserLoaded((user) => {
            console.log("addUserLoaded event")
            if (window.location.href.indexOf("signin-oidc") !== -1) {
                this.navigateToScreen();
            }
        });
        this.UserManager.events.addSilentRenewError((e) => {
            console.log("silent renew error", e.message);
        });

        this.UserManager.events.addAccessTokenExpired(() => {
            console.log("token expired");
            this.signinSilent();
        });

    } 

    getUserManager = () => {
        return this.UserManager;
    }

    signinRedirectCallback = () => {
        this.UserManager.signinRedirectCallback().then(() => {
            "";
        });
    };

    getUser = async () => {
        const user = await this.UserManager.getUser();
        if (!user) {
            return await this.UserManager.signinRedirectCallback();
        }
        return user;
    };

    signinRedirect = () => {
        const storage = this.localStore ? localStorage : sessionStorage;
        storage.setItem("redirectUri", window.location.pathname);
        this.UserManager.signinRedirect({});
    };

    navigateToScreen = () => {
        const storage = this.localStore ? localStorage : sessionStorage;
        var redirectUri = storage.getItem("redirectUri");
        window.location.replace(redirectUri);
    };


  

    getClientId = () => {
        if(this.identityConfig === undefined  || this.identityConfig.client_id === undefined){
            return process.env.REACT_APP_OIDC_CLIENT_ID;
        }
        return this.identityConfig.client_id;
    }

    getStorage = () => {
        const storage = this.localStore ? localStorage : sessionStorage;
        const result = JSON.parse(storage.getItem(`oidc.user:${this.identityConfig.authority}:${this.identityConfig.client_id}`));
        return result;
    }

    isAuthenticated = () => {
        const storage = this.localStore ? localStorage : sessionStorage;
        const oidcStorage = JSON.parse(storage.getItem(`oidc.user:${this.identityConfig.authority}:${this.identityConfig.client_id}`))
        return (!!oidcStorage && !!oidcStorage.access_token)
    };

    getAccessToken = () => {
        const storage = this.localStore ? localStorage : sessionStorage;
        const oidcStorage = JSON.parse(storage.getItem(`oidc.user:${this.identityConfig.authority}:${this.identityConfig.client_id}`))
        if (!!oidcStorage && !!oidcStorage.access_token) {
            return oidcStorage.access_token;
        }

        return "";
    }

    parseJwt = (token) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };

    signinSilent = () => {
        this.UserManager.signinSilent()
            .then((user) => {
                console.log("signed in", user);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    signinSilentCallback = () => {
        this.UserManager.signinSilentCallback();
    };

    createSigninRequest = () => {
        return this.UserManager.createSigninRequest();
    };

    logout = () => {
        const storage = this.localStore ? localStorage : sessionStorage;
        this.UserManager.signoutRedirect({
            id_token_hint: storage.getItem("id_token")
        });
        this.UserManager.clearStaleState();
    };

    signoutRedirectCallback = () => {
        const storage = this.localStore ? localStorage : sessionStorage;
        this.UserManager.signoutRedirectCallback().then(() => {
            storage.clear();
            window.location.replace(this.identityConfig.publicUrl);
        });
        this.UserManager.clearStaleState();
    };
}