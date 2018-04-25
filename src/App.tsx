import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import {AzureAD, LoginType, IToken, LoginFunction} from './AzureAD';

class App extends React.Component {

  setToken = (token: IToken) => {};

  foo = (login: LoginFunction) => {
    login();
    return (<div />);
  };

  public render() {
    // var unauth = (
    //   <div>
    //     <button onClick={} >Click me to log in!</button>
    //   </div>);
    return (
      <AzureAD
        clientID=""
        graphScopes={[""]}
        authority=""
        unauthenticatedFunction={this.foo}
        userInfoCallback={this.setToken}
        type={LoginType.Popup}>
        <div>Authed</div>
      </AzureAD>
    );
  }
}

export default App;
