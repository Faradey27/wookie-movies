# Technical Stack 
As this is a test task for react-native position, the stack would be related to react, react-native and other similar things. In terms of motivation is react-native good choice or not - I would be happy to discuss during the next interview step - as the answer really depends on the future of the app and available resources.

## Expo
I decided to use expo.io as a generator for my react-native application. The main motivation for this: it allows you to not deal with infrastructure to build and run your app and as a result you able to save some time, they also provide an awesome developer experience. Also, expo allows you to extract and have vanilla react-native setup at any moment of time. From the downsides - performance will be a little bit worse in comparison to vanilla react-native setup, app size will be also bigger and in case if we decide to write some native code - it can be tricky.
In summary, from my perspective Expo is a good choice for such a small app in order to concentrate more on business logic.

## React-navigation
I decided to use https://reactnavigation.org/ to provide routing. React navigation has the biggest community, best support, one of the best performance and nice docs in comparison to competitors

## Redux toolkit + reselect
In order to manage application state I decided to go with redux(flux pattern) - https://redux-toolkit.js.org/.
It may be a little bit overkill for such small app, but same time it will simplify the way how we will work with search, lists, categories, pagination, etc. Also if we will have some side effects - it will be easy to add redux-observable(rxjs) or redux-saga.

## Typescript
I decided to use typescript instead of vanilla javascript to prevent some simple bugs, get nice autocomplete and be able to define entities in clear way for people who will review my code

## Testing
I don't believe in unit tests for UI heavy applications as it causes big problems during refactoring and it is hard to support them. Instead I prefer to have more integration tests that describes user stories + a little bit of e2e tests.
My rule is:
 - 20% unit tests for critcal unility functions
 - 60% of integration tests that provide 80-100% coverage
 - 20% of e2e tests to cover critical cases
 
More about this ideology you can find here: https://kentcdodds.com/blog/?q=testing

I decided to go with jest + [testing-library](https://testing-library.com/docs/guiding-principles) for unit and integration tests and with [detox](https://github.com/wix/Detox) for e2e tests

## Linting
I decided to go with prettier + typescript strict + eslint mode by default. As for me it will provide good enough quality for the main goal of the task.
