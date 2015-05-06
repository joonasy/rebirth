# JavaScript Styleguide

We use [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/blob/master/es5/README.md) (ES5) as our JavaScript styleguide.


## Structure

``` 
    javascripts/
    |
    |── components/           # [1]
    |   |── Component.js      # [2]
    |   …

    |── helpers/              # [3]
    |   |── figureImgAsBg.js  
    |   …
    |   
    |── plugins/              # [4]
    |   |── toggle.js         # [5]
    |   …
    | 
    |── vendor/               # [6]
    |   |── vendor.js  
    |   …
    |
    `── head.js               # [7]
    `── app.js                # [8]
```

* **1.** Place all components here.
* **2.** Component placeholder.
* **3.** Place all helpers here.
* **4.** Place all plugins here.
* **5.** Simple toggling plugin.
* **6.** 3rd party vendors that aren't added from Bower.
* **7.** Place all JavaScript here you want to init in the head section of the HTML document.
* **8.** Init all the components. Placed in the bottom area of the HTML document.

