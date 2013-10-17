# Joonas Y. boilerplate [Bitbucket repo](https://bitbucket.org/joonasy/joonasy-boilerplate)

This is my personal starting point for new web projects. It contains snippets and ideas from various sources such as HTML5BP, Bootstrap, Foundation, INUIT, SMACSS, OOCSS. By default this template supports: IE7<, Mobile first -ideology and progressive enhancement.

This boilerplate is a long term process to figure out the best approaches that suit best for my workflow. I keep adding and removing stuff from what I learn from various projects during my career as a web developer/designer. The boilerplate is being used on diverse projects which may contain CMS or be just a simple static site or a web application. 

Main files I edit are the *assets/* folder and it's structure. Dependencies on various libraries depend on their reuse and site generators/scaffolders vary based on their diversity. My workflow goes from creating a Html/Css/Js prototype and afterwards I'll keep adding features each project needs.

## Active boilerplate: joonasy-bp/

This folder is a preconfigured Grunt + Bower configuration which is based on few Yeoman generators. Just copy this folder to a desired location. Template requires Compass, Sass, Node.js, Bower and Grunt.

## Previously active boilerplates

- **My Yeoman Generator** generator-joonasy-bp/
- **My Middleman boilerplate** joonasy-bp-middleman/

I'll keep copying the *app/assets/* folder to these older approaches if I start using them again for some reason. See the changelog for reasons why I've jumped from one plate to another.

*******************************************************************************

## Changelog

### 2013-10-18
* Now I'll be using the preconfigured grunt/bower config for future projects (/joonasy-bp). Yeoman is nice but it think configuring it is unnecesserary step at least for now. I should make some bash script for creating projects.
	* E.g. mkdir prototype && cp -a joonasy-bp/joonasy-bp/. prototype/ && cd prototype && npm install && bower install 
* Dropped support for IE7 anymore, which was kind of minimal anyway
* box-sizing: border-box
* Grunt
	* Added custom modernizr building task
	* Jade for default marking
	* Use autoprefixer always
* Bower 
	* Enquire, Respond, Fastclick, Normalize
	* Note: Remember to manually convert normalize.css to _normalize.scss because seems that all the normalize scss versions add some unwanted variables


### 2013-7-8
* Started using Yeoman/Grunt for it's flexibility. I'm not going to explain here all the features they have, so just look at the code.
* Bower is awesome, going to use it definitely
* Smaller tab sizing, better comment styling and made some minor structural changes.


### 2013-6-16
* Better structuring logic learned from tampere.fi -project.


### 2013-5-13
* Git init
* Converted the html boilerplate to middleman boilerplate. Lot's of changes.. OOCSS, BEM, directory structure etc.


### 2013-4-15
* Switched to SMACSS approach. All the .scss files are now separated into specific categories and combined in a master file.
    * assets/modules/ <- The modules directory is reserved for Sass code that doesn’t cause Sass to actually output CSS. Things like mixin declarations, functions, and variables.
    * assets/partials/ <- The partials directory is where the meat of CSS is constructed.
    * assets/vendor/ <- The vendor directory is for third-party CSS. This is handy when using prepackaged components developed by other people (or for your own components that are maintained in another project).
* assets/js/lib/ -> assets/js/vendor/ for precise naming


### 2013-2-27
* Removed all rem -related stuff. I'd rather just use em's
* Removed unnecessary mixins and plugins
* Combined _2-base.scss & _3-global.scss
* Update to Normalize.css 2.1.0.
* Update to jQuery 1.9.1


### 2013-2-7
* Removed the old approach serving IE it's own stylesheet without media queries. I'm using respond.js again. Reason: much cleaner <head> and faster Sass compiling.
* Updated vendors


### 2012-11-28
* Modified files based on stuff learned from Muumilaakso project
* Small edits


### 2013-2011
* LESS -> SASS
* Project started