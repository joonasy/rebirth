---
title: Introduction
description: Extensible, scalable, Sass-based, OOCSS front-end starter kit, project generator and opinionated styleguide for developing responsive, mobile first projects on the web. Please note that these docs are just a scratch so far.
layout: docs
---

## Core idea

Rebirth provides you with a solid architectural baseline with predefined HTML, CSS, Template and JavaScript files upon which to rewrite your own design system. A newly created project instance is always unique and intended to be overridden by the project design requirements. Inspired strongly by methods and ideas from sources such as [SUIT CSS](https://github.com/suitcss/suit), [BEM](https://bem.info/), [INUITCSS](https://github.com/inuitcss), [SMACSS](https://smacss.com/), [OOCSS](http://oocss.org/) and [Bootstrap](http://getbootstrap.com).

## Generate a project

So far the preferred way to start a new Rebirth project is together with [generator-rebirth](https://github.com/joonasy/generator-rebirth.git) which setups Rebirth and scaffolds new [Rebirth](https://github.com/joonasy/rebirth.git), [WordPress](wordpress.org), [TYPO3](https://typo3.org/), [HTML (Assemble)](https://github.com/assemble/assemble/) or custom (TODO) project.

```shell
$ npm install yo -g && npm install generator-rebirth -g
```

See [requirements](/docs/getting-started/requirements/), learn about the [generator](/docs/getting-started/generator/), read the [styleguide](/styleguide/). Run the generator in your desired location, pass in your project name (required; this will be your installation directory also) and your project type (`typo3`, `html` or `wordpress`):

```shell
$ yo rebirth [my-new-project] --project=my-project-type
```

If you are building a _Typo3 project_ all special characters are removed from the extension directory name e.g. `my-project_folder` -> `myprojectfolder`.

## Installation

Rebirth project is a beta so the custom installation needs to be manually if you have your own project. Make sure you meet the [requirements](/docs/getting-started/requirements). Installation so far is to import components explicitly. To start with a default list of modules see `app.scss` and `app.js`.

1. Clone Rebirth repository somewhere: `$ git clone https://github.com/joonasy/rebirth`
2. Copy the `src/` folders contents to your project location
3. Delete the components and files you don't need

## Alternative installations

Using Rebirth this way fights against its core ideology.

### Importing

```shell
$ npm install generator-rebirth
```

Importing examples assume that you have set your `node_modules` as a base for importing modules. Importing all the default scss components:

```scss
import 'rebirth/src/app';
```

Import and load initial JavaScripts in your `<head>` before all other stylesheets and JavaScripts. Add JavaScript components, plugins etc. near the end of your pages, right before the closing `</body>` tag:

```javascript
// In your app.head.js
import 'rebirth/src/app.head';

// In your app.js
import 'rebirth/src/app';
```

### Referencing build material

```html
<!-- Add to <head> -->
<script src="rebirth/dist/rebirth.head.js"></script>
<link href="rebirth/dist/rebirth.min.css" rel="stylesheet" />
```

```html
<!-- Near the end of your pages, right before the closing </body> tag -->
<script src="rebirth/dist/rebirth.min.js" async></script>
```
