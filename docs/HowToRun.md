# How to run app locally?
1. Clone repo `git clone https://finn-gmbh-vezbji@git.codesubmit.io/finn-gmbh/wookie-movies-1-vezbji`
2. `cd wookie-movies-1-vezbji`
3. `npm install`
4. `npm start` - Expo UI will help you to see app on device or in web

## How to run tests?
For unit and integration tests: `npm run test`
For e2e tests:
 1. You need to have OS X (sadly I decided to skip part with adding support for ubuntu or windows)
 2. brew tap wix/brew
 3. brew install --HEAD applesimutils
 4. Unzip wookie-movies-1-vezbji.zip
 5. npm run test:e2e (it runs IOS tests, but you can run android too if you modify package.json)

In case if you made a change and want to run e2e tests to be sure that all good.
After step 3 and before step 4 you need:
 - expo login (use your expo account)
 - expo build:ios -t simulator
 - download and replace wookie-movies-1-vezbji.app file

## How to run lint?
`npm run lint`

