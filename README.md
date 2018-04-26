## React AAD MSAL

### Overview
React AAD MSAL is a library to easily integrate the Microsoft Authentication Library with Azure Active Directory in your React app quickly and reliably.  The library focuses on flexibility, allowing you to define how you want to interact with logins and logouts.
### Setup
In the render module of your component, make sure to create an AzureAD component with the arguments you need.  This uses the functions that you will define.  Once the user is successfully authenticated, the component will render the OnAuthenticationComponent given.  This is where you should put the secure, user-specific parts of your app.  `loginCallback` and `printUserInfo` can be any user defined functions.


Find the assignment for ClientID and replace the value with the Application ID for your application from the azure portal.  The authority is the sign-in/signup policy for your application.  Graph scopes is a list of scope URLs that you want to grant access to.  You can find more information on the [active directory MSAL single page app azure sample](https://github.com/Azure-Samples/active-directory-b2c-javascript-msal-singlepageapp).
```javascript
// ...

  return (
    <AzureAD
      clientID={'<Application ID for your application>'}
      graphScopes={['https://<your-tenant-name>.onmicrosoft.com/hello/demo.read']}
      unauthenticatedFunction={this.loginCallback}
      userInfoCallback={this.printUserInfo}
      authority={'https://login.microsoftonline.com/tfp/<your-tenant-name>.onmicrosoft.com/<your-sign-in-sign-up-policy>'}
      type={LoginType.Popup}>
      <OnAuthenticationComponent />
    </AzureAD>
);
```
### Login
To login, first create a callback function for the AzureAD component to consume.  This function will be called when the component loads, and it will pass in the function to be called when the user wants to login.  In this case, we create a button that will log the user in.
```javascript
import AzureAD from 'AzureAD'

loginCallback = (login) => {
  return <button onclick={login}>Login</button>;
};
// ...
```
Once they're logged in, the AzureAD library will call another function given with an `IUserInfo` instance.  You can do whatever you want with this, but you should store it.  In this example, we just print it out to console.
```javascript
//...
printUserInfo = (userInfo) => {console.log(userInfo)};
//...
```

Once you've set this up, you should be able to set up a button to login that will hit an AAD instance.  To set up your instance, check out the documentation on [Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/get-started-azure-ad) and on how to connect an [Identity Provider](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-setup-msa-app) for that AAD instance.
### Samples

If you want to run examples of this library out of the box, feel free to go to [the samples repo](https://reactaad.visualstudio.com/react-aad-msal/).  There you'll find a couple implementations that leverage the library, as well as a tutorial of how to set up Azure Active Directory with an Identity Provider.