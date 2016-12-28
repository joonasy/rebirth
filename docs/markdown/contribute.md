# Contribute

Please discuss about new ideas and things that you think should be modified. Currently all the styleguiding, components (CSS/JS) and generator logic has been made by Joonas Ylitalo [@joonasy](https://twitter.com/joonasy).

**Generator structure**

    |── app 
    |   |── templates
    |   |   index.js       # [1]
    |   |   |── html       # [2]
    |   |   |── shared     # [3]
    |   |   |── starters   # [4]
    |   |   |── typo3      # [5]
    |   |   |── wordpress  # [6]
    |
    |── component          # [7]
    |   …
    |     
    |── docs               # [8]
    |   |── css            # [9]
    |   |── js             # [10]
    |   |── project        # [11]

* **1.** This file contains all the generator settings. Read more about building generators at [Yeoman docs](http://yeoman.io/authoring/) and [Yeoman API](http://yeoman.github.io/generator/).
* **2.** Html template files.
* **3.** Various shared project type files.
* **4.** Contains all the boilerplate stylesheets and javascripts that may be copied to your project folder. This directory is also used as a base for developing starters and building docs. [Read more about making starters](http://#).
* **5.** Typo3 template files.
* **6.** WordPress template files.
* **7.** Component sub-generator.
* **8.** Documents and instructions. This directory and all of its contents will be  later converted to a HTML document, and this directory will be a build folder for starters and docs (*starters [5.]*).
* **9.** CSS styleguide
* **10.** JavaScript styleguide
* **11.** Project structure and worklow guides
