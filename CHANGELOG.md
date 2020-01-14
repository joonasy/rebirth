# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## 0.6.2x

- Remove placeholders and use mixins instead
- Add Article, Nav & List components
- Add Aside container component placeholder
- Push footer to bottom in default layout

## 0.6.0x

- Layout components are now Container components
  - `layouts/` -> `containers/`
  - Add new master container component `.App {}`
- `app.scss` -> `index.scss`
- `app.js` -> `index.js`
- `app.head.js` -> `head.js`
- New responsive variant naming convention: `m-<name>` -> `<name>@m`. Following components and helpers modified to use this convention: `_Width.scss`, `_Grid.scss`, `_margin@*.scss`, `_padding@*.scss`, `_displayResponsive.scss`.
- `js-hooks` not anymore necessary to use if targeting components directly
- Docs:
  - Yarn -> Npm
  - Add core-js@3 w/ `"useBuiltIns": "entry"`
    - Add `"regenerator-runtime": "^0.13.3"` to allow async funcs
  - Correct way to define husky in package.json
  - Remove bower things
  - Update deps, especially the ones with vulnerabilities
  - Update browserslist
  - Update docs content to match new naming conventions. Docs are still in very early stage and needs to be updated asap
  - Update node version (10.13.0)

## 0.5.4x

- Add initial docs. Publish to github pages
- Use layout components
- app.base.js/app.base.scss for base materials
- app.js/app.scss for default components
- app.all.js/app.all.scss contains all the content

## 0.5.3x

- Remove jQuery from some of the components ([#14]([../../issues/14))
- Remove collections, elements, layouts model ([#19]([../../issues/19))

## 0.5.2x

- Fix bunch of bugs

## 0.5.1x

- **Do not use versions below this**
- Applied new component structure and naming
- Docs and Rebirth isolated
  - Rebirth CSS and JavaScipts now found in [dist/](dist/)
  - Docs are build to docs-dist

## 0.5.0

- Project renamed to Rebirth
- Old npm package deprecated
- Downgrade assemble to working version
- Updated dependencies
- Updated eslint

## 0.4.2 (2016-10-11)

- New folder structure for CSS components and layout components:

```
components/
|
|── ComponentName/
|   `── _ComponentName.config.scss     # Component specific configs
|   `── _ComponentName.scss            # Default component CSS
|   `── _ComponentName--modifier.scss  # Component modifier and so on ...
|   `── _index.scss                    # Import all components
```

- Default .Page{} element added
- Fix chrome issues with the custom select
- Switched border (`.-border`) as part of the default button/form implementation

## 0.4.1 (2016-9-22)

- Breakpoint mixin -> sass-mq
- Updated normalize
- Removed Pull/Push components
- Other minor dependency updates and fixes

## 0.4.0 (2016-6-28)

- Component collections are no named as plurals e.g. .Buttons{}. Switch button collection to --default modifier as there might be some additional button collection in the projects.
- Mutual component files are now in their own folders
- Fixes

## 0.3.9 (2016-6-2)

- jQuery loaded and set global in `app.js`

## 0.3.6 (2016-2-11)

- Updated style guides
- Shitload of Component fixes

## 0.2.3 (2015-10-23)

- Rest of IE9 support dropped
- `.Grid{}`, `.Hero{}`, `.Nav{}`, `.Form{}`, `.Button{}` have been reworked and changed to use flexbox
- `.Form-collection{}` and `.ButtonCollection` are vertically aligned by default and can be switched to horizontal with `.-horizontal` (includes responsive variants) class
- `imgToParentBg.js` now supports `<picture>`. Also Because Safari and iOS doesn't support `object-position` so there are optional parameters to target them.
- Chromeframe removed

## 0.2.0 (2015-08-11)

- Project renamed to `My Web Starter Kit` / `generator-my`
- Component (scss/js) files restructured into their root folder. No more default `assets` folder.

## 0.1.0 (2015-05-07)

- Rest of the CSS styleguide done
- Part of JS styleguide
- Components modified based on the new styleguide
- Form, Block and component starters
- Hero uses object-fit with lazyloading (+ fallback)

## 0.0.7 (2015-03-13)

- CSS styleguide done `docs/css`
- Buttons, Navbar, Hero components are ready `app/templates/starters/src/assets/stylesheets/components`
- Bunch of helpers added `app/templates/starters/src/assets/stylesheets/helpers`
- Components and other css now follow the new styleguide syntax and structure

## 0.0.6 (2015-02-17)

- Default assets (CSS/JS) modified a lot. See `app/templates/assets/`
- CSS styleguide added
- CSS starters (components, helpers etc.) added `app/templates/starters/src/assets/stylesheets/`
- JS starters added `app/templates/starters/src/assets/javascripts/`
- IE support 9+
- Forced enquire.js, respond.js and config.js removed
- Manual normalize.scss and jquery replaced with Bower components

## 0.0.5 (2013-10-18)

- Dropped support for IE 7 which was kind of minimal anyway
- box-sizing: border-box

## 0.0.5 (2013-07-08)

- Smaller tab sizing, better comment styling and made some minor structural changes.

## 0.0.4 (2013-06-16)

- Better structuring logic

## 0.0.3 (2013-05-13)

- Git init
- Converted the html boilerplate to middleman boilerplate. Lot's of changes. OOCSS, BEM, directory structure etc.

## 0.0.2 (2013-04-15)

- Switched to SMACSS approach. All the .scss files are now separated into specific categories and combined in a master file.
  - assets/modules/ <- The modules directory is reserved for Sass code that doesn’t cause Sass to actually output CSS. Things like mixin declarations, functions, and variables.
  - assets/partials/ <- The partials directory is where the meat of CSS is constructed.
  - assets/vendor/ <- The vendor directory is for third-party CSS. This is handy when using prepackaged components developed by other people (or for your own components that are maintained in another project).
- assets/js/lib/ -> assets/js/vendor/ for precise naming

## 0.0.1 (2013-02-27)

- Removed all rem -related stuff. I'd rather just use em's
- Removed unnecessary mixins and plugins
- Combined \_2-base.scss & \_3-global.scss
- Update to Normalize.css 2.1.0.
- Update to jQuery 1.9.1

## 0.0.0 (2013-2011)

- Updated vendors
- Modified files based on stuff learned from various projects
- Small edits
- LESS -> SASS
- Project started
