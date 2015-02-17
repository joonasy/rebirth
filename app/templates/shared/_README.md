# <%= appNameHumanize %>

> <%= appDescription %>. Generated on <%= (generatorDate) %> using [<%= pkg.name %> v<%= pkg.version %>](<%= (generatorRepository) %>).

## Instructions 

Please read [Mediasignal Web Starter Kit](https://bitbucket.org/mediasignal/generator-msc.git) guide.

## Requirements

* [Node.js](http://nodejs.org/) ([Npm](https://www.npmjs.org/)) 
* [Compass](http://compass-style.org/) ([Ruby](https://www.ruby-lang.org/en/)) `gem install compass`
* [Yeoman](http://yeoman.io/) (For using generators) `npm install -g yo`
* [Grunt](http://gruntjs.com/) `npm install -g grunt-cli`
* [Bower](http://bower.io/) `npm install -g bower`

Install all the requirements before doing the project install.

## Install

Install node modules
  
    npm install

Install bower packages
  
    bower install

## Usage (CSS/JS development)

* `grunt`: Minifies images, compiles and autoprefixes CSS and builds a custom modenizr package. Run **always** before each release.
* `grunt dev`: Watches files and livereloads browser on save.
