# My Web Starter Kit ([generator-my](https://bitbucket.org/mediasignal/generator-my.git))

> My combined styleguide, starter kit and Yeoman generator for new web projects (TYPO3/WordPress/Html).

This starter kit contains methods and ideas from various sources such as [BEM](https://bem.info/), [HTML5BP](http://html5boilerplate.com/), [Bootstrap](http://getbootstrap.com), [Foundation](http://foundation.zurb.com/), [INUITCSS](https://github.com/inuitcss), [SMACSS](https://smacss.com/), [OOCSS](http://oocss.org/) and [SUIT CSS](https://github.com/suitcss/suit). By default this template supports IE10+, Mobile first -ideology and progressive enhancement.

This starter kit is **not a framework** but it contains predefined components and helpers that are meant to be modified based on your project needs.

## WORK IN PROGRESS!

Use only if you know what you are doing or you are working together with the author. Docs are currently very much outdated.

## Features

* Choose between TYPO3, WordPress or html project types
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
* [Docker Toolbox](https://www.docker.com/products/docker-toolbox)

### TYPO3 requirements

* [TYPO3 v^7.6.0](http://typo3.org)
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

* [TYPO3](docs/project/typo)
* [Html](docs/project)

## Installing

**1.** Install `generator-my`:

    npm install -g generator-my

**2.** Run the generator in your desired location, pass install directory, docker option, and your project type (`typo3`, `html` or `wordpress`):

    yo my [my-new-project-directory] --project=typo3 --docker=true

(If you are building a *Typo3 project* all special characters are removed from the extension directory name e.g. `my-project_name` -> `myprojectname`)

### Options

| Option      | Type    | Default | Description                                                  |
|-------------|---------|---------|--------------------------------------------------------------|
| `--docker`  | Boolean | true    | Set to false if you want to install extension/theme only.    |
| `--project` | String  | typo3   | Choose between `typo3`, `html` and `wordpress` project types |

## Contribute

Please discuss about new ideas and things that you think should be modified. Currently all the styleguiding, components (CSS/JS) and generator logic has been made by Joonas Ylitalo [@joonasy](https://twitter.com/joonasy).

[Learn more about contributing](https://bitbucket.org/mediasignal/my-web-starter-kit/src/master/docs/contribute.md)

## Todo (in random order)

* Apply new structural changes to docs
* Figure out some useful name for this project
* WordPress project guide
* Separate starters, docs and the yeoman generator
* Publish and finish the documentation
* Consider Capistrano for WordPress projects
* Typo3 content element starters
* WordPress content element (ACF) starters
* All necessary CSS components
* Sub generators for starters
* CSS modular scale
* Browserify -> Webpack (?)
* Maybe some sort of integration/forking with [generator-typo3](https://github.com/Milanowicz/generator-typo3)
* Testing for JavaScript
* Consider removing jQuery
* Dockerfile for Typo3

## License

Copyright (c) 2016 Joonas Ylitalo (Twitter: @joonasy) Licensed under the MIT license.
