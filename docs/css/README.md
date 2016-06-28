# CSS Styleguide

My CSS styleguide is based on the following styleguides. 

* [SUIT CSS (0.6.0)](https://github.com/suitcss)
* [CSS Guidelines (2.2.2)](http://cssguidelin.es)
* [Sass Guidelines](http://sass-guidelin.es)

This styleguide outlines standards for writing CSS (and more specifically, Sass).

* What we want
    * keep stylesheets maintainable;
    * keep code transparent, sane, and readable;
    * keep stylesheets scalable;
    * keep our file structure distinct

## TL;DR

1. Only one modifier per component e.g. `Component Component--modifier` 
2. Extend components with chainable modifiers e.g. `Component Component--modifier -myChainableModifier`
3. Use layout components if you need to have specific settings for certain components in specific areas e.g. in Header `Header-component Component Component--primary`
4. Use and make helpers e.g. `colorPrimary` or `textLeft` if you repeat certain styles often
5. Use hooks for triggering JavaScript e.g. `Button js-Button` 
6. Use `is-stateName` syntax with JavaScript for changing the state of the component e.g. `Button is-open`
7. Read [Coding style](style.md) and [Structure](structure.md) so you know how to structure your Sass files

## TOC

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
        * Component collection (Component name in plural)
    * JavaScript hooks
        * data-* attributes
    * Reserved namespaces and other keywords
        * Responsive variations
        * Modifiers
        * Prefixes and suffixes in Sass variables
* [Coding style](style.md)
    * Stylesheet formatting
    * Comments & titling
    * Multi-line CSS
* [Structure](structure.md)
    * CSS/Sass folder structure
    * Layout components
    * Themes
    * Component structure
    * Structuring partials
