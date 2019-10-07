---
title: CSS Style guide
description: This styleguide outlines standards for writing CSS (and more specifically, SCSS).
layout: styleguide
---

Inspired by the following styleguides:

- [SUIT CSS (0.6.0)](https://github.com/suitcss)
- [CSS Guidelines (2.2.2)](http://cssguidelin.es)
- [SASS Guidelines](http://sass-guidelin.es)
- [Semantic UI](http://semantic-ui.com/)

This styleguide outlines standards for writing CSS (and more specifically, SCSS).

- What we want
  - keep stylesheets maintainable;
  - keep code transparent, sane, and readable;
  - keep stylesheets scalable;
  - keep our file structure distinct

## TL;DR

1. Maximum two modifiers per component e.g. `Component Component--modifier Component--modifier--anotherModifier`
2. Extend components with chainable modifiers e.g. `Component Component--modifier -myChainableModifier`
3. Use container components if you need to have specific settings for certain components in specific areas e.g. in Header `Header-component Component Component--modifier`
4. Use and make helpers e.g. `colorPrimary` or `textLeft` if you repeat certain styles often
5. Use `-js` hooks _only_ for triggering (_not styling_) JavaScript e.g. `js-myTrigger`
6. Use `is-stateName` syntax with JavaScript for changing the state of the component e.g. `is-open`
7. Read Coding style and Structure so you know how to structure your SASS files

<!-- ## TOC

* [Design principles](design-principles.md)
* [Components](components.md)
* [Helpers](helpers.md)
* [Naming conventions](naming-conventions.md)
    * Helpers
        * helperName
    * Components
        * ComponentName
        * ComponentName--modifierName
        * ComponentName.-chainableModifierName
        * ComponentName.is-stateOfComponent
        * ComponentName-descendantName
        * Component group (Component name in plural)
    * JavaScript hooks
        * data-* attributes
    * Reserved namespaces and other keywords
        * Responsive variations
        * Modifiers
        * Prefixes and suffixes in SASS variables
* [Coding style](style.md)
    * Stylesheet formatting
    * Comments & titling
    * Multi-line CSS
* [Structure](structure.md)
    * CSS/SASS folder structure
    * Layout components
    * Themes
    * Component structure
    * Structuring partials -->
