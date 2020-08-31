---
title: Generator
description: The scaffolding tool which builds a fresh set of Rebirth UI components to easily kickstart your project.
layout: docs
---

# Features

- Choose between TYPO3, WordPress or HTML project type
- CSS Autoprefixing
- Livereloading with Browsersync
- Automatical Sass compilation
- Image optimization
- Combine media queries
- Browserify, Babel, ES2015 support

## Generate a project

So far the preferred way to start a new Rebirth project is together with [generator-rebirth](https://github.com/joonassandell/generator-rebirth.git) which setups Rebirth and scaffolds new [Rebirth](https://github.com/joonassandell/rebirth.git), [WordPress](wordpress.org), [TYPO3](https://typo3.org/), [HTML (Assemble)](https://github.com/assemble/assemble/) or custom (TODO) project.

```shell
$ npm install yo -g && npm install generator-rebirth -g
```

Run the generator in your desired location, pass in your project name (required; this will be your installation directory also) and your project type (`typo3`, `html` or `wordpress`):

```shell
$ yo rebirth [my-new-project] --project=my-project-type
```

If you are building a _Typo3 project_ all special characters are removed from the extension directory name e.g. `my-project_folder` -> `myprojectfolder`.

### Options

| Option      | Type   | Default | Description                                                   |
| ----------- | ------ | ------- | ------------------------------------------------------------- |
| `--project` | String | typo3   | Choose between `typo3`, `html` and `wordpress` project types. |

# Generate a component (Work in progress!)

You can create new components with the [Rebirth Yeoman generator](https://github.com/joonassandell/generator-rebirth.git), which is the correct way of using Rebirth as a starting point. This will copy component dependencies (SCSS and JavaScript files) which you can start modifying.

```
yo rebirth component:foo
```
