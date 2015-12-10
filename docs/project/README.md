# Project

> Project instructions, development information and structure

Please read [CSS Styleguide](/docs/css/) and [JavaScript Styleguide](/docs/js/)  first.

Project specific instructions: 

* [Typo3](typo3)

### Shared files and folder structure across project types

```
    project/
    |
    |── assets/                  # [1]
    |   |
    |   |── fonts/               # [2]
    |   |── images/              # [3]
    |   |── javascripts/         # [4]
    |   |── stylesheets/         # [5]    
    |
    |── bower_components/        # [6]   
    |── node_modules/            # [7]   
    |
    `── .editorconfig            # [8]
    `── .gitignore               # [9]
    `── .jscsrc                  # [10]
    `── .yo-rc.json              # [11]
    `── bower.json               # [12]
    `── dploy.example.yaml       # [13]
    `── gulpfile.js              # [14]
    `── package.json             # [15]
    `── README.md                # [16]
    `── rev-manifest.json        # [17]
```

* **1.** This folder contains all static assets
* **2.** Folder for self-hosted fonts and icon fonts
* **3.** Static images that are referenced via CSS
* **4.** JavaScripts please refer to [JavaScript Styleguide](/docs/js/)
* **5.** Stylesheets please refer to [CSS Styleguide](/docs/css/)
* **6.** This folder contains all [Bower](http://bower.io) components *
* **7.** This folder contains all [Npm](https://www.npmjs.com/) modules *
* **8.** [EditorConfig](http://editorconfig.org/) settings
* **9.** Set your git ignores here
* **10.** [JavaScript coding style](http://jscs.info/overview.html) settings that follow our [JavaScript Styleguide](../js/)
* **11.** Contains settings for the Yeoman generator.
* **12.** Add your [Bower packages](http://bower.io/#save-packages) here
* **13.** Your deployment [DPLOY](https://leanmeanfightingmachine.github.io/dploy/) settings. Rename this to `dploy.yaml` * and make sure it's ignored by git. _NEVER UPLOAD YOUR DEPLOYMENT SETTINGS ANYWHERE_
* **14.** [Gulpfile](http://gulpjs.com/) that handles the build process 
* **15.** [Npm package](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) settings
* **16.** Add your project specific instructions here.
* **17.** In build process an asset manifest, mapping the original paths to the revisioned paths, will be written here.

<sub>\* Ignore from [Git](http://git-scm.com/).</sub>

