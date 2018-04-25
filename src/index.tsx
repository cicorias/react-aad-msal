import * as Msal from 'msal';
import * as React from 'react';


enum LoginType {
  Popup,
  Redirect,
}

type UserInfoCallback = (token: IUserInfo) => void;

type UnauthenticatedFunction = (login: LoginFunction) => JSX.Element;

type LoginFunction = () => void;

interface IProps {
  clientID: string,
  graphScopes: string[],
  authority?: string,
  type?: LoginType,
  unauthenticatedFunction: UnauthenticatedFunction,
  userInfoCallback: UserInfoCallback,
}

interface IState {
  authenticated: boolean,
  userInfo: IUserInfo | null,
}

interface IUserInfo {
  jwtAccessToken: string,
  jwtIdToken: string,
  user: Msal.User,
}

class AzureAD extends React.Component<IProps, IState> {
  state: IState = {
    authenticated: false,
    userInfo: null,
  };

  login = () => {
    // Log into MSAL
  };

  logout = () => {
    ;
  }

  render() {
    if (!this.state.authenticated) {
      return this.props.unauthenticatedFunction(this.login);
    }
    return this.props.children;
  }
}

export { AzureAD, LoginType, IUserInfo, UnauthenticatedFunction, LoginFunction };
export default AzureAD;