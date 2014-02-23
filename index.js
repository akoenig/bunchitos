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

var Bunch = require('./lib').Bunch;

/**
 * Fetches all modules with the given prefix.
 *
 * @param  {string} prefix The module prefix, e.g. gulp-
 * @param  {boolean} fsOnly Which should be the reference the 'node_modules' or the 'package.json'
 *
 * @return {object} An hashmap with the required module.
 *
 */
module.exports = function (prefix, fsOnly) {

    if ('boolean' === typeof prefix) {
        fsOnly = prefix;
        prefix = undefined;
    }

    return Bunch.fetch(prefix, fsOnly);
};