# <%= appNameHumanize %>

> <%= appDescription %>. Generated on <%= (generatorDate) %> using [<%= pkg.name %> v<%= pkg.version %>](<%= (generatorRepository) %>)<% if (typoProject) { %>using the Typo3 extension name `<%= appRoot %>`<% } %>.

## Instructions 

Please read [My Web Starter Kit](https://bitbucket.org/mediasignal/my-web-starter-kit) guide.

## Requirements
<% if (typoProject) { %>* [Typo3](https://typo3.org/)<% } %>
* [Node.js](http://nodejs.org/)
* [Npm](https://www.npmjs.org/)
* [Bower](http://bower.io/)

## Install

Install node modules
  
    npm install

Install bower packages
  
    bower install

## Usage (CSS/JS development)

* `npm run build`: Build the application.
<% if (deployment) { %>* `npm run deploy`: Build the application and deploy it to the server.<% } %><% if (htmlProject) { %>* `npm run dist`: Build the application and start a local server for testing purposes.<% } %>
* `npm run dev`: Watches files and activates Browsersync.
* `npm run test`: Checks JavaScript files for Coding style errors.
