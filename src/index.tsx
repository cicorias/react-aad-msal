import * as Msal from 'msal';
import * as React from 'react';
import { Store } from 'redux';
import { AAD_LOGIN_SUCCESS, loginSuccessful } from './actions';

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
  reduxStore?: Store
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
    // Log out of MSAL
  };

  dispatchToProvidedReduxStore(data: IUserInfo) {
    if (this.props.reduxStore) {
      this.props.reduxStore.dispatch(loginSuccessful(data))
    }
  }

  render() {
    if (!this.state.authenticated) {
      return this.props.unauthenticatedFunction(this.login);
    }
    return this.props.children;
  }
}

export { AzureAD, LoginType, IUserInfo, UnauthenticatedFunction, LoginFunction, AAD_LOGIN_SUCCESS };
export default AzureAD;