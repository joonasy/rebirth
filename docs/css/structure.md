# Structure

## CSS/Sass folder structure

One of the most useful features of Sass is being able to separate our stylesheets into separate files and use the @import directive to include the source of our individual files into one master stylesheet.

Here is listed default partial structure used across projects:

    stylesheets/
    |
    |── components/            # Common project modules [1]
    |   |── _Component.sass    # Component placeholder
    |   |── _Container.scss    # Default container component
    |   |── _Grid.scss         # Default grid component
    |   |── _Heading.sass      # Default heading component
    |   |── _Icon.scss         # Icon component placeholder
    |   |── _Ieframe.scss      # IE warning comonent
    |   |── _Text.scss         # Default text component
    |   |── _Width.scss        # Default width component
    |   |── _Wrap.scss         # Default wrap component
    |   |── Component
    |   |   |── Component 
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
    |   |── _Footer.scss       # Footer placeholder
    |   |── _Header.scss       # Header placeholder
    |   …
    |   
    |── mixins/                # Layout components [5]
    |   |── _breakpoint.scss   # Breakpoint mixin
    |   |── _fontSize.scss     # Font sizing with rems
    |   …
    | 
    |── themes/                # Themes [6]
    |   |── theme
    |   |   _theme.scss
    |   …
    |── vendors/               # CSS or Sass from other projects [7]
    |   |── _datepicker.scss
    |   |── _slick.scss
    |   …
    |
    `── _config.scss           # Global project variables [8]
    `── app.scss               # Primary Sass file [9]

* **1.** Components suchs as Buttons, Forms, Navbars etc. are located here. Read more about [Components](components.md).
* **2.** This folder contains all the default settings
    * `placeholder.scss`: place for global uncategorized placeholders.
    * `base.scss`: all the base html elements. 
    * `typography.scss`: all the typography related html elements. 
* **3.** Place all helpers here. Read more about [Helpers](helpers.md).
    * `helper.scss`: place for global uncategorized helpers.
* **4.** Some layout components such as `Footer` or `Header` usually represent only a partion of our site. Read more in the next section.
* **5.** Mixins are used throughout all of our partials. Some of the mixins are considered as _UI mixins_ which produce user interface related elements such as arrows and icons.
* **6.** Themes contain specific component related modifiers or entire theme based layout components. Read more in the following sections.
* **7.** 3rd party vendors are located here only if they aren't available in [Bower](http://bower.io). Place modified bower css components here.
* **8.** Contains all the shared configurable variables that can be used in all of our included partials. All component and theme configurations are added here.
* **9.** This is our primary sass file which collects all the partials.

### About layout components

Layout components are components that structure only specific sections our site like _Header_, _Home_ or _AppSection_.  Sometimes it's necessary to control default components in a specific way at some portions of the site.  

Example of `layout/_Header.scss`

```css
/* ========================================
 * Header
 * ======================================== 
 *
 * @reusable false
 */ 

.Header {}

  /**
   * Modify `.Navbar--default` component to match header requirements
   * @extends `.Navbar--default{}` in _Navbar--default.scss
   */ 
  .Header-navbarPrimary {}

```

More about this in the _Styling dependencies_ section in [Components](components.md).

Layout components aren't usually reusable so it's important to define it's purpose in the beginning of the file with the `@reusable` tag as explained in the Component structure section.

### About themes

Themes can extend all components by adding new modifiers only needed by the theme. Themes may also contain their own specifc layout components.

