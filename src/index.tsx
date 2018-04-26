import * as Msal from 'msal';
import * as React from 'react';
import { Store } from 'redux';
import { AAD_LOGIN_SUCCESS, loginSuccessful } from './actions';
import { Logger } from './logger';

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

class AzureAD extends React.Component<IProps, IState> {

  private clientApplication: Msal.UserAgentApplication;

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

  public render() {
    if (!this.state.authenticated) {
      return this.props.unauthenticatedFunction(this.login);
    }
    return this.props.children;
  }

  public createUserInfo = (accessToken: string, idToken: string, msalUser: Msal.User) => {
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

  private loginRedirect = (errorDesc: string, idToken: string, error: string, tokenType: string) => {
    if (idToken) {
      this.acquireTokens(idToken);
    }
    else if (errorDesc || error) {
      Logger.error(`Error doing login redirect; errorDescription=${errorDesc}, error=${error}`);
    }
  }

  private acquireTokens = (idToken: string) => {
    this.clientApplication.acquireTokenSilent(this.props.graphScopes)
      .then((accessToken: string) => {
        this.createUserInfo(accessToken, idToken, this.clientApplication.getUser());
      }, (tokenSilentError) => {
        Logger.error(`token silent error; ${tokenSilentError}`);
        this.clientApplication.acquireTokenPopup(this.props.graphScopes)
          .then((accessToken: string) => {
            this.createUserInfo(accessToken, idToken, this.clientApplication.getUser());
          }, (tokenPopupError) => {
            Logger.error(`token popup error; ${tokenPopupError}`);
          });
      });
  }

  private login = () => {
    if (this.props.type === LoginType.Popup) {
      this.clientApplication.loginPopup(this.props.graphScopes)
        .then((idToken: string) => {
          this.acquireTokens(idToken);
        }, (error) => {
          Logger.error(`Login popup failed; ${error}`);
        });
    } else {
      this.clientApplication.loginRedirect(this.props.graphScopes);
    }
  };

  private dispatchToProvidedReduxStore(data: IUserInfo) {
    if (this.props.reduxStore) {
      this.props.reduxStore.dispatch(loginSuccessful(data))
    }
  }

  // TODO: implement logout. commented out for tslint.
  /*private logout = () => {
    this.clientApplication.logout();
  };*/
}

export { AzureAD, LoginType, IUserInfo, UnauthenticatedFunction, LoginFunction, AAD_LOGIN_SUCCESS };
export default AzureAD;
