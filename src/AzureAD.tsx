import * as React from 'react';

interface IProps {
    clientID : string,
    graphScopes: string[], 
    authority?: string,
    unAuthenticatedComponent: JSX.Element
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

export default AzureAD;