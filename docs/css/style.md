# Coding style and structure

Please read [Naming conventions](naming-conventions.md), [Components](components.md) and [Helpers](helpers.md) first.


## Syntax and formatting

One of the simplest forms of a styleguide is a set of rules regarding syntax and formatting. Having a standard way of writing CSS means that code will always look and feel familiar to all members of the team.

At a very high-level, we want

  * two (2) space indents, no tabs;
  * 80 character wide columns;
  * multi-line CSS;
  * meaningful use of whitespace.

But, as with anything, the specifics are somewhat irrelevant—consistency is key.


### Stylesheet formatting

* Try to alphabetize properties
* Extends (`@extend`) and mixins (`@include`) should be placed before standard properties
* Add a semi-colon (`;`) after each declaration (e.g. `color: red;`)
* Add a space after `// comments`
* Add a space after commas in values (e.g. `rgba(#000000, 0.5)`)
* Write numbers at the end of mathematic operations (e.g. `$base-space * 0.5`)
* Always stick with classes instead of IDs for styling 
* related selectors on the same line; unrelated selectors on new lines
* a space before our opening brace (`{`)
* properties and values on the same line
* a space after our property–value delimiting colon (`:`)
* each declaration on its own new line
* the opening brace (`{`) on the same line as our last selector
* our first declaration on a new line after our opening brace (`{`)
* our closing brace (`}`) on its own new line
* each declaration indented by two (2) spaces


```css
/**
 * Example
 */ 
.Component,
.someSelector {
  @extend %cf;
  @include dropdown();
  background-color: $color-primary;
  box-shadow: 0 1px 2px rgba(#000000, 0.2);
  color: $color-text;
  font-size: $base-fontSize-s;
  line-height: $base-lineHeight;
  margin-bottom: $base-space;
}
```


## Comments and titling

Remembering your own classes, rules, objects, and helpers is manageable to an extent, but anyone inheriting CSS barely stands a chance.

When to use commenting

  * whether some CSS relies on other code elsewhere
  * what effect changing some code will have elsewhere
  * where else some CSS might be used
  * what styles something might inherit (intentionally or otherwise)
  * what styles something might pass on (intentionally or otherwise)
  * where the author intended a piece of CSS to be used

As a rule, you should comment anything that isn’t immediately obvious from the code alone. That is to say, there is no need to tell someone that `color: red;`will make something red, but if you’re using `overflow: hidden;` to clear floats—as opposed to clipping an element’s overflow—this is probably something worth documenting.

Titling, however, should be used always.


### First-level titles and comments

Begin every new major section of a CSS file with a title comment:

```css
/* ========================================
 * My title
 * ======================================== 
 * 
 * Some useful comment. This is comment isn't always necessary. Lorem ipsum
 * sit amet, consectetur adipiscing elit. Istam voluptatem perpetuam quis.
 */ 

.selector {}
```

Leave a carriage return between this title and the next line of code (be that a comment, SCSS, or some CSS).

This title should appear at the top of each file (.scss, .css). If you are working on a file with multiple sections, each title should be preceded by four (4) carriage returns. This extra whitespace coupled with a title makes new sections much easier to spot when scrolling through large files:

```css
/* ========================================
 * My title
 * ======================================== */ 
 
.selector {}




/* ========================================
 * My second title
 * ======================================== */ 
 
.another-selector {}
```


### Second-level titles and comments

Use second-level titling for example if defining modifiers for a component. Leave a carriage return between this title and the next line of code. Each second-level title should be preceded by two (2) carriage returns.

```css
/* ======
 * Component modifier
 * ====== */ 

.Component--modifier {}


/* ======
 * Another Component modifier
 * ====== 
 * 
 * Some useful comment. Lorem ipsum sit amet, consectetur adipiscing elit. 
 * Istam voluptatem perpetuam quis.
 */ 

.Component--secondaryModifier {}
```


### Third-level titles, multiline and singleline comments

For large comments that document entire sections or components, we use a DocBlock-esque multi-line comment which adheres to our 80 column width. Leave a carriage return between this title/comment and the next line of code. 

