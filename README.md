# Rebirth

Awesome front-end starter kit and opinionated styleguide for developing responsive, mobile first projects on the web. Everytime you start a new project with Rebirth, recreate it to your project design. The idea behind Rebirth is not to be a framework but a starting point with predefined HTML, CSS and JavaScript recipes.
 
Inspired by methods and ideas from various sources such as [SUIT CSS](https://github.com/suitcss/suit), [BEM](https://bem.info/), [INUITCSS](https://github.com/inuitcss), [SMACSS](https://smacss.com/), [OOCSS](http://oocss.org/) and [Bootstrap](http://getbootstrap.com). 

Correct way to use Rebirth is together with [Rebirth Yeoman generator](https://github.com/joonasy/generator-rebirth.git).

## Requirements

* [SASS](http://sass-lang.com/)
* [Babel](https://babeljs.io/) or similar ES2015 syntax transformer
* [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/)

## Installing

### a) Install with generator

Preferred way to start a new Rebirth project is together with [generator-rebirth](https://github.com/joonasy/generator-rebirth.git) which setups Rebirth and scaffolds new [Rebirth](https://github.com/joonasy/rebirth.git), [WordPress](wordpress.org), [TYPO3](https://typo3.org/) or [HTML (Assemble)](https://github.com/assemble/assemble/) project.

Head to [Rebirth Yeoman generator](https://github.com/joonasy/generator-rebirth.git) and get started!

### b) Package managers

You can also install directly from npm:

```
npm install rebirth-ui
```

If you install directly from npm you can't use the generator without [creating the `yo-rc.json` manually](#) to your project.

## Getting started

Read the [CSS styleguide](docs/markdown/css) and [JavaScript styleguide](docs/markdown/js) so you know how to build with Rebirth.

### a) Generating (Work in progress!)

You can create new components with the [Rebirth Yeoman generator](https://github.com/joonasy/generator-rebirth.git):

```
yo rebirth component:foo
```

This will copy component dependencies (SCSS and JavaScript files) which you can start modifying. **This is the correct way of using Rebirth as a starting point.** Head to [Rebirth Yeoman generator](https://github.com/joonasy/generator-rebirth.git) for more information about the generator usage.

### b) Importing (SCSS & ES2015 modules)

If you use Rebirth without the generator (e.g override existing styles with your own) you can also import all the SCSS:

```
import 'rebirth/src/app';
```

You can also import components explicitly. To start with a full list of modules copy _app.scss file into your project and comment out components you do not want. 

Import and load initial JavaScripts in your `<head>` before all other stylesheets and JavaScripts:

```
// In your app.head.js
import 'rebirth/src/app.head';
```

Add JavaScript components, plugins etc. (jQuery included) near the end of your pages, right before the closing `</body>` tag. 

```
// In your app.js
import 'rebirth/src/app';
```


### c) Referencing build material

If you only want reference compiled and minified CSS and JavaScript.

``` 
// Add to <head>
<script src="rebirth/dist/rebirth.head.js"></script>
<link href="rebirth/dist/rebirth.min.css" rel="stylesheet">
```

```
// Near the end of your pages, right before the closing </body> tag
<script src="rebirth/dist/rebirth.min.js" async></script>
```

However, using Rebirth this way fights against its ideology. Referencing these files are targeted only for prototyping Rebirth e.g. docs.

## Documentation

* [CSS styleguide](docs/markdown/css)
* [JavaScript styleguide](docs/markdown/css)

## Contribute

**Work in progress!** Use only if you know what you are doing or you are working together with the author. **All docs are currently very much outdated.**

Please discuss about new ideas and things that you think should be modified. Currently all the styleguiding, components (CSS/JS) and generator logic has been made by Joonas Ylitalo [@joonasy](https://twitter.com/joonasy).

[Learn more about contributing](docs/markdown/contribute.md)

## Todo (in random order)

* **Document new structural changes!**
* Isolate `.Form-input{}` and  `.Form-checkbox{}`
* Create the documentation website for existing components
* All necessary CSS components
* CSS modular scale
* Testing for JavaScript
* Remove jQuery

## License

Copyright (c) 2017 Joonas Ylitalo (Twitter: @joonasy) Licensed under the MIT license.
