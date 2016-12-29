# Structure

Asset structure and default partials installed by the [Rebirth Yeoman generator](https://github.com/joonasy/generator-rebirth.git):

```
assets/                      
|
|── components/                # All component types [1]
|   |── collections/
|   |   |── Grid/              # Default grid component
|   |   …
|   |
|   |── elements/
|   |   |── Container/  
|   |   |── Heading/
|   |   |── Icon/              # Placeholder
|   |   |── Ieframe/
|   |   |── Text/
|   |   |── Width/
|   |   |── Wrap/
|   |   …
|   |
|   |── layout/                # Layout components [2]
|   |   |── Header/
|   |   |── Footer/
|   |   |── Page/
|   |   …
|   |
|   |── themes/                # Themes [3]
|   |   …
|   |
|── javascripts/            
|   |   |── fixes/
|   |   |── plugins/
|   |   |── utils/
|   |   |── vendors/
|   |  
|── stylesheets/
|   |── generic/               # Generic settings [4]
|   |   |── _base.scss         # Base settings
|   |   |── _fonts.scss        # Font imports (placeholder)
|   |   |── _placeholder.scss  # Uncategorized placeholders
|   |   |── _typography.scss   # Typography settings 
|   |  
|   |── helpers/               # Helpers [5]
|   |── _helper.scss           # Uncategorized helpers 
|   |   …
|   |  
|   |── mixins/                # Mixins [6] 
|   |   …
|   |  
|   |── vendors/               # SASS from other projects [7]
|   |   …
| 
`── _config.scss               # Global project variables [8]
`── app.head.js                # Head JavaScripts [9]
`── app.js                     # Primary JavaScripts [10]
`── app.scss                   # Primary SASS file [11]
`── config.js                  # Global project variables [12]
```

* **1.** Components suchs as Buttons, Forms, Navbars etc. are located here. Read more about [Components](components.md)
* **2.** Layout components such as `Footer` or `Header` usually represent only a partion of our site.
* **3.** Themes contain specific component related modifiers or entire theme based layout components. Read more in the following sections
* **4.** All the global settings
* **5.** Place all helpers here. Read more about [Helpers](helpers.md).
* **6.** Mixins are used throughout all of our partials.
* **7.** 3rd party vendors are located here only if they aren't available in [Bower](http://bower.io). Place modified bower/npm CSS components here
* **8.** Contains all the shared configurable variables that can be used in all of our included SASS partials
* **9.** JavaScripts in `<head>` before all other stylesheets and JavaScripts
* **10.** JavaScripts right before the closing `</body>` tag
* **11.** This is our primary SASS file which collects all the partials
* **12.** Contains all the shared configurable variables that can be used in all of our included JavaScipt modules

## Primary SASS file (app.scss)

Structure our partials in the following order to prevent errors. Remember to alphabetize partials.

```
// ========================================
// Application
// ========================================

// Config
@import 'config';

// Vendors
…

// Mixins
…

// Generic
…

// Helpers
…

// Elements
…

// Collections
…

// Layout
…
```

#### Vendors

CSS bower components (`/bower_components/`) or CSS node modules (`/node_modules/`) can be imported to primary SASS file like so `@import 'myVendor/vendor'`. 

If you wan't to modify the package, import the package to the primary SASS file and add new vendor file preferably with the same name as the package to the vendors folder. Override the necessary styles in the newly added file.

## Component folder structure

Read [CSS naming conventions](css/naming-conventions.md) first.

All component related CSS and JavaScript are placed into the components own folder. Separate components and component groups into their own folders together with import and configuration files and name components as they are presented in the markup. 

```
Button/
|
|── Buttons/                    # [1]
|   |── _index.scss             # [2]          
|   |── _Buttons.config.scss    # [3]
|   … 
|         
`── _Button--default.scss       # [4]
`── _Button.config.scss         # [5]
`── _Button-child.scss          # [6]
`── _Button.-modifierName.scss  # [7]
`── _Button.scss                # [8]
`── _index.scss                 # [9]
`── Button.js                   # [10]
`── index.js                    # [11]
```

* **1.** Isolate component group to its own folder
* **2. / 9. / 11.** Index file to import all the component and group partials. **9.** Imports also the component group
* **3. / 5.** Configuration file for the component and group
* **4.** Isolate component modifier from the main component
* **6. / 7.** If you are build a large component which, say, contains over 400 lines it is advisable to separate variations and descendants into their own partials. 
* **10.** Component JavaScript

If component modifiers (**7.**) or other component related partials contain _responsive variants_ (e.g `.Button.-m-modifierName`) it isn't necessary to include that variant in the file name.

## Component structure

All of our component partials should always start with a first-level title.

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
}


/* ======
 * Button - Size                                         # [9]
 * ====== */

.Button {
  &.-s {
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

### Layout component structure

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

Layout components aren't usually reusable so it's important to define it's purpose in the beginning of the file with the `@reusable` tag as explained in the Component structure section.

Learn more at [Components](css/components.md).

### Themes

Theme components are like layout components which collect and extend components by adding new modifiers only needed by the theme. Themes should always share a consistent style (they're themes, duh).

Example of `components/themes/christmas/_christmas.scss`

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

Example of _Christmas theme_ page layout component  `components/themes/christmas/_Page--christmas.scss`

```css
/* ========================================
 * Christmas theme page
 * ======================================== 
 *
 * @reusable false
 */ 

.Page--christmas {
  /**
   * Add new settings to `.Container{}` element
   * @extends `.Container{}` in _Container.scss
   */ 
  .Container {}
}
```

#### Helpers

```
stylesheets/helpers/_margin.scss    # [1]
stylesheets/helpers/_m-margin.scss  # [2]
```

* **1.** Helper partial 
* **2.** Helper partial with specific _responsive variant_. Responsive variants are always specified in the helper filename because they are rarely used and it's easier to organize and include into the project.
