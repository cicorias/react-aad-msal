#!/usr/bin/env bash
# up the patch on this build...
npm version patch
git config --global user.email "mrrobot@nowhere.com"
git config --global user.name "Mr Robot"
GITPWD=$1
URL=https://mrrobot:${GITPWD}@reactaad.visualstudio.com/_git/react-aad-msal
echo $URL
git push $URL