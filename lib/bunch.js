/*
 * bunchitos
 *
 * Copyright(c) 2014 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@posteo.de>
 *
 */

'use strict';

var fs     = require('fs'),
    path   = require('path'),
    findup = require('findup-sync');

function Bunch (prefix) {
    this.$$prefix = prefix;
}

/**
 * Checks if the given name has this prefix.
 *
 * @param  {string} name The name that should be checked.
 *
 * @return {Boolean}
 *
 */
Bunch.prototype.$$hasPrefix = function $$hasPrefix (name) {
    // If no prefix has been defined, pass through.
    // Means, loads all modules.
    if (!this.$$prefix) {
        return true;
    }

    return (name.substring(0, this.$$prefix.length) === this.$$prefix);
};

/**
 * Turns a snake case string into a camel cased one.
 *
 * @return {string} The camelized string
 *
 */
Bunch.prototype.$$camel = function $$camel (camelizable) {
    return camelizable.replace(/-(\w)/g, function (one, two) {
        return two.toUpperCase();
    });
};

/**
 * Turns objects within the arguments into one single object.
 *
 * @return {object} A combined array
 *
 */
Bunch.prototype.$$objsToArray = function $$objsToArray () {
    var objs = Array.prototype.slice.call(arguments),
        len = objs.length,
        i = 0,
        results = {},
        dependency,
        prop;

    for (i; i < len; i = i + 1) {
        dependency = objs[i];

        if (dependency) {
            for (prop in dependency) {
                if (dependency.hasOwnProperty(prop)) {
                    results[prop] = dependency[prop];
                }
            }
        }
    }

    return results;
};

/**
 * Loads all modules with the given prefix from the "node_modules" directory.
 *
 *     example:
 *
 *         {
 *             "express": [Function],
 *             "findupSync": [Function],
 *         }
 *
 * @return {object} An hashmap with the required modules.
 *
 */
Bunch.prototype.fromNodeModules = function fromNodeModules () {
    var components = {},
        source     = findup('node_modules'),

        // sync, well loading with "require" will be synchronous as well.
        directories = fs.readdirSync(source),
        len         = directories.length,
        i           = 0,
        name;

    for (i; i < len; i = i + 1) {
        name = directories[i];

        if (this.$$hasPrefix(name) && fs.existsSync(path.join(source, name, 'package.json'))) {
            components[this.$$camel(name)] = require(name);
        }
    }

    return components;
};

/**
 * Loads all modules with the given prefix where the reference is the 'package.json'
 *
 *     example:
 *
 *         {
 *             "express": [Function],
 *             "findupSync": [Function],
 *         }
 *
 * @return {object} An hashmap with the required module.
 *
 */
Bunch.prototype.fromPackageJson = function fromPackageJson () {
    var packagejson = require(findup('package.json')),
        components = {},
        declarations,
        prop;

    declarations = this.$$objsToArray(packagejson.dependencies, packagejson.devDependencies, packagejson.peerDependencies);

    for (prop in declarations) {
        if (declarations.hasOwnProperty(prop) && this.$$hasPrefix(prop)) {
            components[this.$$camel(prop)] = require(prop);
        }
    }

    return components;
};

/**
 * Fetches all modules with the given prefix.
 *
 * @param  {string} prefix The module prefix, e.g. gulp-
 * @param  {boolean} fsOnly Which should be the reference the 'node_modules' or the 'package.json'
 *
 * @return {object} An hashmap with the required module.
 *
 */
exports.fetch = function fetch (prefix, fsOnly) {
    var bunch = new Bunch(prefix);

    // walk = load from node_modules
    if (fsOnly) {
        return bunch.fromNodeModules();
    }

    return bunch.fromPackageJson();
};