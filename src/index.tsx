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
  unauthenticatedFunction: UnauthenticatedFunction,
  userInfoCallback: UserInfoCallback,
  reduxStore?: Store
  authority?: string,
  type?: LoginType,
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

// TODO: implement logger method that is not console.log

class AzureAD extends React.Component<IProps, IState> {

  clientApplication: Msal.UserAgentApplication;

  constructor(props: IProps) {
    super(props);
    this.clientApplication = new Msal.UserAgentApplication(
      props.clientID,
      props.authority ? props.authority : null,
      this.loginRedirect
    );
    this.state = {
      authenticated: false,
      userInfo: null,
    };
  }

  loginRedirect = (errorDesc: string, idToken: string, error: string, tokenType: string) => {
    if (idToken) {
      this.acquireTokens(idToken);
    }
    else if (errorDesc || error) {
      console.log(error + ':' + errorDesc);
    }
  }

  acquireTokens = (idToken: string) => {
    this.clientApplication.acquireTokenSilent(this.props.graphScopes)

      .then((accessToken: string) => {
        this.createUserInfo(accessToken, idToken, this.clientApplication.getUser());
      }, (tokenSilentError) => {
        console.log(tokenSilentError);
        this.clientApplication.acquireTokenPopup(this.props.graphScopes)
          .then((accessToken: string) => {
            this.createUserInfo(accessToken, idToken, this.clientApplication.getUser());
          }, (tokenPopupError) => {
            console.log(tokenPopupError);
          });
      });
  }

  login = () => {
    if (this.props.type === LoginType.Popup) {
      this.clientApplication.loginPopup(this.props.graphScopes)
        .then((idToken: string) => {
          this.acquireTokens(idToken);
        }, (error) => {
          console.log(error);
        });
    } else {
      this.clientApplication.loginRedirect(this.props.graphScopes);
    }
  };

  dispatchToProvidedReduxStore(data: IUserInfo) {
    if (this.props.reduxStore) {
      this.props.reduxStore.dispatch(loginSuccessful(data))
    }
  }

  createUserInfo = (accessToken: string, idToken: string, msalUser: Msal.User) => {
    const user: IUserInfo = {
      jwtAccessToken: accessToken,
      jwtIdToken: idToken,
      user: msalUser
    };
    this.setState({
      authenticated: true,
      userInfo: user
    });

    this.dispatchToProvidedReduxStore(user);
  }

  logout = () => {
    this.clientApplication.logout();
  };

  render() {
    if (!this.state.authenticated) {
      return this.props.unauthenticatedFunction(this.login);
    }
    return this.props.children;
  }
}

export { AzureAD, LoginType, IUserInfo, UnauthenticatedFunction, LoginFunction, AAD_LOGIN_SUCCESS };
export default AzureAD;