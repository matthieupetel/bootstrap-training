# Openclass Bootstrap

This project is training to understand and use efficiently Bootstrap framework.

Front-end workflow
------------------

This project uses [Webpack](https://webpack.js.org/) and [Node.js](https://nodejs.org/en/) modules in order to process source files.

You must have them installed in order to compile assets.

### Installation

Install dependencies:

```bash
yarn install
```

### Assets compilation

Assets compilation commands are:

* `yarn run dev` : run assets compilation for dev environment
* `yarn run dev-watch` : run assets compilation for dev environment + launch a watcher
* `yarn run prod` : run assets compilation for prod environment (assets optimization)

#### Code Style

* `yarn run eslint` : run eslint in project
* `yarn run eslint-fix` : run eslint in project to fix errors
* `yarn run stylelint` : run stylelint in project
* `yarn run stylelint-fix` : run stylelint in project to fix errors

### Supported browsers

This project uses [browserlist](https://github.com/browserslist/browserslist), Autoprefixer and Babel to manage cross-browser compatibility.
The scope of supported browsers is :
* the last 2 versions of all browsers
* additionally, all versions that count more than 0.5% of market shares worldwide
* additionally, Firefox ESR (Extended Support Release) version
* excluding all browsers not developed or maintained anymore
* excluding Opera Mini
* alpha and beta versions not released yet

The complete list of supported browsers and versions [can be found here](https://browserl.ist/?q=last+2+versions%2C+%3E0.5%25%2C+Firefox+ESR%2C+not+dead%2C+unreleased+versions).

Openclass summary (TODO)
------------------
