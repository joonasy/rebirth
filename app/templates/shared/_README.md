# <%= appNameHumanize %>

> <%= appDescription %>. Generated on <%= (generatorDate) %> with [<%= pkg.name %> v<%= pkg.version %>](<%= (generatorRepository) %>)<% if (typo3) { %> using the Typo3 extension name `<%= appRoot %>`<% } %>.

## Instructions 

Please read [My Web Starter Kit](https://bitbucket.org/mediasignal/my-web-starter-kit) guide.

## Requirements
<% if (typo3) { %>* [Typo3](http://typo3.org)
* [Flux](http://typo3.org/extensions/repository/view/flux)
* [Fluid Pages Engine](http://typo3.org/extensions/repository/view/fluidpages)
* [Fluid Content Engine](http://typo3.org/extensions/repository/view/fluidcontent)
* [Vhs](http://typo3.org/extensions/repository/view/vhs)<% } if (wp) { %> 
* [WordPress](https://wordpress.org/)<% if (pluginACFkey) { %>
* [Advanced Custom Fields Pro](http://www.advancedcustomfields.com/pro/)<% }} if (typo3 || wp) { %>
* [Composer](https://getcomposer.org/)<% } %>
* [Node.js](http://nodejs.org/)
* [Npm](https://www.npmjs.org/)
* [Bower](http://bower.io/)

## Install

Install node modules
  
    npm install

Install bower packages
  
    bower install

## Usage

* `npm run build`: Build the application
<% if (deployment) { %>* `npm run deploy`: Build the application and deploy it to the server<% } %><% if (html) { %>* `npm run dist`: Build the application and start a local server for testing purposes<% } %>
* `npm run dev`: Watches files and activates Browsersync. Use this for developing.<% if (wp) { %>
* `npm run docker`: Start the docker container
* `npm run docker-wp`: Connect to the WordPress container
* `npm run docker-db`: Connect to the database container<% } if (typo3 || wp) { %>

## Setup development environment <% } if (wp) { %>

Choose your preferred approach.

### a) LAMP/LEMP 

> e.g. Vagrant w/ Homestead 

1. Copy `wp-example` one folder above of this repo and rename it to `wp`. Structure:

    ```
    <%= appRoot %>_root/
    |
    |── <%= appRoot %>/
    |   |── wp-example
    |── wp/
    ```

Even better is that you symlink your `wp/composer.json` to `wp-example/composer.json` as that file is version controlled. For example in Unix:

    ```
    ln -s ../<%= appRoot %>/wp-example/composer.json composer.json
    ```

2. Run `composer install` in `wp/`

3. Point your environment document root to `wp/` 

4. Map your environment host to the development domain in your host machine's hosts-file (`/etc/hosts` in linux/osx, somewhere in sys files in windows). For example:

    ```
    192.168.10.10 <%= appNameDasherize %>.dev
    ```

5. Setup your database credentials in `wp-config.dev.php`. For example:

    ```
    define('DB_NAME', '<%= dbName %>');
    define('DB_USER', 'homestead');
    define('DB_PASSWORD', 'secret');
    define('DB_HOST', 'localhost');
    ```

6. Make themes folder in `wp/wp_content/themes/`, Symlink from `wp/wp-content/themes/` to your theme. For example in Unix:

    ```
    ln -s ../../../<%= appRoot %> <%= appRoot %>
    ```

6. Open `<%= appNameDasherize %>.dev`, setup your new site and activate your theme

7. Run `npm run dev` in root of your project

### b) Docker 

1. Make sure docker machine is running
2. Do steps 1.), 2.) and 4.) from the LAMP/LEMP instruction above.
3. In `wp-config.dev.php` make sure database credentials match and theme path points to correct location (e.g. `../<%= appRoot %>:/var/www/html/wp-content/themes/<%= appRoot %>`) . Define `DB_HOST` to `'mysql'` if not already.
4. Run `npm run docker`, open `<%= appNameDasherize %>.dev`, setup your site and activate your theme
5. Do step 7.) from the LAMP/LEMP instruction
 
Note that the we are using the same structure of files as in the [joonasy/wordpress](https://github.com/joonasy/wordpress) image but with data files mounted from the host machine. These are defined in the `volumes` section in `docker-compose.yml`. Alternatively you can remove those mounts and just use the files from the container itself. <% } if (typo3) { %> 
 
### LAMP/LEMP 

> e.g. Vagrant w/ Homestead 

1. Copy `typo3-example` one folder above of this repo and rename it to `typo3`. Structure:

    ```
    <%= appRoot %>_root/
    |
    |── <%= appRoot %>/
    |   |── typo3-example
    |── typo3/
    ```

Even better is that you symlink your `typo3/composer.json` to `typo3-example/composer.json` as that file is version controlled. For example in Unix:

    ```
    // <%= appRoot %>_root/typo3/
    ln -s ../<%= appRoot %>/typo3-example/composer.json composer.json
    ```

2. Run `composer install` in `typo3/`

3. Point your environment document root to `typo3/` 

4. Map your environment host to the development domain in your host machine's hosts-file (`/etc/hosts` in linux/osx, somewhere in sys files in windows). For example:

    ```
    192.168.10.10 <%= appNameDasherize %>.dev
    ```

5. Add `FIRST_INSTALL` file in `typo3/` (`touch FIRST_INSTALL`)

6. Symlink from  `typo3/typo3conf/ext/` to your extension in app root. For example in Unix:

    ```
    ln -s ../../../<%= appRoot %> <%= appRoot %>
    ```

7. Open `<%= appNameDasherize %>.dev`, setup your new site and activate your extension.

8. Run `npm run dev` in `<%= appRoot %>`<% } %>

---

For more information read [My Web Starter Kit](https://bitbucket.org/mediasignal/my-web-starter-kit).
