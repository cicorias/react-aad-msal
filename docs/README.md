![AAD React Logo](./images/logo.jpg)
# Quick start...
First, clone me - ssh preferred IMHO in VSTS.

The file you are reading now is in `./docs` - not the root. So, build your code "around" me :) 

# General documentation for this component
Authenticating with Active Directory is necessary for using basically all Microsoft developer offerings. Authenticating with AAD can be confusing, as there's different endpoints (v1, v2) and different libraries (msal, adal).

While there is a js library to help developers authenticate their client-side apps, there are still a lot of questions around how to integrate this into different popular js frameworks.

The open source community lacks an easy way to integrate msal into a react app. So let's make one

## Scope
- sample app that uses the component
- npm package that can be installed as a react component
- sample Nodejs API app that can be used for example API protected by OAuth2
- guidance for any manual configuration
- stretch: scripts for AAD Application setup, configuration, and IdP like Facebook
- stretch: sample API endpoint in C# WebApi on .NET Core
- stretch: Support React Native on Android, iOS, Windows


## Vision Statement
We'll create a sample app and publish an npm package that supports simple npm install then basic config to be simple as possible.

The code base is JavaScript, using React JS for the UI, NodeJS for the back-end, probably first example of the API back-end using Express or Restify.

We will rely on Passport JS for the plugin model on the back-end (most likely) given it's breadth of acceptance.  

While the sample will be JavaScript on the back-end, there is no reason that ASP.NET or anything that can interpret an OAuth bearer token on the HTTP headers can't be used.  So, if time we may show an.NET Core version tool

Finally, we may look at React Native support too - which is a stretch coal.


## Background

INSPIRATION
folks we're looking for a few more Devs that are interested or know React (under JavaScript) as we're working on creating a React component that will permit a developer to easily drop in with little fanfare the ability to use AAD OAuth2 with the V2 / B2C capabilities.

We have some prior work on this done for Fortis, some examples, but just think of the idea that "I'm a developer, now I want to add proper Authentication for FaceBook, Google, Azure AD even, to my React App" - which is JavaScript BTW... and usually a SPA