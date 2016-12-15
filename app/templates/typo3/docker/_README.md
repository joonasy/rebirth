# <%= appNameHumanize %> - TYPO3 Docker

> Docker development environment for `<%= dir %>`. Generated on <%= (generatorDate) %> with [<%= pkg.name %> v<%= pkg.version %>](<%= (generatorRepository) %>). Currently using [TYPO3-docker](https://github.com/webdevops/TYPO3-docker-boilerplate/releases/tag/5.2.0-beta2) boilerplate located in [<%= dir %>-docker](<%= dir %>-docker/).

# Requirements

* GNU/Linux/Unix with Docker ([Vagrant](https://www.vagrantup.com/downloads.html) VM with Docker, [Docker Toolbox](https://www.docker.com/products/docker-toolbox) or [native Linux with Docker](http://docs.docker.com/linux/step_one/)). Could also work in Windows but not tested.
* make (GNU/Linux/Unix)
* [Composer](https://getcomposer.org/)
* [Docker-compose](https://github.com/docker/compose)
* For other information and requirements see [<%= dir %>-docker/README.md](<%= dir %>-docker/README.md)

# Installation 

**1.** Clone this repo recursively (`--recursive`) and start your docker-machine if you need to

**2.** Make sure there is symlink <%= dir %>-docker/app/web/composer.json to <%= dir %>/typo3/composer.json. If not then create or copy it.

**3.** Install composer dependencies

```
// #!/usr/bin/env bash
`composer install´ 
```

**4.** Copy docker-compose.development.yaml to docker-compose.yaml

**5.** Map your environment host to the development domain in your host machine's hosts-file (`/etc/hosts` in linux/osx, somewhere in sys files in windows). For example:

```
192.168.10.10 <%= dir %>.dev
```

**6.** Run `docker-compose up -d` or use the commands provided by the boilerplate.

**7.** Locate to <%= dir %>.dev/typo3 and install Typo3

**8.** Locate to [<%= dir %>](<%= dir %>) and setup the extension. Learn more about the extension and the project structure in [My Web Starter Kit](https://bitbucket.org/mediasignal/my-web-starter-kit/src/master/docs/project/README.md).
