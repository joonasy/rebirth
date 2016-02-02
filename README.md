# My Web Starter Kit ([generator-my](https://bitbucket.org/mediasignal/generator-my.git))

> My combined styleguide, starter kit and Yeoman generator for new web projects (Typo3/Html).

This starterkit contains methods and ideas from various sources such as [BEM](https://bem.info/), [HTML5BP](http://html5boilerplate.com/), [Bootstrap](http://getbootstrap.com), [Foundation](http://foundation.zurb.com/), [INUITCSS](https://github.com/inuitcss), [SMACSS](https://smacss.com/), [OOCSS](http://oocss.org/) and [SUIT CSS](https://github.com/suitcss/suit). By default this template supports IE10+, Mobile first -ideology and progressive enhancement.

This starter kit is **not a framework** but it contains predefined components and helpers that are meant to be modified based on your project needs.

## Features

* Choose between `Html`, `Typo3` or `WordPress` project types
* CSS Autoprefixing
* Livereloading with Browsersync
* Automatically compile Sass
* Image Optimization
* Combine media queries
* Browserify
* Development environment

## Requirements

Install all the requirements and setup your development environment before installing the generator.

* [Node.js](http://nodejs.org/) & [Npm](https://www.npmjs.org/)
* [Yeoman](http://yeoman.io/) `npm install -g yo`
* [Bower](http://bower.io/) `npm install -g bower`
* [Git](https://git-scm.com/) (optional)

My Web Starter Kit also provides configuration files setting up your development environment. Requirements for `Typo3/WordPress` project types:

* [Composer](https://getcomposer.org/)
* [Vagrant](https://www.vagrantup.com/), recommended [Homestead](https://laravel.com/docs/4.2/homestead). Or any similar LAMP/LEMP stack.
* [Docker Toolbox](https://www.docker.com/products/docker-toolbox) (alternatively for WordPress projects)

### Typo3 requirements

* [Typo3 v^7.6.0](http://typo3.org)
* [Flux](http://typo3.org/extensions/repository/view/flux)
* [Fluid Pages Engine](http://typo3.org/extensions/repository/view/fluidpages)
* [Fluid Content Engine](http://typo3.org/extensions/repository/view/fluidcontent)
* [Vhs](http://typo3.org/extensions/repository/view/vhs)

### WordPress requirements

* [Advanced Custom Fields Pro](http://www.advancedcustomfields.com/pro/) (if using components)

## Getting started

Please read and understand all of the following before doing anything. All of these documents will be converted to html docs later on.

### Styleguide

* [CSS styleguide](https://bitbucket.org/mediasignal/my-web-starter-kit/src/master/docs/css/)
* [JS styleguide](docs/js)

### Project instructions

* [Typo3](docs/project/typo)
* [Html](docs/project)

## Installing

**1.** Install `generator-my`:

    npm install -g generator-my

**2.** Run the generator in your current directory or optionally pass a new install location (If you are building a *Typo3 project* use underscores as spaces in your directory name e.g. `my_project_name`):

    yo my [my-new-project-directory]

or make a new directory, cd into it and run the generator:

    mkdir my-new-project && cd $_ && yo my

## Usage

Run `npm run build` for building and `npm run dev` for developing.

## Contribute

Please discuss about new ideas and things that you think should be modified. Currently all the styleguiding, components (CSS/JS) and generator logic has been made by Joonas Ylitalo [@joonasy](https://twitter.com/joonasy).

[Learn more about contributing](https://bitbucket.org/mediasignal/my-web-starter-kit/src/master/docs/contribute.md)

## Todo (in random order)

* WordPress project guide
* Consider Capistrano for WordPress projects
* Typo3 content element starters
* WordPress content element (ACF) starters
* All necessary CSS components
* Sub generators for starters
* CSS modular scale
* Maybe some sort of integration/forking with [generator-typo3](https://github.com/Milanowicz/generator-typo3)
* Testing for JavaScript
* Consider removing jQuery
* Consider separating starters and the generator
* Dockerfile for Typo3

## License

Copyright (c) 2016 Joonas Ylitalo (Twitter: @joonasy) Licensed under the MIT license.