```css
/**
 * This is my third-level title / comment
 */ 

.selector {}

/**
 * This is my multiline comment
 *
 * 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
 *    Te enim iudicem aequum puto, modo quae dicat ille bene noris. 
 * 2. Bonum incolumis acies: misera caecitas. Consequens enim est et 
 *    post oritur, ut dixi. Duo Reges: constructio interrete. 
 *
 * Eadem nunc mea adversum te oratio est. Hosne igitur laudas et hanc 
 * eorum, inquam, sententiam sequi nos censes oportere? Dicet pro me ipsa 
 * virtus nec dubitabit isti vestro beato.
 */ 

.selector {
  property: value; /* [1] */
  another-property: another-value; /* [2] */
}
```

These types of multiline + singleline comments allow us to keep all of our documentation in one place whilst referring to the parts of the ruleset to which they belong.


### Preprocessor comments

As a rule, use these comments to document code that would not get written out to that CSS file either. If you are documenting code which will get compiled, use comments that will compile also. For example, this is correct:

```css
// ========================================
// Button
// ========================================

$Button-fontSize: $base-fontSize;
$Button-lineHeight: $base-lineHeightPx * 1.5;

// Dimensions of the @2x image sprite:
$sprite-width: 920px;
$sprite-height: 212px;
```


## CSS/Sass folder structure

One of the most useful features of Sass is being able to separate our stylesheets into separate files and use the @import directive to include the source of our individual files into one master stylesheet.

Here is listed our default partial structure we use across our projects:

    stylesheets/
    |
    |── components/            # Common project modules [1]
    |   |── _Component.sass    # Component placeholder
    |   |── _Heading.sass      # Default heading component
    |   |── _Icon.scss         # Icon component placeholder
    |   |── _Ieframe.scss      # IE warning comonent
    |   |── _Text.scss         # Default text component
    |   …
    |
    |── generic/               # Generic settings [2]
    |   |── _base.sass         # Default settings
    |   |── _fonts.scss        # Font imports
    |   |── _placeholder.scss  # Global uncategorized placeholders
    |   |── _typography.scss   # Default typography settings
    |   …
    |
    |── helper/                # Helpers [3]
    |   |── _helper.scss       # Global uncategorized helpers
    |   …
    |   
    |── layout/                # Layout components [4]
    |   |── _Container.scss    # Default container component
    |   |── _Footer.scss       # Footer placeholder
    |   |── _Grid.scss         # Default grid component
    |   |── _Header.scss       # Header placeholder
    |   |── _Width.scss        # Default width component
    |   |── _Wrap.scss         # Default wrap component
    |   …
    |   
    |── mixins/                # Layout components [5]
    |   |── _breakpoint.scss   # Breakpoint mixin
    |   |── _fontSize.scss     # Font sizing with rems
    |   …
    | 
    |── vendor/                # CSS or Sass from other projects [6]
    |   |── _datepicker.scss
    |   |── _slick.scss
    |   …
    |
    `── _config.scss           # Global project variables [7]
    `── app.scss               # Primary Sass file [8]

* **1.** Components suchs as Buttons, Forms, Navbars etc. are located here. Read more about [Components](components.md).
* **2.** This folder contains all the default settings
    * `placeholder.scss`: place for global uncategorized placeholders.
    * `base.scss`: all the base html elements. 
    * `typography.scss`: all the typography related html elements. 
* **3.** Place all helpers here. Read more about [Helpers](helpers.md).
    * `helper.scss`: place for global uncategorized helpers.
* **4.** Layout components are the key components in structuring our site. Some layout components such as `Footer` or `Header` may represent only a partion of our site unlike `Grid` which can be used multiple times to build various sections of our site.
    * `Container`, `Grid`, `Width` and `Wrap` are all reusable layout components.  
* **5.** Mixins are used throughout all of our partials. Some of the mixins are considered as _UI mixins_ which produce user interface related elements such as arrows and icons.
* **6.** 3rd party vendors are located here only if they aren't available in [Bower](http://bower.io). Place modified bower style components also here.
* **7.** Contains all the shared configurable variables that can be used in all of our included partials. Component configurations are added here as well.
* **8.** This is our primary sass file which collects all the partials. Read more about it in the next section.


