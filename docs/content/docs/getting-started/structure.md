---
title: Structure
description: Asset structure and default partials installed by the generator.
layout: docs
---

```
assets/
|
|── components/                # Components [1]
|   |── Heading/
|   |── Icon/
|   |── Text/
|   |   …
|   |
|── containers/                # Container components [2]
|   |   |── App/
|   |   |── Container/
|   |   |── Footer/
|   |   |── Grid/
|   |   |── Header/
|   |   |── Template/
|   |   |── Width/
|   |   |── Wrap/
|   |   …
|   |
|── javascripts/              # JavaScripts [3]
|   |   |── feature.js
|   |   |── utility.js
|   |   …
|   |
|── stylesheets/
|   |── generic/               # Generic settings [4]
|   |   |── _base.scss         # Base settings
|   |   |── _fonts.scss        # Font imports (placeholder)
|   |   |── _placeholder.scss  # Uncategorized placeholders
|   |   |── _typography.scss   # Typography settings
|   |
|   |── helpers/               # Helpers [5]
|   |   |── _helper.scss       # Uncategorized helpers
|   |   …
|   |
|   |── mixins/                # Mixins [6]
|   |   …
|   |
|   |── vendors/               # SCSS from other projects [7]
|   |   …
|
`── _config.scss               # Global project variables [8]
`── head.js                    # Head JavaScripts [9]
`── index.js                   # Primary JavaScripts [10]
`── index.scss                 # Primary SASS file [11]
`── config.js                  # Global project variables [12]
```

- **1.** Components suchs as Buttons, Forms, Navbars etc. are located here.
- **2.** Container components such as `Footer` or `Header` usually represent only a portion of our site.
- **3.** Place all JavaScripts utilities and hooks here
- **4.** All the global settings
- **5.** Place all CSS helpers here
- **6.** Mixins are used throughout all of our partials
- **7.** 3rd party vendors are located here only if they aren't available from NPM. If you need to override vendors place them here
- **9.** Contains all the shared configurable variables that can be used in all of our included SASS partials
- **9.** JavaScripts in `<head>` before all other stylesheets and JavaScripts
- **10.** JavaScripts right before the closing `</body>` tag
- **11.** This is our primary SASS file which collects all the partials
- **12.** Contains all the shared configurable variables that can be used in all of our included JavaScript modules

## Primary SASS file (index.scss)

Structure our partials in the following order to prevent errors. Remember to alphabetize partials.

```scss
// =======================================
// Application
// =======================================

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

// Container Components
…

// Components
…
```

### Vendors

Node modules which contain CSS/SCSS (`node_modules/`) can be imported to primary SASS file like so `@import '3rd-party-vendor/vendor'`.

If you need to override the package styles, add a file preferably with the same name as the package to `styleheets/vendors/_vendor.scss` and override the necessary styles in the newly added file.

## Component folder structure

All component related CSS and JavaScript are placed into the components own folder. Separate components and component groups into their own folders together with import and configuration files and name components as they are presented in the markup.

```
Button/
|
`── _Buttons.scss               # [1]
`── _Buttons--default.scss      # [2]
`── _Button--default.scss       # [3]
`── _Button.config.scss         # [4]
`── _Button-child.scss          # [5]
`── _Button.-modifierName.scss  # [6]
`── _Button.scss                # [7]
`── _index.scss                 # [8]
`── Button.js                   # [9]
`── index.js                    # [10]
```

- **1. / 2.** Isolate component group to its own file
- **3.** Isolate component modifier from the main component
- **4.** Configuration file for the component and group
- **5. / 6.** If you are build a large component which, say, contains over 400 lines it is advisable to separate variations and descendants into their own partials
- **7.** Base styles for the component
- **8.** Index file to export all the components SCSS
- **9.** Component JavaScript
- **10.** Index file to export all the components JavaScripts

If component modifiers (**7.**) or other component related partials contain _responsive variants_ (e.g `.Button.-modifierName@m`) it isn't necessary to include that variant in the file name.

### Component structure

All component partials should always start with a first-level title.

```
/* =======================================
 * Button                                                # [1]
 * =======================================
 *
 * @extends `.OtherComponent{}` in _OtherComponent.scss. # [2]
 */

.Button {                                                # [3]
  …

  &:hover,
  &:focus {
    …
  }
}

  /**
   * Button dropdown                                     # [4]
   * Lorem ipsum dolor sit amet, consectetur.
   */
  .Button-dropdown {                                     # [5]
    …

    &.is-open {}                                         # [6]
  }


/* ======
 * Button - Shape modifiers                              # [7]
 * ====== */

.Button {
  …

  &.-round {
    …
  }
}


/* ======
 * Button - Size                                         # [8]
 * ====== */

.Button {
  &.-s {
    …
  }
}


/* ======
 * Button - Disabled                                    # [9]
 * ====== */

.Button {
  &.is-disabled {
    …
  }
}
```

- **1.** Begin every new major section of a CSS file with a first-level title
- **2.** This simple, low effort commenting can make a lot of difference to developers who are unaware of relationships across projects, or who are wanting to know how, why, and where other styles might be being inherited from
- **3.** Default button settings
- **4.** Indent descendants. As a rule, you should comment anything that isn’t immediately obvious from the code alone
- **5.** As well as indenting individual declarations, indent entire related rulesets to signal their relation to one another. This quasi-replication of the DOM tells developers a lot about where classes are expected to be used without them having to refer to a snippet of HTML.
- **6.** States for descentans or nested elements can be added directly
- **7.**, **8.** Define modifiers with second-level titles
- **9.** Define states after modifiers with second-level titles

## Container component structure

Example of `containers/_Header.scss`

```css
/* =======================================
 * Header
 * ======================================= /

.Header {}

  /**
   * Modify `.Navbar--default` component to match header requirements
   * @extends `.Navbar--default{}` in _Navbar--default.scss
   */
.Header-navbarDefault {
  .Navbar--default {
  }
}
```

### App container component

App container component (`containers/App/_App.scss`) is the master container component which controls all the other container and default components. App (`.App {}`) is usually added to the `<body class="App">` tag.

#### Themes

Themes are master container component modifiers which collect and extend components by adding new modifiers only needed by the theme. Themes should always share a consistent style (they're themes, duh).

Example of `containers/App/_App--christmas.scss`

```scss
/* =======================================
 * Christmas theme
 * ======================================= */

.App--christmas {
  /**
   * Add new theme coloring to `.Heading{}` element
   * @extends `.Heading{}` in _Heading.scss
   */
  .Heading {
  }

  /**
   * Add background to Footer
   * @extends `.Footer{}` in _Footer.scss
   */
  .Footer {
  }
}
```

#### Helpers

```
stylesheets/helpers/_margin.scss    # [1]
stylesheets/helpers/_margin@m.scss  # [2]
```

- **1.** Helper partial
- **2.** Helper partial with specific _responsive variant_. Responsive variants are always specified in the helper filename because they are rarely used and it's easier to organize and include into the project.
