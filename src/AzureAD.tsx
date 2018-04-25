import * as React from 'react';

enum LoginType {
    Popup,
    Redirect,
}
interface IProps {
    clientID : string,
    graphScopes: string[], 
    authority?: string,
    type?: LoginType,
    unAuthenticatedComponent: JSX.Element,
}

interface IState {
    authenticated: boolean,
    idToken: string,
    accessToken: string,
}

class AzureAD extends React.Component<IProps, IState> {
    state: IState = {
        authenticated: false,
        idToken: "",
        accessToken: "",
    };

    login = () => {

    };

    render() {
        if (!this.state.authenticated) {
            return this.props.unAuthenticatedComponent;
        }
        return this.props.children;
    }
}

export {AzureAD, LoginType};
export default AzureAD;