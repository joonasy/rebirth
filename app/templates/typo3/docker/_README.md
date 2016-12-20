# <%= appNameHumanize %> - TYPO3 Docker

> Docker development environment for `<%= dir %>`. Generated on <%= (generatorDate) %> with [<%= pkg.name %> v<%= pkg.version %>](<%= (generatorRepository) %>).

# Requirements

* GNU/Linux/Unix with Docker ([Docker toolbox](https://www.docker.com/products/docker-toolbox), [Vagrant](https://www.vagrantup.com/downloads.html) VM with Docker or [native Linux with Docker](http://docs.docker.com/linux/step_one/)). Could also work in [Windows](https://docs.docker.com/docker-for-windows/#/what-to-know-before-you-install) but not tested just yet.
* [Docker-compose](https://github.com/docker/compose)

# Installation 

**1.** Clone this repository recursively:

```
$ git clone git@bitbucket.org:<%= appAuthorDasherize %>/<%= dir %>.git --recursive
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

**4.** Locate to [<%= dir %>.dev:8000/typo3](http://<%= dir %>.dev:8000/typo3) and setup your extension

**5.** Install extension dependencies and see development usage in [<%= dir %>](<%= dir %>) 

# Usage

* `docker-compose up -d`: Start your development environment in detached mode
* `docker-compose stop`: Stop your development environment
* [Docker compose reference](https://docs.docker.com/compose/reference)

# Information

### Default database credentials

```
User: admin
Password: password
```

```
MYSQL_ROOT_PASSWORD: root
MYSQL_DATABASE: typo3
MYSQL_USER: typo3
MYSQL_PASSWORD: typo3
```

### Import SQL dump

You can import SQL dump automatically in project startup. Create docker-compose.override.yml and add the following to the `mysql` section:

```
mysql:
  volumes:
    - /folder-to-local-sql-dump/:/docker-entrypoint-initdb.d/
```

### Reinstall

**1.** Delete your existing containers (especially the mysql):

```
docker rm -f <%= dir %>-app
docker rm -f <%= dir %>-mail
docker rm -f <%= dir %>-mysql
```

**2.** Remove typo3/ folder

**3.** Run `$ ./start.sh` or run the commands manually

---

Learn more about the project structure in [My Web Starter Kit](https://bitbucket.org/mediasignal/my-web-starter-kit/src/master/docs/project/README.md)
