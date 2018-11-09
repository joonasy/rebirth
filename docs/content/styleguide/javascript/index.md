---
title: JavaScript
layout: styleguide
---

We use [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) as our JavaScript styleguide with the following exceptions:

```
{
  'extends': 'airbnb',
  'globals': {
    'jquery': true,
    'window': true,
    'document': true,
    'navigator': true
  },
  'rules': {
    'no-unused-vars': 0,
    'import/no-unresolved': 0,
    'func-names': 0,
    'semi': [0, 'never'],
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'import/extensions': 0
  }
}
```

<!-- ## Structure

```
    javascripts/
    |
    |── components/           # [1]
    |   |── Component.js      # [2]
    |   …
    |
    |── plugins/              # [3]
    |   |── imgToParentBg.js
    |   |── toggle.js
    |   …
    |
    |── vendors/              # [4]
    |   |── vendor.js
    |   …
    |
    `── head.js               # [5]
    `── app.js                # [6]
```

* **1.** Place all components here.
* **2.** Component placeholder
* **3.** Place all your own plugins here
* **4.** 3rd party vendors that aren't added from Bower/Npm
* **5.** Place all JavaScript here you want to init in the head section of the HTML document
* **6.** Init all the components. Placed in the bottom of the HTML document. -->
