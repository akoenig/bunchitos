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

var path      = require('path'),
    bunchitos = require('../');

process.chdir(path.join(__dirname, 'assets'));

describe('The "bunchitos" module loader', function () {

    it('should be able to load modules from "node_modules"', function (done) {
        var modules = bunchitos(true);

        expect(modules.testModule).toBeDefined();
        expect(typeof modules.testModule).toBe('function');

        done();
    });

    it('should be able to load modules from the "package.json"', function (done) {
        var modules = bunchitos();

        expect(modules.testModule).toBeDefined();
        expect(typeof modules.testModule).toBe('function');

        done();
    });

    it('should be able to load only specifiy modules (by prefix)', function (done) {
        var modules = bunchitos('test-');

        expect(modules.testModule).toBeDefined();
        expect(typeof modules.testModule).toBe('function');

        expect(modules.express).toBeUndefined();

        done();
    });
});