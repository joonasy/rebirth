# Mediasignal Web Starter Kit ([generator-msc](https://bitbucket.org/mediasignal/generator-msc.git))

> Mediasignals combined styleguide, starter kit and Yeoman generator for new web projects (Typo3/Html).

This startekit contains methods and ideas from various sources such as [BEM](https://bem.info/), [HTML5BP](http://html5boilerplate.com/), [Bootstrap](http://getbootstrap.com), [Foundation](http://foundation.zurb.com/), [INUITCSS](https://github.com/inuitcss), [SMACSS](https://smacss.com/), [OOCSS](http://oocss.org/) and [SUIT CSS](https://github.com/suitcss/suit). By default this template supports IE9+, Mobile first -ideology and progressive enhancement.

This starter kit is **not a framework** but it contains predefined components and helpers that are meant to be modified based on your project needs.

## Note!

**`Html` project type and documentation environment are under construnction and not working at the moment.**

## Features

* Choose between `Html` or `Typo3` project types
* CSS Autoprefixing
* Livereloading with Browsersync
* Automatically compile Sass
* Image Optimization
* Combine media queries
* Browserify

## Getting started

Please read and understand all of the following before doing anything. All of these documents will be converted to html docs later on.


### Styleguides

* [CSS styleguide](https://bitbucket.org/mediasignal/mediasignal-web-starter-kit/src/master/docs/css/)
* [JS styleguide (work in progress)](docs/js)


### Project structures and workflows

* [Typo3](docs/project)
* [Html](docs/project)


## Requirements

Install all the requirements before installing the generator.

* [Node.js](http://nodejs.org/) 
* [Npm](https://www.npmjs.org/)
* [Yeoman](http://yeoman.io/) ```npm install -g yo```
* [Bower](http://bower.io/) ```npm install -g bower```


## Installing

**1.** Install ```generator-msc```:

    npm install -g generator-msc

**2.** Run the generator in your current directory or optionally pass a new install location (Note that if you are building a *Typo3 project*, your project folder will be used as your *extension path*):

    yo msc [my-new-project-directory]

or alternatively make a new directory, cd into it and run the generator:

    mkdir my-new-project && cd $_ && yo msc


## Usage

Run ```npm run build``` for building and ```npm run dev``` for developing.


## Contribute

Please discuss about new ideas and things that you think should be modified. Currently all the styleguiding, components (CSS/JS) and generator logic has been made by Joonas Ylitalo [@joonasy](https://twitter.com/joonasy).

[Learn more about contributing](https://bitbucket.org/mediasignal/mediasignal-web-starter-kit/src/master/docs/contribute.md)


## Todo (in random order)

* All necessary CSS components
* Sub generators for starters
* CSS modular scale
* Maybe some sort of integration/forking with [generator-typo3](https://github.com/Milanowicz/generator-typo3)
* Deployment settings (Phploy?)
* Rest of the JavaScript styleguide
* More testing for JavaScript
* Consider removing jQuery
* Add custom modernizr build
* Dockerfile (docker-compose) for docker environments
* Rewrite default JavaScript components to ES6


## License

MIT
