# Contribute

Please discuss about new ideas and things that you think should be modified. Currently all the styleguiding, components (CSS/JS) and generator logic has been made by Joonas Ylitalo [@joonasy](https://twitter.com/joonasy).

**Generator structure**

    |── app 
    |   |── templates
    |   |   index.js      # [1]
    |   |   |── assets    # [2]
    |   |   |── html      # [3]
    |   |   |── shared    # [4]
    |   |   |── starters  # [5]
    |   |   |── typo3     # [3]
    |
    |── component         # [6]
    |   …
    |     
    |── docs              # [7]
    |   |── css           # [8]
    |   |── js            # [9]
    |   |── project       # [10]

* **1.** This file contains all the generator settings. Read more about building generators at [Yeoman docs](http://yeoman.io/authoring/) and [Yeoman API](http://yeoman.github.io/generator/).
* **2.** Contains all the default stylesheets and javascripts that are always copied to project folder.
* **3.** These directories contain all project type related files. [Read more about project types](http://#).
* **4.** Various shared project type files.
* **5.** Contains all the boilerplate stylesheets and javascripts that may be copied to your project folder. This directory is also used as a base for developing starters and building docs. [Read more about making starters](http://#).
* **6.** Component sub-generator.
* **7.** Documents and instructions. This directory and all of its contents will be  later converted to a HTML document, and this directory will be a build folder for starters and docs (*starters [5.]*).
* **8.** CSS styleguide
* **9.** JavaScript styleguide
* **10.** Project structure and worklow guides
