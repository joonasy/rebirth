# <%= appNameHumanize %> - WordPress Docker

> Docker development environment for `<%= dir %>`. Generated on <%= (generatorDate) %> with [<%= pkg.name %> v<%= pkg.version %>](<%= (generatorRepository) %>). Currently using [Wordpress docker image](https://github.com/joonasy/wordpress) boilerplate located in [<%= dir %>-docker](<%= dir %>-docker/).

# Requirements

* GNU/Linux/Unix with Docker ([Vagrant](https://www.vagrantup.com/downloads.html) VM with Docker, [Docker Toolbox](https://www.docker.com/products/docker-toolbox) or [native Linux with Docker](http://docs.docker.com/linux/step_one/)). Could also work in Windows but not tested.
* [Composer](https://getcomposer.org/)
* [Docker-compose](https://github.com/docker/compose)

# Installation 

**1.** Clone this repo recursively (`--recursive`) and start your docker-machine if you need to

**2.** Make sure there is symlink <%= dir %>-docker/composer.json to <%= dir %>/wp/composer.json. If not then create or copy it.

**3.** Install composer dependencies

```
// #!/usr/bin/env bash
`composer install´ 
```

**4.** Copy docker-compose.development.yaml to docker-compose.yaml

**5.** Copy wp-config.development.example.php to wp-config.development.php

**6.** Copy wp-config.example.php to wp-config.php

**7.** Map your environment host to the development domain in your host machine's hosts-file (`/etc/hosts` in linux/osx, somewhere in sys files in windows). For example:

```
192.168.10.10 <%= dir %>.dev
```

**8.** Run `docker-compose up -d`

**7.** Locate to <%= dir %>.dev and install WordPress

Locate to [<%= dir %>](<%= dir %>) and setup the theme. Learn more about the theme and the project structure in [My Web Starter Kit](https://bitbucket.org/mediasignal/my-web-starter-kit/src/master/docs/project/README.md).
