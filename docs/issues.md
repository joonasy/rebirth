# Random issues

Collected coding issues I've been having either with this repo or plugins, browsers etc. 

## Node and npm

### Node sass install fails

**Description**: `Error: libsass bindings not found in..`,  `node-sass` install fails which is dedendency of `gulp-sass` or `npm ERR! Cannot read property 'localeCompare' of undefined`. Related [https://github.com/npm/npm/issues/9766#issuecomment-144942235](https://github.com/npm/npm/issues/9766#issuecomment-144942235), [https://github.com/sass/node-sass/issues/918#issuecomment-141675757](https://github.com/sass/node-sass/issues/918#issuecomment-141675757).

**Solution**: 

1. First, update to latest node and npm
2. If you are using npm versions `3.3.5`, `3.3.6` or `3.3.7` downgrade to `3.3.4` with `npm i npm@3.3.4 -g` or update to the latest working npm version if there is one 
3. Then run `npm uninstall node-sass --save-dev && npm install node-sass --save-dev` 
4. If previous fails then `sudo rm -rf node_modules && sudo npm install`

### Gulp modernizr install fails

**Description**: `gulp-modernizr` install fails even with `sudo`. This is probably [customizr](https://github.com/doctyper/customizr) issue. Related [https://github.com/doctyper/gulp-modernizr/issues/14](https://github.com/doctyper/gulp-modernizr/issues/14). 

**Solution**: Got this working with `--unsafe-perm` flag. e.g. `sudo npm i --unsafe-perm` or `cd node_modules/modernizr && npm install --unsafe-perm`.
