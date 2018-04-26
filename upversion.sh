#!/usr/bin/env bash
# up the patch on this build...
npm version patch
GITPWD=$1
URL=https://mrrobot:${GITPWD}@reactaad.visualstudio.com/_git/react-aad-msal
echo $URL
git push $URL