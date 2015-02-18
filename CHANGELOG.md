# Changelog

## 0.0.6 (2015-2-17)
* Project is now converted to (Mediasignal) Yeoman generator (generator-msc). Please read all the new project docs ```README.md & docs/*``` .
* Default assets (CSS/JS) modified a lot. See ```app/templates/assets/```
* CSS styleguide added
* CSS starters (components, helpers etc.) added ```app/templates/starters/src/assets/stylesheets/```
* JS starters added ```app/templates/starters/src/assets/javascripts/```
* IE support 9+
* Forced enquire.js, respond.js  and config.js removed
* [Assemble.io](http://assemble.io) is now the default Html project builder 
  * Jade -> Handlebars
* Manual normalize.scss and jquery replaced with Bower components

## 0.0.5 (2013-10-18)
* Now I'll be using the preconfigured grunt/bower config for future projects (/joonasy-bp). Yeoman is nice but it think configuring it is unnecesserary step at least for now. I should make some bash script for creating projects.
  * E.g. mkdir prototype && cp -a joonasy-bp/joonasy-bp/. prototype/ && cd prototype && npm install && bower install 
* Dropped support for IE 7 which was kind of minimal anyway
* box-sizing: border-box
* Grunt
  * Added custom modernizr building task
  * Jade for default marking
  * Use autoprefixer always
* Bower 
  * Enquire, Respond, Fastclick, Normalize
  * Note: Remember to manually convert normalize.css to _normalize.scss because seems that all the normalize scss versions add some unwanted variables

## 0.0.5 (2013-7-8)
* Started using Yeoman/Grunt for it's flexibility. I'm not going to explain here all the features they have, so just look at the code.
* Bower is awesome, going to use it definitely
* Smaller tab sizing, better comment styling and made some minor structural changes.

## 0.0.4 (2013-6-16)
* Better structuring logic learned from tampere.fi -project.

## 0.0.3 (2013-5-13)
* Git init
* Converted the html boilerplate to middleman boilerplate. Lot's of changes.. OOCSS, BEM, directory structure etc.

## 0.0.2 (2013-4-15)
* Switched to SMACSS approach. All the .scss files are now separated into specific categories and combined in a master file.
    * assets/modules/ <- The modules directory is reserved for Sass code that doesn’t cause Sass to actually output CSS. Things like mixin declarations, functions, and variables.
    * assets/partials/ <- The partials directory is where the meat of CSS is constructed.
    * assets/vendor/ <- The vendor directory is for third-party CSS. This is handy when using prepackaged components developed by other people (or for your own components that are maintained in another project).
* assets/js/lib/ -> assets/js/vendor/ for precise naming

## 0.0.1 (2013-2-27)
* Removed all rem -related stuff. I'd rather just use em's
* Removed unnecessary mixins and plugins
* Combined _2-base.scss & _3-global.scss
* Update to Normalize.css 2.1.0.
* Update to jQuery 1.9.1

## 0.0.0 (2013-2-7)
* Removed the old approach serving IE it's own stylesheet without media queries. I'm using respond.js again. Reason: much cleaner <head> and faster Sass compiling.
* Updated vendors

## 0.0.0 (2012-11-28)
* Modified files based on stuff learned from various project
* Small edits

## 0.0.0 (2013-2011)
* LESS -> SASS
* Project started
