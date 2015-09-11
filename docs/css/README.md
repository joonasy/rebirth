# CSS Styleguide

My CSS styleguide is based on the following styleguides. 

* [SUIT CSS (0.6.0)](https://github.com/suitcss)
* [CSS Guidelines (2.2.2)](http://cssguidelin.es)
* [Sass Guidelines](http://sass-guidelin.es)

This styleguide outlines our internal standards for writing CSS (and more specifically, Sass).

* What we want
    * keep stylesheets maintainable;
    * keep code transparent, sane, and readable;
    * keep stylesheets scalable;
    * keep our file structure distinct

## Table of contents

* [Design principles](design-principles.md)
* [Components](components.md)
* [Helpers](helpers.md)
* [Naming conventions](naming-conventions.md)
    * Helpers
        * helperName
    * Components
        * ComponentName
        * ComponentName--modifierName
        * ComponentName.-chainable-modifierName
        * ComponentName.is-stateOfComponent
        * ComponentName-descendantName
        * ComponentNameCollection
    * JavaScript hooks
        * data-* attributes
    * Reserved namespaces and other keywords
        * Responsive variations
        * Obvious chainable modifiers
        * Modifier
        * Prefixes and suffixes in Sass variables
* [Coding style and structure](style.md)
    * Stylesheet formatting
    * Comments & titling
    * CSS/Sass folder structure
    * Component structure
    * Structuring partials
