# node Version : v16.13.0

# npm version : v8.5.3

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**Commits could fail due to `husky`. try resolving all eslint errors before commiting**

**stylelint is not included in husky due to breaking changes. ensure linting css styles before commiting**

- use nvm to switch to node version mentioned above
- run `npm i` to install all dependencies
- run `npm run prepare` to setup husky
- run `npm start` to start the project

## Suggested VsCode extensions -

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (latest)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - (v8.2.0)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) (latest)

## Available Scripts

In the project directory, you can run:

### `npm run`

A utility provided by npm to list all available scripts

### `npm run prepare`

installs husky - Git hooks

### `npm run eslint`

lists all the eslint errors and suggestions

### `npm run eslint-fix`

lists all the eslint errors after auto fixing the fixable errors

### `npm run prettier`

prettify the whole project

### `npm run stylelint`

lints the css styles found in css, scss, js, jsx files

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