### Primary Sass file (app.scss)

[View app.scss](/app/templates/assets/stylesheets/app.scss)

Structure our partials in the following order to prevent errors. Remember to alphabetize partials.

```
// ========================================
// Application
// ========================================

@charset 'UTF-8';

// Vendors
@import 'compass';
@import 'normalize.scss/normalize'; # Bower component
…

// Config
@import 'config';

// Mixins
…

// UI mixins
…

// Custom vendors
…

// Generic
…

// Helpers
…

// Components
…

// Layout based components
…
```


## Component structure

Here is an example of an component with the correct structure:

```
/* ========================================
 * Button                                                # [1]
 * ======================================== 
 *
 * @extends `.OtherComponent{}` in _OtherComponent.scss. # [2]
 */

.Button {                                                # [3]
  …

  &:hover, &:focus {
    …
  }
}

  /**
   * Button dropdown                                     # [4]
   * Lorem ipsum dolor sit amet, consectetur. 
   */ 
  .Button-dropdown {
    …
  }


/* ======
 * Button - shape modifiers                              # [5]
 * ====== */

.Button {
  …

  &.-round { 
    … 
  }

  &.-border { 
    … 
  }
}


/* ======
 * Button - size modifier                               # [6]
 * ====== */

.Button {

  &.-s {
    …
  }

  &.-l {
    …
  }
}


/* ====== 
 * Button - disabled state                              # [7]
 * ====== */

.Button {

  &.is-disabled  {
    …
  }
}


/* ======
 * Button - primary variation                            # [8]
 * ====== */

.Button--primary {
  …

  &:hover, &:focus {
    …
  }

  &.-border {
    …
  }
}
```

* **1.** Begin every new major section of a CSS file with a first-level title. 
* **2.** This simple, low effort commenting can make a lot of difference to developers who are unaware of relationships across projects, or who are wanting to know how, why, and where other styles might be being inherited from.
* **3.** Default button settings.
* **4.** Indent descendants. As a rule, you should comment anything that isn’t immediately obvious from the code alone.
* **5.**, **6.** Define modifiers with second-level titles
* **7.** Define states after modifiers with second-level titles
* * **8.** Define variations with second-level titles after modifiers and states.


## Structuring partials

Read [Naming conventions](naming-conventions.md) first.

#### Components

Always name the isolated partials as they are presented in the markup. Example of an isolated component structure in **correct order**:

```
components/_ButtonCollection.scss      # [1]
components/_Button.scss                # [2]
components/_Button-dropdown.scss       # [3]
components/_Button.-modifierName.scss  # [4]
components/_Button--primary.scss       # [5]
```

If you are build a large component which, say, contains over 400 lines it is advisable to separate large component modifiers (**4.**), variations (**5.**) and descendants (**3.**) into their own partials. All of our isolated partials should always start with a first-level title.

If component modifiers (**4.**) or other component related partials contain _responsive variants_ (e.g `.Button.-m-modifierName {}`) it isn't necessary to include that variant in the file name.

Component collections (**1.**) are always isolated.


##### Components configuration

Global component configurations are added to `_config.scss`. These configurations should only contain settings that component partials need (or in rare cases what other components may need).

```
// ========================================
// Button
// ========================================

$Button-fontSize: $base-fontSize;
$Button-lineHeight: $base-lineHeightPx * 1.5;
```

##### Components in larger projects

If we are building a large project which contains lots of isolated component partials it's wise to separate them into their own folder:  

```
components/Button/_Button.scss          
components/Button/_ButtonCollection.scss 
…

components/Component/_Component.scss      
components/Component/_ComponentCollection.scss
…   
```


#### Helpers

```
helpers/_margin.scss    # [1]
helpers/_m-margin.scss  # [2]
```

* **1.** Helper partial 
* **2.** Helper partial with specific _responsive variant_. Responsive variants are always specified in the helper filename because they are rarely used and it's easier to organize and include into the project.
