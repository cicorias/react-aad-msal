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
    authenticated: boolean;
    token: string;
}

class AzureAD extends React.Component<IProps, IState> {
    state: IState = {
        authenticated: false,
        token: ""
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