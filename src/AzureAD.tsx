import * as React from 'react';

enum LoginType {
    Popup,
    Redirect,
}

type TokenCallback = (token: IToken) => void;

type UnauthenticatedFunction = (login: LoginFunction) => JSX.Element;

type LoginFunction = () => void;

interface IProps {
    clientID : string,
    graphScopes: string[], 
    authority?: string,
    type?: LoginType,
    unauthenticatedFunction: UnauthenticatedFunction,
    tokenCallback: TokenCallback,
}

interface IState {
    authenticated: boolean,
    token: IToken,
}

interface IToken {
    idToken: string,
    accessToken: string,
}

class AzureAD extends React.Component<IProps, IState> {
    state: IState = {
        authenticated: false,
        token: {
            idToken: "",
            accessToken: "",
        },
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

export {AzureAD, LoginType, IToken, UnauthenticatedFunction, LoginFunction};
export default AzureAD;