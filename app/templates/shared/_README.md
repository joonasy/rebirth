# <%= appNameHumanize %>

> <%= appDescription %>. Generated on <%= (generatorDate) %> using [<%= pkg.name %> v<%= pkg.version %>](<%= (generatorRepository) %>).

## Instructions 

Please read [Mediasignal Web Starter Kit](https://bitbucket.org/mediasignal/mediasignal-web-starter-kit) guide.

## Requirements

* [Node.js](http://nodejs.org/)
* [Npm](https://www.npmjs.org/)
* [Bower](http://bower.io/) `npm install -g bower`

## Install

Install node modules
  
    npm install

Install bower packages
  
    bower install

## Usage (CSS/JS development)

* `npm run build`: Build the application.
* `npm run deploy`: Build the application and deploy it to the server.
<% if (htmlProject) { %>* `npm run dist`: Build the application and start a local server for testing purposes.<% } %>
* `npm run dev`: Watches files and activates Browsersync.
* `npm run test`: Checks JavaScript files for Coding style errors.
