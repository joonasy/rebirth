# Project structure

Please read [CSS Styleguide](/docs/css/) and [JavaScript Styleguide](/docs/js/)  first.


## Shared files across projects

These are quite obvious things for developers so let's just go through them briefly.

* `bower_components/`: This folder contains all [Bower](http://bower.io) components. *
* `node_modules/`: This folder contains all [Npm](https://www.npmjs.com/) modules. *
* `.editorconfig`: [EditorConfig](http://editorconfig.org/) settings
* `.gitignore`: Set your git ignores here.
* `.yo-rc.json`: Contains settings for the Yeoman generator.
* `bower.json`: Add you [Bower packages](http://bower.io/#save-packages) here.
* `Gruntfile.js`: [Grunt](http://gruntjs.com/) settings.
* `package.json`: [Npm package](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) settings.
* `README.md`: Add your project specific instructions here.

\* Should be ignored from [Git](http://git-scm.com/).


## Typo3

Typo3 is Open Source Enterprise CMS and Scalable Web Application Framework.

### Extension structure

```
    extension/
    |
    |── Assets/                  # [1]
    |   |
    |   |── fonts/               # [2]
    |   |── images/              # [3]
    |   |── javascripts/         # [4]
    |   |── stylesheets/         # [5]    
    |
    |── bower_components/ 
    |── Classes/                 # [6]
    |── Configuration/           # [7]
    |── node_modules/
    |── Resources/               # [8]
    |   |
    |   |── Private/             # [9]
    |   |   |── Layouts/
    |   |   |── Partials/
    |   |   |   |── Bottom.html  # [10]
    |   |   |   |── Top.html     # [11]
    |   |   |── Templates/ 
    |   |── Public/              # [12]
    |
    |── TempMedia/               # [13]
    `── .editorconfig        
    `── .gitignore
    `── .yo-rc.json
    `── bower.json
    `── Gruntfile.js             # [14]
    `── package.json
    `── README.md            
```

* **1.** This folder contains all static assets.
* **2.** Folder for self-hosted fonts and icon fonts.
* **3.** Static images that are referenced via CSS.
* **4.** JavaScripts please refer to [JavaScript Styleguide](/docs/js/).
* **5.** Stylesheets please refer to [CSS Styleguide](/docs/css/).
* **6., 7.** Typo3 settings.
* **8.** Our public files and private files.
* **9.** Site layouts, partials and templates.
* **10.** This file contains all the JavaScripts and material that are located in the bottom of the HTML document. JavaScript bower components are injected here automatically.
* **11.** This file contains all the CSS, JavaScripts and material that are located in the top of the HTML document.
* **12.** Public folder where build assets are placed.
* **13.** This folder contains images that are meant to be added via the CMS itself
* **14.** Gruntfile that handles the build process
    * New bower_components are automatically injected to `Bottom.html` (**10.**) in the dev process however these assets need to added to the build process as well. Found ~`Gruntfile:195` in the concat task.
    * CSS bower components could also be automatically added to `Top.html`  (**11.**) and to the concat task. However better alternative is to insert all CSS bower components as part of the Sass (`Assets/stylesheets/vendor`) build task because these components almost always need some tweaking.

### Workflow

1. Designing developer builds CSS, JavaScript and static Typo3 templates
    * Consider later adding a HTML Git branch for designing quickly in the browser without worrying about database settings.
2. Typo3 developer converts the static files to CMS editable collections.
3. `grunt` task is run before publishing (and everytime new changes are made).
4. Project deploy.
