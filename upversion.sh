#!/usr/bin/env bash
# up the patch on this build...
git config --global user.email "mrrobot@nowhere.com"
git config --global user.name "Mr Robot"
git checkout master -f
npm version patch
GITPWD=$1
URL=https://mrrobot:${GITPWD}@reactaad.visualstudio.com/_git/react-aad-msal
echo $URL

git push $URL