Themes should always share a consistent style (they're themes, duh).

Example of `themes/christmas/_christmas.scss`

```css
/* ========================================
 * Christmas theme modifiers
 * ======================================== 
 *
 * @reusable true
 */ 

/**
 * Add new theme coloring to `.Heading{}` element
 * @extends `.Heading{}` in _Heading.scss
 */ 
.Heading {
  &.-christmas {}
}

/**
 * Add new theme modifier to `.Footer{}` element
 * @extends `.Footer{}` in _Footer.scss
 */ 
.Footer--christmas {}
```

Example of _Christmas theme_ layout component  `themes/christmas/_ChristmasPage.scss`

```css
/* ========================================
 * Christmas theme page
 * ======================================== 
 *
 * @reusable false
 */ 

.ChristmasPage {}

  /**
   * Add new settings to `.Container{}` element
   * @extends `.Container{}` in _Container.scss
   */ 
  .ChristmasPage-containerTree {
    &.-christmas {}
  }

    .ChristmasPage-tree {}
```

### Primary Sass file (app.scss)

[View app.scss](/app/templates/starters/src/assets/stylesheets/app.scss)

Structure our partials in the following order to prevent errors. Remember to alphabetize partials.

```css
// ========================================
// Application
// ========================================

@charset 'UTF-8';

// Config
@import 'config';

// Mixins
…

// UI mixins
…

// Vendors
…

// Generic
…

// Helpers
…

// Components
…

// Base layout components
…

// Layout components
…
```

#### About 3rd party vendors

CSS bower components (`./bower_components`) or CSS node modules (`./node_modules/`) can be imported to Primary Sass file like so `@import 'myPackage/scss/myPackage.scss'`. 

However usually vendors do not provide Sass files to be imported (and Sass can't `@import` CSS files) so place all CSS bower components to the vendor folder (`Assets/stylesheets/vendors`) and rename them to `_vendorName.scss` format. This of course requires manual updating if the new package version has updated CSS.  

If the package supports Sass and you wan't to modify the package, import the package to the primary Sass file and add new vendor file preferably with the same name as the package to the vendors folder. Override the necessary styles in the newly added file.

Alternatively you may add 3rd party vendors to the build process (gulp). Read about it in the [Project section](../project/)

## Component structure

Here is an example of an component with the correct structure:

```
/* ========================================
 * Button                                                # [1]
 * ======================================== 
 *
 * @extends `.OtherComponent{}` in _OtherComponent.scss. # [2]
 * @reusable true                                        # [3]
 */

.Button {                                                # [4]
  …

  &:hover, 
  &:focus {
    …
  }
}

  /**
   * Button dropdown                                     # [5]
   * Lorem ipsum dolor sit amet, consectetur. 
   */ 
  .Button-dropdown {                                     # [6]
    …

    &.is-open {}                                         # [7]
  }


/* ======
 * Button - Shape modifiers                              # [8]
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
 * Button - Size                                         # [9]
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
 * Button - Disabled                                    # [10]
 * ====== */

.Button {
  &.is-disabled {
    …
  }
}


/* ======
 * Button - Primary                                      # [11]
 * ====== */

.Button--primary {
  …

  &:hover, 
  &:focus {
    …
  }

  &.-border {
    …
  }
}
```

* **1.** Begin every new major section of a CSS file with a first-level title 
* **2.** This simple, low effort commenting can make a lot of difference to developers who are unaware of relationships across projects, or who are wanting to know how, why, and where other styles might be being inherited from
* **3.** Define if the component is reusable as they mostly are. If the component isn't reusable (or isn't designed yet) then give it a brief description why e.g. _"false, use only in the bottom of the page"_
* **4.** Default button settings
* **5.** Indent descendants. As a rule, you should comment anything that isn’t immediately obvious from the code alone
* **6.** As well as indenting individual declarations, indent entire related rulesets to signal their relation to one another. This quasi-replication of the DOM tells developers a lot about where classes are expected to be used without them having to refer to a snippet of HTML.
* **7.** States for descentans or nested elements can be added directly 
* **8.**, **9.** Define modifiers with second-level titles
* **10.** Define states after modifiers with second-level titles
* **11.** Define variations with second-level titles after modifiers and states

## Structuring partials

Read [Naming conventions](naming-conventions.md) first.

#### Components

Always name the isolated partials as they are presented in the markup. Example of an isolated component structure in correct order:

```
components/_Button.scss                # [1]
components/_ButtonCollection.scss      # [2]
components/_Button-dropdown.scss       # [3]
components/_Button.-modifierName.scss  # [4]
components/_Button--primary.scss       # [5]
```

If you are build a large component which, say, contains over 400 lines it is advisable to separate large component modifiers (**4.**), variations (**5.**) and descendants (**3.**) into their own partials. All of our isolated partials should always start with a first-level title.

If component modifiers (**4.**) or other component related partials contain _responsive variants_ (e.g `.Button.-m-modifierName {}`) it isn't necessary to include that variant in the file name.

Component collections (**2.**) are always isolated.

##### Component and theme configuration

Global component and theme configurations are added to `_config.scss`. These configurations should only contain settings that other components, component collections, themes etc. may need.

```
// ========================================
// Button
// ========================================

$Button-fontSize: $baseFontSize;
$Button-lineHeight: $baseLineHeightPx * 1.5;


// ========================================
// Theme - themeName
// ========================================

$christmasColor: red;

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

#### Themes

If a theme contains both component modifiers and layout components add them to subfolder under themes.

```
themes/themeName/_themeName.scss          
themes/themeName/_ThemeName.scss 
…
```

#### Helpers

```
helpers/_margin.scss    # [1]
helpers/_m-margin.scss  # [2]
```

* **1.** Helper partial 
* **2.** Helper partial with specific _responsive variant_. Responsive variants are always specified in the helper filename because they are rarely used and it's easier to organize and include into the project.
