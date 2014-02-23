# bunchitos

> Loads a bunch of modules by a given prefix.

## Installation

    npm install --save bunchitos

## Usage example

    // Loads all gulp plugins
    var plugins = require('bunchitos')('gulp-');

    plugins.jshint();

## Arguments

### bunchitos(prefix, [fsOnly, replacePrefix])

`prefix`

The prefix that defines which modules should be required (e.g. "gulp-" will load all "gulp-*" modules whereas "grunt-" will load all grunt modules). If you don't define a prefix, all modules will be loaded. _Note that the return object will have all the module names as camel cased properties (e.g. gulp-minify-css -> minifyCss)._

`fsOnly` (optional; default=false)
The dependency reference is by default the `package.json`. If this flag is true, then the dependencies will be searched only within the `node_modules` directory without checking the `package.json`.

## Tests

If you want to run the unit tests, please note that you have to trigger them via NPM in this project.

        npm test

This is because I had to modify the `NODE_PATH` so that `bunchitos` is able to fetch the internal "test modules" in the directory `assets`.

## Changelog

### Version 0.1.0 (20140223)

- Initial Release.

## Author

Copyright 2014, [André König](http://iam.andrekoenig.info) (andre.koenig@posteo.de)
