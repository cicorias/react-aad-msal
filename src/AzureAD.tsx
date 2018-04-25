import * as React from 'react';
import * as Msal from 'msal';

enum LoginType {
    Popup,
    Redirect,
}

type UserInfoCallback = (token: IUserInfo) => void;

type UnauthenticatedFunction = (login: LoginFunction) => JSX.Element;

type LoginFunction = () => void;

interface IProps {
    clientID : string,
    graphScopes: string[], 
    authority?: string,
    type?: LoginType,
    unauthenticatedFunction: UnauthenticatedFunction,
    userInfoCallback: UserInfoCallback,
}

interface IState {
    authenticated: boolean,
    token: IUserInfo | null,
}

interface IUserInfo {
    accessToken: string,
    user: Msal.User,
}

class AzureAD extends React.Component<IProps, IState> {
    state: IState = {
        authenticated: false,
        token: null,
    };

    private login = () => {
        // Log into MSAL
    };

    private logout = () => {

    }

    render() {
        if (!this.state.authenticated) {
            return this.props.unauthenticatedFunction(this.login);
        }
        return this.props.children;
    }
}

export {AzureAD, LoginType, IUserInfo, UnauthenticatedFunction, LoginFunction};
export default AzureAD;