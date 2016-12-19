# <%= appNameHumanize %> - TYPO3 Docker

> Docker development environment for `<%= dir %>`. Generated on <%= (generatorDate) %> with [<%= pkg.name %> v<%= pkg.version %>](<%= (generatorRepository) %>).

# Requirements

* GNU/Linux/Unix with Docker ([Vagrant](https://www.vagrantup.com/downloads.html) VM with Docker or [native Linux with Docker](http://docs.docker.com/linux/step_one/)). Could also work in [Windows](https://docs.docker.com/docker-for-windows/#/what-to-know-before-you-install) but not tested just yet.
* [Docker-compose](https://github.com/docker/compose)

# Installation 

**1.** Clone this repository recursively:

```
$ git clone git@bitbucket.org:<%= appAuthorDasherize %> --recursive
```

**2.** If you are able to run shell scripts you are in luck (first, start your docker-machine if you need to): 

```
$ ./start.sh
```

Otherwise run the commands manually from [start.sh](start.sh).

**3.** Map your localhost to the development address in your host machine's hosts-file (`/etc/hosts` in linux/osx, somewhere in sys files in windows). For example:

```
192.168.10.10 <%= dir %>.dev
```

**4.** Locate to <%= dir %>.dev:8000/typo3 and setup your extension

---

Learn more about the extension and the project structure in [My Web Starter Kit](https://bitbucket.org/mediasignal/my-web-starter-kit/src/master/docs/project/README.md)
