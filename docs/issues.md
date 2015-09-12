# Random issues

I'm gonna collect here all the coding issues I've been having either with this repo or plugins, browsers etc. 

## Gulp modernizr install fails

`gulp-modernizr` install fails even with `sudo`. This is probably [customizr](https://github.com/doctyper/customizr) issue. Related [https://github.com/doctyper/gulp-modernizr/issues/14](https://github.com/doctyper/gulp-modernizr/issues/14). 

Solution: Got this working with `--unsafe-perm` flag. e.g. `sudo npm i --unsafe-perm` or `cd node_modules/modernizr && npm install --unsafe-perm`.
