# Joonas Y. boilerplate (Middleman)

This is my personal "boilerplate", which contains snippets and ideas from various sources such as Normalize.css, HTML5 Boilerplate, Bootstrap, Foundation, SMACSS etc. By default this template supports: IE6<, Mobile first -ideology and progressive enhancement. Template requires Sass (.scss), Middleman and Compass.

== CHANGELOG 8 July 2013

* Smaller tab sizing, better comment styling and made some minor structural changes.

== CHANGELOG 16 June 2013

* Better structuring logic learned from tampere.fi -project.

== CHANGELOG 13 May 2013

* Converted the html boilerplate to middleman boilerplate. Lot's of changes.. OOCSS, BEM, directory structure etc.

== CHANGELOG 15 April 2013

* Switched to SMACSS approach. All the .scss files are now separated into specific categories and combined in a master file.
    * assets/modules/ <- The modules directory is reserved for Sass code that doesn’t cause Sass to actually output CSS. Things like mixin declarations, functions, and variables.
    * assets/partials/ <- The partials directory is where the meat of CSS is constructed.
    * assets/vendor/ <- The vendor directory is for third-party CSS. This is handy when using prepackaged components developed by other people (or for your own components that are maintained in another project).
* assets/js/lib/ -> assets/js/vendor/ for precise naming

== CHANGELOG 27 Feb 2013

* Removed all rem -related stuff. I'd rather just use em's
* Removed unnecessary mixins and plugins
* Combined _2-base.scss & _3-global.scss
* Update to Normalize.css 2.1.0.
* Update to jQuery 1.9.1

== CHANGELOG Feb 7, 2013

* Removed the old approach serving IE it's own stylesheet without media queries. I'm using respond.js again. Reason: much cleaner <head> and faster Sass compiling.
* Updated vendors

== CHANGELOG Nov 28, 2012

* Modified files based on stuff learned from muumilaakso project
* Small edits

== CHANGELOG 2012 / 2011

* LESS -> SASS
* Project started



